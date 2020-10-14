import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-outcomes.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';

import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/quiz-store.js';

class QuizEditorDetail extends ActivityEditorMixin(AsyncContainerMixin(SkeletonMixin(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div,
				.d2l-activity-label-container {
					margin-bottom: 8px;
				}
				d2l-icon {
					padding-right: 1rem;
				}
				:host([dir="rtl"]) d2l-icon {
					padding-left: 1rem;
					padding-right: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.skeleton = false;
		this.saveOrder = 2000;
	}

	render() {
		const quiz = store.get(this.href);

		const {
			name,
			canEditName,
		} = quiz || {};

		return html`
			<div id="quiz-name-container">
				<d2l-input-text
					?skeleton="${this.skeleton}"
					id="quiz-name"
					maxlength="256"
					value="${name}"
					@input="${this._setName}"
					required
					?disabled="${!canEditName}"
					prevent-submit>
			</d2l-input-text>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	async save() {
		console.log("Saving... quiz")
	}

	async _setName(e) {
		store.get(this.href).setName(e.target.value);
	}
}
customElements.define('d2l-activity-quiz-editor-detail', QuizEditorDetail);
