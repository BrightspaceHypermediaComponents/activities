import '@brightspace-ui/core/components/dialog/dialog.js';
import 'd2l-table/d2l-table';
import 'd2l-table/d2l-tr';
import 'd2l-table/d2l-th';
import 'd2l-table/d2l-table-style.js';
import 'd2l-table/d2l-tbody';
import 'd2l-table/d2l-thead';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedIpRestrictions as store } from './state/quiz-store.js';

class ActivityQuizIpRestrictionsContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

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
		this._sendResizeEvent();
	}

	_deleteIpRestriction() {
		//TODO: implement delete
	}

	_handleChange(e) {
		const rowIndex = Number(e.target.parentElement.parentElement.attributes.rowindex.value);
		const { name, value } = e.target;

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		entity.setIpRestriction(rowIndex, name, value);

	}

	_renderActionButtons() {
		return html`
			<d2l-button @click=${this._addRow}>New</d2l-button>
			<d2l-button @click=${this._saveRestrictions}>Add</d2l-button>
			<d2l-button>Cancel</d2l-button>
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
			 			<d2l-th class="title">IP Range Start</d2l-th>
			 			<d2l-th>IP Range End</d2l-th>
			 			<d2l-th>Delete</d2l-th>
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
				<d2l-tr rowindex=${index}>
					<d2l-th>
						<d2l-input-text @input="${this._handleChange}" value="${start}" name="start"></d2l-input-text>
					</d2l-th>
					<d2l-th>
						<d2l-input-text @input="${this._handleChange}" value="${end}" name="end"></d2l-input-text>
					</d2l-th>
					<d2l-th>
						<d2l-button-icon
						icon="d2l-tier1:delete"
						aria-label="delete"
						@click="${this._deleteIpRestriction}">
						</d2l-button-icon>
					</d2l-th>
				</d2l-tr>
			`;
		});
	}

	async _saveRestrictions() {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		await entity.saveRestrictions();
	}

	_sendResizeEvent() {
		this.dispatchEvent(new CustomEvent('restrictions-resize-dialog', { bubbles: true, composed: true }));
	}

}

customElements.define(
	'd2l-activity-quiz-ip-restrictions-container',
	ActivityQuizIpRestrictionsContainer
);
