import { css, html, LitElement } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity';
import { repeat } from 'lit-html/directives/repeat';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';

class ActivityGradeCandidateSelector extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_gradeCandidateEntities: { type: Array },
			selected: { type: Object }
		};
	}

	static get styles() {
		return [
			selectStyles,
			css`
			:host {
				display: block;
			}
			`
		];
	}

	constructor() {
		super();
		this._setEntityType(GradeCandidateCollectionEntity);
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._gradeCandidateEntities = entity.getGradeCandidateEntities();
		}

		super._entity = entity;
	}

	_setSelected(e) {
		this.selected = this._gradeCandidateEntities[e.target.selectedIndex];
	}

	render() {
		return html`
			<select
				id="grade-candidates"
				class="d2l-input-select"
				@change="${this._setSelected}"
			>
				${repeat(this._gradeCandidateEntities, entity => entity, (entity, index) => html`
					<option value="${index}">${entity.name()}</option>
				`)}
			</select>
		`;
	}
}

customElements.define('d2l-activity-grade-candidate-selector', ActivityGradeCandidateSelector);
