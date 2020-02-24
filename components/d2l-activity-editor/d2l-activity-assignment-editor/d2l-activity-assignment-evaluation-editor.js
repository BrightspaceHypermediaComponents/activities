import './d2l-activity-assignment-annotations-editor.js';
import './d2l-activity-assignment-annotations-summary.js';
import './d2l-activity-assignment-anonymous-marking-editor.js';
import './d2l-activity-assignment-anonymous-marking-summary.js';
import '../d2l-activity-rubrics/d2l-activity-rubrics-list-container.js';
import './d2l-assignment-turnitin-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityAssignmentEvaluationEditor extends LocalizeMixin(LitElement) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			activityUsageHref: { type: String }
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

			.editor {
				margin: 1rem 0;
			}

			.summary {
				list-style: none;
				padding-left: 0.2rem;
				color: var(--d2l-color-galena);
			}
		`;
	}

	static async getLocalizeResources(langs) {

		return getLocalizeResources(langs, import.meta.url);
	}

	_renderAnonymousMarkingSummary() {

		return html`
			<d2l-activity-assignment-anonymous-marking-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-anonymous-marking-summary>
		`;
	}

	_renderAnonymousMarkingEditor() {

		return html`
			<d2l-activity-assignment-anonymous-marking-editor
				class="editor"
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-anonymous-marking-editor>
		`;
	}

	_renderAnnotationsSummary() {

		return html`
			<d2l-activity-assignment-annotations-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-annotations-summary>
		`;
	}

	_renderAnnotationsEditor() {

		return html`
			<d2l-activity-assignment-annotations-editor
				class="editor"
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-annotations-editor>
		`;
	}

	_renderTurnitinSummary() {

		return html``;
	}

	_renderTurnitinEditor() {

		return html`
			<d2l-assignment-turnitin-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-assignment-turnitin-editor>
		`;
	}

	_renderRubricsCollectionEditor() {
		return html`
			<d2l-activity-rubrics-list-container
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-rubrics-list-container>
		`;
	}

	render() {

		return html`
			<d2l-labs-accordion-collapse flex header-border>
				<h4 class="header" slot="header">
					${this.localize('evaluationAndFeedback')}
				</h4>
				<ul class="summary" slot="summary">
					${this._renderAnonymousMarkingSummary()}
					${this._renderAnnotationsSummary()}
					${this._renderTurnitinSummary()}
				</ul>
				${this._renderRubricsCollectionEditor()}
				${this._renderAnnotationsEditor()}
				${this._renderAnonymousMarkingEditor()}
				${this._renderTurnitinEditor()}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define(
	'd2l-activity-assignment-evaluation-editor',
	ActivityAssignmentEvaluationEditor
);
