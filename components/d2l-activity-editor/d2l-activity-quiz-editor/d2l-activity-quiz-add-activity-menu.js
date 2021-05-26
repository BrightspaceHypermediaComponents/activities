import '@brightspace-ui/core/components/dropdown/dropdown-button.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/quiz-store.js';

class ActivityQuizAddActivityMenu extends ActivityEditorMixin(SkeletonMixin(LocalizeActivityQuizEditorMixin(RtlMixin(MobxLitElement)))) {

	static get styles() {
		return [
			super.styles,
			css`
				.d2l-quiz-add-primary {
					margin-left: 0;
					margin-right: 0.75rem;
				}
				:host([dir="rtl"]) .d2l-quiz-add-primary {
					margin-left: 0.75rem;
					margin-right: 0;
				}
				@media only screen and (max-width: 767px) {
					:host() {
						display: flex;
						flex-direction: column;
					}
					.d2l-quiz-add-primary {
						margin: 0 0 0.5rem 0;
						width: 100%;
					}
					.d2l-quiz-add-secondary {
						width: 100%;
					}
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const quiz = store.get(this.href) || {};
		const types = quiz.activityTypes;

		if (!types) {
			return html``;
		}

		return html`
			${this._renderAddExisting(types)}
			${this._renderCreateNew(types)}
		`;
	}

	_onSelect(e) {
		if (!e || !e.target) {
			return;
		}

		const type = e.target.getAttribute('type');
		if (!type) {
			return;
		}

		const url = new D2L.LP.Web.Http.UrlLocation(`/d2l/lms/question/new/${type}`);
		D2L.LP.Web.UI.Legacy.MasterPages.Dialog.OpenFullscreen(
			/*             location: */ url,
			/*          srcCallback: */ 'SrcCallBack',
			/*      responseDataKey: */ 'result',
			/*              buttons: */ [],
			/* forceTriggerOnCancel: */ false,
			/*            titleText: */ ''
		);

		// "Save" handler
		// delayedResult.AddListener(result => console.log(result));
	}

	_renderActivityType(activityType) {
		return html`
			<d2l-menu-item
				text="${activityType.name()}"
				type="${activityType.type()}"
			></d2l-menu-item>
		`;
	}

	_renderAddExisting(types) {
		const externalTypes = types.filter(type => type.isExternal());
		const disabled = !externalTypes || !externalTypes.length;
		const content = externalTypes.map(type => this._renderActivityType(type));

		return this._renderMenu('addExistingLabel', disabled, true, content);
	}

	_renderCreateNew(types) {
		const groupingTypes = types.filter(type => type.isGrouping());
		const questionMenu = this._renderQuestions(types);
		const disabled = !questionMenu && (!groupingTypes || !groupingTypes.length);
		const content = html`
			${questionMenu}
			${groupingTypes.map(type => this._renderActivityType(type))}
		`;

		return this._renderMenu('createNewLabel', disabled, false, content);
	}

	_renderMenu(labelKey, disabled, primary, content) {
		const label = this.localize(labelKey);

		return html`
			<d2l-dropdown-button
				text="${label}"
				class="${primary ? 'd2l-quiz-add-primary' : 'd2l-quiz-add-secondary'}"
				?primary="${primary}"
				?disabled="${disabled}">
				${disabled ? null : html`
					<d2l-dropdown-menu align="start" no-pointer min-width="260">
						<d2l-menu label="${label}" @d2l-menu-item-select="${this._onSelect}">
							${content}
						</d2l-menu>
					</d2l-dropdown-menu>
				`}
			</d2l-dropdown-button>
		`;
	}

	_renderQuestions(types) {
		const questionTypes = types.filter(type => type.isQuestion());
		if (!questionTypes || !questionTypes.length) {
			return null;
		}

		const questionsTerm = this.localize('addQuestionsLabel');

		return html`
			<d2l-menu-item text="${questionsTerm}">
				<d2l-menu label="${questionsTerm}">
					${questionTypes.map(type => this._renderActivityType(type))}
				</d2l-menu>
			</d2l-menu-item>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-add-activity-menu',
	ActivityQuizAddActivityMenu
);
