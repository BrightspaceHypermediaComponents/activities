import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import 'd2l-activity-alignments/d2l-select-outcomes.js';
import { ActivityEditorFeaturesMixin, Milestones } from './mixins/d2l-activity-editor-features-mixin.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityOutcomes extends ActivityEditorFeaturesMixin(ActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			hidden: { type: Boolean, reflect: true },
			deferredSave: { type: Boolean },
			hideIndirectAlignments: { type: Boolean },
			_featureEnabled: { type: Boolean },
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
		this.deferredSave = true;
		this.hideIndirectAlignments = true;
	}

	connectedCallback() {
		super.connectedCallback();

		this._featureEnabled = this._isMilestoneEnabled(Milestones.M3Outcomes);
		this._browseOutcomesText = this._dispatchRequestProvider('d2l-provider-browse-outcomes-text');
		this._outcomesTerm = this._dispatchRequestProvider('d2l-provider-outcomes-term');
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

	_onOutcomeTagDeleted() {
		// react to an outcomes tag being deleted
	}

	_openDialog() {
		this._opened = true;
	}

	_closeDialog() {
		this._opened = false;
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
				@d2l-activity-alignment-outcomes-updated="${this._onOutcomeTagDeleted}"
				@d2l-activity-alignment-tags-update="${this._openDialog}"
				@empty-changed="${this._alignmentTagsEmptyChanged}"
				?read-only=${!this._hasAlignments}>
			</d2l-activity-alignment-tags>`;
	}

	_alignmentTagsEmptyChanged(e) {
		this._hasAlignments = !e.detail.value;
		this.requestUpdate();
	}

	render() {
		const activity = store.get(this.href);
		if (!activity || !this._featureEnabled) {
			this.hidden = true;
			return html``;
		}

		const {
			canUpdateAlignments
		} = activity;

		if (!canUpdateAlignments && !this._hasAlignments) {
			this.hidden = true;
		} else {
			this.hidden = false;
		}

		return html`
			${this._renderTags()}
			${canUpdateAlignments && !this._hasAlignments ? html`${this._renderDialogOpener()}` : null}
			${canUpdateAlignments ? html`
			<d2l-dialog
				title-text="${this._browseOutcomesText}"
				?opened="${this._opened}"
				@d2l-dialog-close="${this._closeDialog}">
				<d2l-select-outcomes
					href="${this.href}"
					.token="${this.token}"
					?deferred-save="${this.deferredSave}"
					@d2l-alignment-list-added="${this._onDialogAdd}"
					@d2l-alignment-list-cancelled="${this._onDialogCancel}">
				</d2l-select-outcomes>
			</d2l-dialog>` : null}
		`;
	}
}
customElements.define('d2l-activity-outcomes', ActivityOutcomes);
