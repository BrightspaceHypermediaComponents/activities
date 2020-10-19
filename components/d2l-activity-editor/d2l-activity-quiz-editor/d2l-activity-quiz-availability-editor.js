import '../d2l-activity-accordion-collapse.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from '../state/activity-store.js';

class ActivityQuizAvailabilityEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorFeaturesMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			super.styles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}
			`
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse
				?has-errors=${this._errorInAccordion()}>

				<span slot="header">
					${this.localize('hdrAvailability')}
				</span>
			</d2l-activity-accordion-collapse>
		`;
	}
	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		const activity = store.get(this.href);
		if (!activity || !activity.dates) {
			return false;
		}

		return !!(activity.dates.endDateErrorTerm || activity.dates.startDateErrorTerm);
	}
}

customElements.define(
	'd2l-activity-quiz-availability-editor',
	ActivityQuizAvailabilityEditor
);
