import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import './d2l-activity-assignment-editor-secondary.js';
import './d2l-activity-assignment-editor-footer.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';

import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/assignment-store.js';

class AssignmentEditor extends ActivityEditorContainerMixin(LocalizeActivityAssignmentEditorMixin(ActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-2
			*/
			milestoneTwoEnabled: { type: Boolean },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-3-competencies
			*/
			milestoneThreeCompetenciesEnabled: { type: Boolean },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-3-default-scoring-rubric
			*/
			milestoneThreeDefaultScoringRubricEnabled: { type: Boolean },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-3-outcomes
			*/
			milestoneThreeOutcomesEnabled: { type: Boolean },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-3-release-conditions
			*/
			milestoneThreeReleaseConditionsEnabled: { type: Boolean },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-3-special-access
			*/
			milestoneThreeSpecialAccessEnabled: { type: Boolean },
			/**
			* based on the LaunchDarkly flag face-assignments-milestone-4-email-submission
			*/
			milestoneFourEmailSubmission: { type: Boolean },
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
			widthType: { type: String, attribute: 'width-type' }
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
			.d2l-activity-assignment-editor-primary-panel {
				padding: 20px;
			}
			d2l-alert {
				max-width: 100%;
				margin-bottom: 10px;
			}
			.d2l-activity-assignment-editor-secondary-panel {
				padding: 10px;
			}
			div[slot="secondary"] {
				height: 100%;
				background: var(--d2l-color-gypsum);
			}
		`;
	}

	constructor() {
		super(store);

		this.type = 'assignment';
		this.telemetryId = 'assignments';
	}

	_onRequestProvider(e) {
		if (e.detail.key === 'd2l-provider-html-editor-enabled') {
			e.detail.provider = this.htmlEditorEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-two') {
			e.detail.provider = this.milestoneTwoEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-three-competencies') {
			e.detail.provider = this.milestoneThreeCompetenciesEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-three-default-scoring-rubric') {
			e.detail.provider = this.milestoneThreeDefaultScoringRubricEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-three-outcomes') {
			e.detail.provider = this.milestoneThreeOutcomesEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-three-release-conditions') {
			e.detail.provider = this.milestoneThreeReleaseConditionsEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-three-special-access') {
			e.detail.provider = this.milestoneThreeSpecialAccessEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-milestone-four-email-submission') {
			e.detail.provider = this.milestoneFourEmailSubmission;
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

		// Provides orgUnitId for d2l-labs-attachment
		// https://github.com/Brightspace/attachment/blob/74a66e85f03790aa9f4e6ec5025cd3c62cfb5264/mixins/attachment-mixin.js#L19
		if (e.detail.key === 'd2l-provider-org-unit-id') {
			const activity = store.getActivity(this.href);
			const assignment = activity && store.getAssignment(activity.assignmentHref);
			const richTextEditorConfig = assignment && assignment.instructionsRichTextEditorConfig;
			e.detail.provider = richTextEditorConfig && richTextEditorConfig.properties && richTextEditorConfig.properties.orgUnit && richTextEditorConfig.properties.orgUnit.OrgUnitId;
			e.stopPropagation();
			return;
		}

		// Provides function to validate if a URL is trusted for d2l-labs-attachment
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L115
		if (e.detail.key === 'd2l-provider-trusted-site-fn') {
			e.detail.provider = () => url => {
				const origin = new URL(url).origin;
				const unfilteredContent = `<iframe src="${origin}"></iframe>`;

				return new Promise((resolve, reject) => {
					const params = {
						filterMode: 1, // strict mode for html filtering. Refer to D2L.LP.TextProcessing.FilterModes
						html: unfilteredContent
					};
					const options = {
						success: resolve,
						failure: reject
					};
					D2L.LP.Web.UI.Rpc.Connect(
						D2L.LP.Web.UI.Rpc.Verbs.POST,
						new D2L.LP.Web.Http.UrlLocation(this.trustedSitesEndpoint),
						params,
						options
					);
				}).then(filteredContent => {
					const matchSrc = function(str) {
						// excludes matching query string as filterHtml may modify the query string
						return str.match(/src=["']([^?"']+)/i);
					};
					const unfilteredMatch = matchSrc(unfilteredContent);
					const unfilteredSrc = unfilteredMatch && unfilteredMatch.length === 2 && unfilteredMatch[1];

					const filteredMatch = matchSrc(filteredContent);
					const filteredSrc = filteredMatch && filteredMatch.length === 2 && filteredMatch[1];

					return unfilteredSrc === filteredSrc;
				});
			};
			e.stopPropagation();
		}
	}

	get _editorTemplate() {
		const activity = store.getActivity(this.href);
		if (!activity) {
			return html``;
		}

		const {
			assignmentHref
		} = activity;

		return html`
			<d2l-template-primary-secondary slot="editor" width-type="${this.widthType}">
				<slot name="editor-nav" slot="header"></slot>
				<div slot="primary" class="d2l-activity-assignment-editor-primary-panel">
					<d2l-alert type="error" ?hidden=${!this.isError}>${this.localize('assignmentSaveError')}</d2l-alert>
					<d2l-activity-assignment-editor-detail
						href="${assignmentHref}"
						.token="${this.token}">
					</d2l-activity-assignment-editor-detail>
				</div>
				<div slot="secondary">
					<d2l-activity-assignment-editor-secondary
						href="${assignmentHref}"
						.token="${this.token}"
						class="d2l-activity-assignment-editor-secondary-panel">
					</d2l-activity-assignment-editor-secondary>
				</div>
				<d2l-activity-assignment-editor-footer
					href="${assignmentHref}"
					.token="${this.token}"
					slot="footer"
					class="d2l-activity-assignment-editor-footer">
				</d2l-activity-assignment-editor-footer>
			</d2l-template-primary-secondary>
		`;
	}

	render() {
		return html`
			<d2l-activity-editor
				type="${this.type}"
				telemetryId="${this.telemetryId}"
				.href=${this.href}
				.token=${this.token}
				?is-saving=${this.isSaving}
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}">

				${this._editorTemplate}

			</d2l-activity-editor>

			<d2l-dialog-confirm title-text="${this.localize('discardChangesTitle')}" text=${this.localize('discardChangesQuestion')}>
				<d2l-button slot="footer" primary dialog-action="confirm">${this.localize('yesLabel')}</d2l-button>
				<d2l-button slot="footer" dialog-action="cancel">${this.localize('noLabel')}</d2l-button>
			</d2l-dialog-confirm>
		`;
	}

	async save() {
		const activity = store.getActivity(this.href);
		if (!activity) {
			return;
		}

		const assignment = store.getAssignment(activity.assignmentHref);
		if (!assignment) {
			return;
		}

		await assignment.save();
	}

	hasPendingChanges() {
		const activity = store.getActivity(this.href);
		if (!activity) {
			return false;
		}

		const assignment = store.getAssignment(activity.assignmentHref);
		if (!assignment) {
			return false;
		}

		return assignment.dirty;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetchActivity(this.href, this.token));
		}
	}

	delete() {
		// the decision is not to delete assignment at this moment, keeping the structure here for future
		return true;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
