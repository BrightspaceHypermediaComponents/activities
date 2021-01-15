import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import 'd2l-activity-alignments/d2l-select-outcomes-hierarchical.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorFeaturesMixin } from './mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { AsyncStateEvent } from '@brightspace-ui/core/helpers/asyncStateEvent';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityOutcomes extends ActivityEditorFeaturesMixin(ActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			hidden: { type: Boolean, reflect: true },
			deferredSave: { type: Boolean, attribute: 'deferred-save' },
			hideIndirectAlignments: { type: Boolean, attribute: 'hide-indirect-alignments' },
			alignButtonText: { type: String, attribute: 'align-button-text' },
			_opened: { type: Boolean },
			_outcomesTerm: { type: String },
			_browseOutcomesText: { type: String }
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
		this._loadingAlignments = this._dispatchLoadingAlignments();
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

		if (!this._hasAlignments && !canUpdateAlignments) {
			this.hidden = true;
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
					href="${alignmentsHref}"
					.token="${this.token}"
					.alignButtonText="${this.alignButtonText}"
					@d2l-alignment-list-added="${this._onDialogAdd}"
					@d2l-alignment-list-cancelled="${this._onDialogCancel}">
				</d2l-select-outcomes-hierarchical>
			</d2l-dialog>` : null}
		`;
	}
	_alignmentTagsEmptyChanged(e) {
		this._loadingAlignments.resolve();
		this._hasAlignments = !!(e.detail.entities && e.detail.entities.length);
		this.requestUpdate();
	}
	_closeDialog() {
		this._opened = false;
	}

	_dispatchLoadingAlignments() {
		let res;

		const promise = new Promise(resolve => res = resolve);
		promise.resolve = res;

		const event = new AsyncStateEvent(promise);
		this.dispatchEvent(event);

		return promise;

		// dispatches an async event which can be resolved when alignments have finished loading
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
