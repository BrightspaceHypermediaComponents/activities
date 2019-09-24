import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class AssignmentEditor extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_assignmentHref: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('./lang/en.js');
					break;
			}

			if (translations && translations.assignment) {
				return {
					language: lang,
					resources: translations.assignment
				};
			}
		}

		return null;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentActivityUsageChange(assignmentActivityUsage) {
		this._assignmentHref = assignmentActivityUsage.assignmentHref();
		// assignmentActivityUsage.onAssignmentChange((assignment) => {
		// 	this._name = assignment.name();
		// });
	}

	render() {
		return html`
			<d2l-activity-editor>
				<d2l-activity-assignment-editor-detail
					.href="${this._assignmentHref}"
					.token="${this.token}"
					slot="editor">
				</d2l-activity-assignment-editor-detail>
			</d2l-activity-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
