import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import 'd2l-activity-alignments/d2l-select-outcomes-hierarchical.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { fetchEntity } from './state/fetch-entity.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityOutcomes extends ActivityEditorMixin(RtlMixin(MobxLitElement)) {

	static get properties() {
		return {
			hidden: { type: Boolean, reflect: true },
			deferredSave: { type: Boolean, attribute: 'deferred-save' },
			hideIndirectAlignments: { type: Boolean, attribute: 'hide-indirect-alignments' },
			alignButtonText: { type: String, attribute: 'align-button-text' },
			_opened: { type: Boolean },
			_outcomesTerm: { type: String },
			_browseOutcomesText: { type: String },
			_alignmentsHref: { type: String }
		};
	}

	static get styles() {
		return [labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	constructor() {
		super(store);
		this.deferredSave = false;
		this.hideIndirectAlignments = true;
	}

	connectedCallback() {
		super.connectedCallback();

		this._browseOutcomesText = this._dispatchRequestProvider('d2l-provider-browse-outcomes-text');
		this._outcomesTerm = this._dispatchRequestProvider('d2l-provider-outcomes-term');
	}
	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			canUpdateAlignments,
			alignmentsHref
		} = activity;

		if (!canUpdateAlignments && !this._hasAlignments || this._hasAlignments === undefined) {
			this.hidden = true;
		} else {
			this.hidden = false;
		}

		if (alignmentsHref) {
			this._alignmentsHref = alignmentsHref;
		}

		return html`
			${this._renderTags()}
			${canUpdateAlignments && !this._hasAlignments ? html`${this._renderDialogOpener()}` : null}
			${canUpdateAlignments ? html`
			<d2l-dialog
				title-text="${this._browseOutcomesText}"
				?opened="${this._opened}"
				@d2l-dialog-close="${this._closeDialog}">
				<d2l-select-outcomes-hierarchical
					href="${this.__alignmentsHref}"
					.token="${this.token}"
					.alignButtonText="${this.alignButtonText}"
					@d2l-alignment-list-added="${this._onDialogAdd}"
					@d2l-alignment-list-cancelled="${this._onDialogCancel}">
				</d2l-select-outcomes-hierarchical>
			</d2l-dialog>` : null}
		`;
	}

	set _alignmentsHref(value) {
		const oldValue = this.__alignmentsHref;

		if (oldValue !== value) {
			this.__alignmentsHref = value;

			if (this.token) {
				this._fetch(() => fetchEntity(this.__alignmentsHref, this.token));
			}
		}
	}

	_alignmentTagsEmptyChanged(e) {
		this._hasAlignments = !!(e.detail.entities && e.detail.entities.length);
		this.requestUpdate();
	}
	_closeDialog() {
		this._opened = false;
	}

	_dispatchRequestProvider(key) {
		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: key },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		return event.detail.provider;
	}

	_onDialogAdd() {
		this._closeDialog();

		// react to outcomes being added/removed via selector dialog
	}

	_onDialogCancel() {
		this._closeDialog();

		// react to outcomes selector dialog being closed via cancel
	}

	_openDialog() {
		this._opened = true;
	}

	_renderDialogOpener() {
		return html`<d2l-button-subtle
			text="${this._outcomesTerm}"
			@click="${this._openDialog}"
			h-align="text">
		</d2l-button-subtle>`;
	}

	_renderTags() {
		return html`<label class="d2l-label-text" ?hidden="${!this._hasAlignments}">${this._outcomesTerm}</label>
			<d2l-activity-alignment-tags
				href="${this.href}"
				.token="${this.token}"
				?deferred-save="${this.deferredSave}"
				?hide-indirect-alignments="${this.hideIndirectAlignments}"
				browse-outcomes-text="${this._browseOutcomesText}"
				@d2l-activity-alignment-outcomes-updated="${this._alignmentTagsEmptyChanged}"
				@d2l-activity-alignment-tags-update="${this._openDialog}"
				?read-only=${!this._hasAlignments}>
			</d2l-activity-alignment-tags>`;
	}

}
customElements.define('d2l-activity-outcomes', ActivityOutcomes);
