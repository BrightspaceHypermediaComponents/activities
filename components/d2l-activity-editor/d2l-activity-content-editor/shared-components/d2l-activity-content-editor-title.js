import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html } from 'lit-element/lit-element.js';
import { ContentEditorConstants } from '../constants';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentEditorTitle extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			entity: { type: Object },
			onSave: { type: Function },
			_titleError: { type: String },
			skeleton: { type: Boolean }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div {
					padding-bottom: 20px;
				}
				.d2l-activity-label-container {
					margin-bottom: 7px;
				}
			`
		];
	}

	constructor() {
		super();
		this._debounceJobs = {};
	}

	render() {
		let title = '';
		if (this.entity) {
			title = this.entity.title;
		}

		return html`
			<div id="content-title-container">
				<d2l-input-text
					id="content-title"
					maxlength="${ContentEditorConstants.TITLE_MAX_LENGTH}"
					value="${title}"
					@change="${this._saveOnChange('title')}"
					@input="${this._saveTitleOnInput}"
					label="${this.localize('content.name')} *"
					aria-invalid="${this._titleError ? 'true' : ''}"
					prevent-submit
					novalidate
					?skeleton="${this.skeleton}"
				>
				</d2l-input-text>
				${this._renderTitleTooltip()}
			</div>
			<slot name="due-date"></slot>
		`;
	}

	_renderTitleTooltip() {
		if (!this._titleError) {
			return html ``;
		}

		return html`
			<d2l-tooltip
				id="title-tooltip"
				for="content-title"
				position="bottom"
				?showing="${!!this._titleError}">
				${this._titleError}
			</d2l-tooltip>
		`;
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveTitleOnInput(e) {
		const title = e.target.value;
		const isTitleEmpty = (title || '').trim().length === 0;

		this._debounceJobs.title = Debouncer.debounce(
			this._debounceJobs.title,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => {
				if (isTitleEmpty) {
					this.setError('_titleError', 'content.emptyNameField');
				}
				else {
					this.clearError('_titleError');
					this.onSave(title);
				}
			}
		);
	}
}
customElements.define('d2l-activity-content-editor-title', ContentEditorTitle);
