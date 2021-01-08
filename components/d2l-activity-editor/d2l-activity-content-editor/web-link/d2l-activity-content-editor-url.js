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

class ContentEditorUrl extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			entity: { type: Object },
			onSave: { type: Function },
			_urlError: { type: String }
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
		this.skeleton = true;
	}

	render() {
		let link = '';
		if (this.entity) {
			this.skeleton = false;
			link = this.entity.link;
		}

		return html`
            <d2l-input-text
            >
            </d2l-input-text>
		`;
	}

	// _renderTitleTooltip() {
	// 	if (!this._titleError) {
	// 		return html ``;
	// 	}

	// 	return html`
	// 		<d2l-tooltip
	// 			id="title-tooltip"
	// 			for="content-title"
	// 			position="bottom"
	// 			?showing="${!!this._titleError}">
	// 			${this._titleError}
	// 		</d2l-tooltip>
	// 	`;
	// }

	// _saveOnChange(jobName) {
	// 	this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	// }

	// _saveTitleOnInput(e) {
	// 	const title = e.target.value;
	// 	const isTitleEmpty = (title || '').trim().length === 0;

	// 	if (isTitleEmpty) {
	// 		this.setError('_titleError', 'content.emptyNameField', 'title-tooltip');
	// 	} else {
	// 		this.clearError('_titleError');
	// 		this._debounceJobs.title = Debouncer.debounce(
	// 			this._debounceJobs.title,
	// 			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
	// 			() => this.onSave(title)
	// 		);
	// 	}
	// }
}
customElements.define('d2l-activity-content-editor-url', ContentEditorUrl);
