import './d2l-activity-assignment-availability-editor.js';
import './d2l-activity-assignment-evaluation-editor.js';
import './d2l-activity-assignment-editor-submission-and-completion.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class AssignmentEditorSecondary extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
			css`
				:host {
					display: block;
					background: var(--d2l-color-gypsum);
				}
				:host([hidden]) {
					display: none;
				}
				:host > * {
					background: var(--d2l-color-white);
					margin-bottom: 10px;
					border-radius: 8px;
					padding: 20px;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);
		this._debounceJobs = {};

		this._activityUsageHref = '';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {
		if (!assignment) {
			return;
		}

		this._activityUsageHref = assignment.activityUsageHref();
	}

	render() {
		return html`

			<d2l-activity-assignment-availability-editor
				href="${this._activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-assignment-availability-editor>

			<d2l-activity-assignment-editor-submission-and-completion
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-editor-submission-and-completion>

			<d2l-activity-assignment-evaluation-editor
				href="${this.href}"
				.token="${this.token}"
				activityUsageHref=${this._activityUsageHref}>
			</d2l-activity-assignment-evaluation-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-secondary', AssignmentEditorSecondary);
