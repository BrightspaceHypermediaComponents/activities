import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class AssignmentEditorDetail extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_name: { type: String },
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
		this._setEntityType(AssignmentEntity);
		this.name = 'Untitled';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {
		if (assignment) {
			this._name = assignment.name();
		}
	}

	render() {
		return html`
			<h2>Hello ${this._name}!</h2>
			<div>Localization Example: ${this.localize('myLangTerm')}</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
