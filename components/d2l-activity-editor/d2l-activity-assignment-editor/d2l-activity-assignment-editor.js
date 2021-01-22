import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import './d2l-activity-assignment-editor-secondary.js';
import '../d2l-activity-editor-footer.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';

import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from '../state/activity-store.js';
import { trustedSitesProviderFn } from '../shared/trusted-site-provider.js';

class AssignmentEditor extends AsyncContainerMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(ActivityEditorMixin(MobxLitElement)))) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			/**
			 * True if the new html editor config is on
			 */
			htmlNewEditorEnabled: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
			/**
			* based on the config variable d2l.Languages.Terminology.LearningOutcomes
			*/
			outcomesTerm: { type: String },
			/**
			* based on the config variable d2l.Languages.Terminology.LearningOutcomes
			*/
			browseOutcomesText: { type: String },
			/**
			* Set the WidthType on the template to constrain page width if necessary
			*/
			widthType: { type: String, attribute: 'width-type' },
			/**
			 * Is Creating New
			 */
			isNew: { type: Boolean },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super(store);

		this.type = 'assignment';
		this.telemetryId = 'assignments';
		this.skeleton = true;
	}

	render() {
		return html`
			<d2l-activity-editor
				type="${this.type}"
				telemetryId="${this.telemetryId}"
				.href=${this.href}
				.token=${this.token}
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}"
				width-type="${this.widthType}"
				error-term="${this.localize('assignmentSaveError')}"
				?isnew="${this.isNew}">

				${this._editorTemplate}

			</d2l-activity-editor>
		`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	get _editorTemplate() {
		const activity = store.get(this.href);
		const {
			specializationHref
		} = activity || {};

		return html`
			<slot name="editor-nav" slot="header"></slot>
			<div slot="primary" class="d2l-activity-assignment-editor-primary-panel">
				<d2l-activity-assignment-editor-detail
					activity-usage-href=${this.href}
					.href="${specializationHref}"
					.token="${this.token}">
				</d2l-activity-assignment-editor-detail>
			</div>
			<div slot="secondary">
				<d2l-activity-assignment-editor-secondary
					.href="${specializationHref}"
					.token="${this.token}"
					activity-usage-href="${this.href}">
				</d2l-activity-assignment-editor-secondary>
			</div>
		`;
	}

	_onRequestProvider(e) {
		if (e.detail.key === 'd2l-provider-html-editor-enabled') {
			e.detail.provider = this.htmlEditorEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-provider-html-new-editor-enabled') {
			e.detail.provider = this.htmlNewEditorEnabled;
			e.stopPropagation();
			return;
		}

		// Provides unfurl API endpoint for d2l-labs-attachment component
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L110
		if (e.detail.key === 'd2l-provider-unfurl-api-endpoint') {
			e.detail.provider = () => this.unfurlEndpoint;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-provider-outcomes-term') {
			e.detail.provider = this.outcomesTerm;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-provider-browse-outcomes-text') {
			e.detail.provider = this.browseOutcomesText;
			e.stopPropagation();
			return;
		}

		// Provides function to validate if a URL is trusted for d2l-labs-attachment
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L115
		if (e.detail.key === 'd2l-provider-trusted-site-fn') {
			e.detail.provider = trustedSitesProviderFn(this.trustedSitesEndpoint);
			e.stopPropagation();
		}
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
