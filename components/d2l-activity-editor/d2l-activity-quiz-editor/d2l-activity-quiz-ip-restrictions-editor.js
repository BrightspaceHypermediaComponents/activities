import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedIpRestrictions as store } from './state/quiz-store.js';
import { tableStyles } from '@brightspace-ui/core/components/table/table-wrapper.js';

class ActivityQuizIpRestrictionsEditor extends ActivityEditorMixin(ActivityEditorContainerMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [tableStyles, css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				d2l-button-subtle {
					margin-top: 0.5rem;
				}
				d2l-button {
					margin: 1rem 0;
				}
			`];
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

		return html`
			${this._renderIpRestrictionTable()}
			${this._renderAddRowButton()}
    	`;
	}

	_addRow() {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		entity.addRestriction();
	}

	async _deleteIpRestriction(_, index) {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		if (entity.ipRestrictions.length > 1) {
			this._sendResizeEvent();
		}

		entity.deleteIpRestriction(index);

		await this.updateComplete;
		this._sendDeleteEvent();
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

	_renderAddRowButton() {
		return html`
			<d2l-button-subtle
				text=${this.localize('ipRestrictionsDialogAddNewRange')}
				h-align="text"
				icon="tier1:plus-large"
				@click="${this._addRow}">
			</d2l-button-subtle>
		`;
	}

	_renderIpRestrictionTable() {
		return html`
			<d2l-table-wrapper>
				<table class="d2l-table">
					<thead>
			 			<tr>
							<th>${this.localize('ipRestrictionsTableStartRangeHdr')}</th>
							<th>${this.localize('ipRestrictionsTableEndRangeHdr')}</th>
							<th>${this.localize('ipRestrictionsTableDeleteRangeHdr')}</th>
						</tr>
					</thead>
					<tbody>${this._renderRestrictionRows()}</tbody>
				</table>
			</d2l-table-wrapper>
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
				<tr>
					<td>
						<d2l-input-text
							class="d2l-ip-input"
							@input="${this._generateHandler(this._handleChange, index)}"
							value="${start || ''}"
							name="start">
						</d2l-input-text>
					</td>
					<td>
						<d2l-input-text
							class="d2l-ip-input"
							@input="${this._generateHandler(this._handleChange, index)}"
							value="${end || ''}"
							name="end">
						</d2l-input-text>
					</td>
					<td>
						<d2l-button-icon
							icon="d2l-tier1:delete"
							aria-label="delete"
							@click="${this._generateHandler(this._deleteIp, index)}">
						</d2l-button-icon>
					</td>
				</tr>
			`;
		});
	}

	_sendDeleteEvent() {
		this.dispatchEvent(new CustomEvent('ip-restriction-deleted', { bubbles: true, composed: true }));
	}

	_sendResizeEvent() {
		this.dispatchEvent(new CustomEvent('restrictions-resize-dialog', { bubbles: true, composed: true }));
	}
}

customElements.define(
	'd2l-activity-quiz-ip-restrictions-editor',
	ActivityQuizIpRestrictionsEditor
);
