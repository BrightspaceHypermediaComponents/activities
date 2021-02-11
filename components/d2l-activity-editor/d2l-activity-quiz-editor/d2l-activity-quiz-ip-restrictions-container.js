import '@brightspace-ui/core/components/dialog/dialog.js';
import 'd2l-table/d2l-table';
import 'd2l-table/d2l-tr';
import 'd2l-table/d2l-th';
import 'd2l-table/d2l-table-style.js';
import 'd2l-table/d2l-tbody';
import 'd2l-table/d2l-thead';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedIpRestrictions as store } from './state/quiz-store.js';
import { validateIp } from './helpers/ip-validation-helper.js';

class ActivityQuizIpRestrictionsContainer extends ActivityEditorMixin(ActivityEditorContainerMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return css`
				:host {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				d2l-button-subtle {
					margin: 0.5rem 0;
				}
			`;
	}

	constructor() {
		super(store);

		this._deleteIp = this._deleteIpRestriction.bind(this);
		this._handleChange = this._handleChange.bind(this);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		this._validationErrorMsg = this.localize('ipRestrictionsValidationError');

		return html`
			${this._renderIpRestrictionTable()}
			${this._renderActionButtons()}
    	`;
	}

	_addRow() {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		entity.addRestriction();
	}

	_deleteIpRestriction(_, index) {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		if (entity.ipRestrictions.length > 1) {
			this._sendResizeEvent();
		}

		entity.deleteIpRestriction(index);
	}

	_generateHandler(handler, rowindex) {
		return (e) => handler(e, rowindex);
	}

	_handleChange(e, index) {
		const { name, value } = e.target;

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		entity.setIpRestriction(index, name, value);
	}

	_renderActionButtons() {
		return html`
			<d2l-button-subtle
				text=${this.localize('ipRestrictionsDialogAddNewRange')}
				h-align="text"
				icon="tier1:plus-default"
				@click="${this._addRow}">
			</d2l-button-subtle>
		`;
	}

	_renderIpRestrictionTable() {
		return html`
			<custom-style>
				<style include="d2l-table-style">
					:host {
						display: block;
					}
				</style>
			</custom-style>

			<d2l-table id="ip-restrictions-table">
			 	<d2l-thead>
			 		<d2l-tr>
			 			<d2l-th class="title">${this.localize('ipRestrictionsTableStartRangeHdr')}</d2l-th>
			 			<d2l-th>${this.localize('ipRestrictionsTableEndRangeHdr')}</d2l-th>
			 			<d2l-th>${this.localize('ipRestrictionsTableDeleteRangeHdr')}</d2l-th>
			 		</d2l-tr>
				</d2l-thead>
				<d2l-tbody>

					${this._renderRestrictionRows()}

				</d2l-tbody>

			</d2l-table>
		`;
	}

	_renderRestrictionRows() {
		const entity = store.get(this.href);
		if (!entity || !entity.ipRestrictions || !entity.ipRestrictions.length) {
			return html``;
		}

		return entity.ipRestrictions.map((restriction, index) => {
			const { start, end } = restriction;

			return html`
				<d2l-tr>
					<d2l-th>

						<d2l-input-text
							@input="${this._generateHandler(this._handleChange, index)}"
							value="${start}"
							@blur=${this._validateRestriction}
							name="start">
						</d2l-input-text>

					</d2l-th>
					<d2l-th>

						<d2l-input-text
							@input="${this._generateHandler(this._handleChange, index)}"
							value="${end}"
							@blur=${this._validateRestriction}
							name="end">
						</d2l-input-text>

					</d2l-th>
					<d2l-th>
						<d2l-button-icon
						icon="d2l-tier1:delete"
						aria-label="delete"
						@click="${this._generateHandler(this._deleteIp, index)}">
						</d2l-button-icon>
					</d2l-th>
				</d2l-tr>
			`;
		});
	}

	_sendResizeEvent() {
		this.dispatchEvent(new CustomEvent('restrictions-resize-dialog', { bubbles: true, composed: true }));
	}

	_validateRestriction(e) {
		if (!e || !e.target || !e.target.value) {
			return;
		}

		const entity = store.get(this.href);

		const isValid = validateIp(e.target.value);

		e.target.setAttribute('aria-invalid', !isValid);

		if (isValid) {
			entity.setErrors([]);
			this._sendResizeEvent();
		} else {
			const errorMsg = this.localize('ipRestrictionsValidationError');
			entity.setErrors([errorMsg]);
		}
	}
}

customElements.define(
	'd2l-activity-quiz-ip-restrictions-container',
	ActivityQuizIpRestrictionsContainer
);
