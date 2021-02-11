import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-hmc/foundation-components/components/activity/editor/d2l-activity-editor-main.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-outcomes.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';
import '../d2l-activity-quiz-editor/d2l-activity-quiz-divider';
import './d2l-activity-quiz-question-editor.js';

import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { css } from 'lit-element/lit-element.js';
import { editorLayoutStyles } from '../styles/activity-editor-styles';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

import { shared as store } from './state/quiz-store.js';

class QuizEditorDetail extends ActivityEditorMixin(AsyncContainerMixin(SkeletonMixin(LocalizeActivityQuizEditorMixin(RtlMixin(MobxLitElement))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			editorLayoutStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host([skeleton]) .d2l-skeletize::before {
					z-index: 2;
				}
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
				d2l-button-subtle {
					/* to override the padding added by d2l-button-subtle */
					left: 0.6rem;
					position: relative;
					right: 0;
				}
				:host([dir="rtl"]) d2l-button-subtle {
					/* to override the padding added by d2l-button-subtle */
					left: 0;
					position: relative;
					right: 0.6rem;
				}
				#score-and-duedate-container {
					padding-bottom: 0;
				}
				d2l-alert {
					margin-bottom: 10px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.skeleton = true;
	}

	render() {
		const quiz = store.get(this.href);

		const {
			name,
			canEditName,
			canPreviewQuiz,
			description,
			canEditDescription,
			descriptionRichTextEditorConfig,
			descriptionIsDisplayed
		} = quiz || {};

		const descriptionLang = this.localize('description');

		return html`
		<d2l-alert has-close-button ?hidden=${this.skeleton || descriptionIsDisplayed || !description || description.length === 0}>
			${this.localize('textIsDisplayedPart1')}
			${this.localize('textIsDisplayedSingularPart2', 'field', descriptionLang)}
		</d2l-alert>
			<div id="quiz-name-container">
				<d2l-input-text
					?skeleton="${this.skeleton}"
					id="quiz-name"
					maxlength="256"
					value="${name}"
					@input="${this._setName}"
					label="${this.localize('name')}"
					required
					?disabled="${!canEditName}"
					prevent-submit>
				</d2l-input-text>
			</div>

			<div id="score-and-duedate-container">
				<div id="duedate-container" class="d2l-editor-layout-section">
					<d2l-activity-due-date-editor
						?skeleton="${this.skeleton}"
						.href="${this.activityUsageHref}"
						.token="${this.token}">
					</d2l-activity-due-date-editor>
				</div>
			</div>

			<div id="quiz-description-container">
				<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
					${descriptionLang}
				</div>
				<div class="d2l-skeletize">
					<d2l-activity-text-editor
						.value="${description}"
						.richtextEditorConfig="${descriptionRichTextEditorConfig}"
						@d2l-activity-text-editor-change="${this._saveDescriptionOnChange}"
						ariaLabel="${descriptionLang}"
						?disabled="${canEditDescription === undefined ? false : !canEditDescription}">
					</d2l-activity-text-editor>
				</div>
			</div>

			<d2l-activity-quiz-divider
				?skeleton="${this.skeleton}">
				<h4 slot="header">${this.localize('dividerHeader')}</h4>
				<d2l-button-subtle
					text=${this.localize('previewLabel')}
					slot="action"
					@click="${this._openPreview}"
					?disabled="${!canPreviewQuiz}"
					icon="tier1:preview">
				</d2l-button-subtle>
			</d2l-activity-quiz-divider>

			<d2l-activity-quiz-question-editor href="${this.activityUsageHref}" .token="${this.token}">
			</d2l-activity-quiz-question-editor>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	async cancelCreate() {
		const quiz = store.get(this.href);
		return quiz && quiz.delete();
	}

	hasPendingChanges() {
		const quiz = store.get(this.href);
		if (!quiz) {
			return false;
		}

		return quiz.dirty;
	}

	async save() {
		const quiz = store.get(this.href);
		if (!quiz) {
			return;
		}

		await quiz.save();
	}

	_openPreview() {
		const quiz = store.get(this.href);
		if (!quiz || !quiz.previewHref) {
			return;
		}

		window.open(quiz.previewHref);
	}

	_saveDescriptionOnChange(e) {
		store.get(this.href).setDescription(e.detail.content);
	}

	_saveHeaderOnChange(e) {
		store.get(this.href).setHeader(e.detail.content);
	}

	async _setName(e) {
		store.get(this.href).setName(e.target.value);
	}
}
customElements.define('d2l-activity-quiz-editor-detail', QuizEditorDetail);
