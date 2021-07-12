import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentEditorConstants } from '../constants';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { getWeblinkError } from './helpers/url-validation-helper.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentEditorLink extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {
		return {
			entity: { type: Object },
			onSave: { type: Function },
			_linkError: { type: String }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			radioStyles,
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
				.d2l-display-options-text {
					margin-bottom: 6px;
				}
				.d2l-label-text {
					display: inline-block;
				}
				#open-new-tab-help-span {
					margin-left: 12px;
				}
				:host([dir='rtl']) #open-new-tab-help-span {
					margin-left: 0;
					margin-right: 12px;
				}
			`
		];
	}

	constructor() {
		super();
		this._debounceJobs = {};
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	render() {
		let link = '';
		let isExternalResource = false;

		if (this.entity) {
			this.skeleton = false;
			link = this.entity.link;
			isExternalResource = this.entity.isExternalResource;
		}

		return html`
			<div id="content-link-container">
				<d2l-input-text
					id="content-link"
					value="${link}"
					@change="${this._saveOnChange('link')}"
					@input="${this._saveLink}"
					label="${this.localize('content.link')} *"
					aria-invalid="${this._linkError ? 'true' : ''}"
					maxlength="${ContentEditorConstants.LINK_MAX_LENGTH}"
					prevent-submit
					novalidate
					?skeleton="${this.skeleton}"
				>
				</d2l-input-text>
				${this._renderLinkTooltip()}
			</div>
			<div id="content-link-options-container">
				<div class="d2l-display-options-text">
					<label class="d2l-label-text d2l-skeletize">
						${this.localize('content.displayOptions')}
					</label>
				</div>
				<label class="d2l-input-radio-label d2l-skeletize">
					<input
						id="embed-on-page"
						type="radio"
						name="link-display-group"
						value="embed"
						?checked="${!isExternalResource}"
						@change="${this._saveLink}">
						${this.localize('content.embedOnPage')}
				</label>
				<label class="d2l-input-radio-label d2l-skeletize">
					<input
						id="open-new-tab"
						type="radio"
						name="link-display-group"
						value="newTab"
						?checked="${isExternalResource}"
						@change="${this._saveLink}">
						${this.localize('content.openNewTab')}
						<span id="open-new-tab-help-span" tabindex="0">
							<d2l-icon
								icon="d2l-tier1:help">
							</d2l-icon>
							<d2l-tooltip
								for="open-new-tab-help-span">
								${this.localize('content.openNewTabRecommendation')}
								${this.localize('content.openNewTabHelp')}
							</d2l-tooltip>
						</span>
				</label>
			</div>
		`;
	}

	validate() {
		const link = this.shadowRoot.getElementById('content-link').value;
		const isExternalResource = this.shadowRoot.getElementById('open-new-tab').checked;
		const invalidWeblinkError = getWeblinkError(link, isExternalResource, true);

		this.clearError('_linkError');
		this.setError('_linkError', invalidWeblinkError);
	}

	_renderLinkTooltip() {
		if (!this._linkError) {
			return html ``;
		}

		return html`
			<d2l-tooltip
				id="link-tooltip"
				for="content-link"
				position="bottom"
				tabIndex="0"
				state="error"
				align="start"
				?showing="${!!this._linkError}"
			>
				${this._linkError}
			</d2l-tooltip>
		`;
	}

	_saveLink() {
		const link = this.shadowRoot.getElementById('content-link').value;
		const isExternalResource = this.shadowRoot.getElementById('open-new-tab').checked;
		const invalidWeblinkError = getWeblinkError(link, isExternalResource);

		this._debounceJobs.link = Debouncer.debounce(
			this._debounceJobs.link,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => {
				if (invalidWeblinkError) {
					this.setError('_linkError', invalidWeblinkError);
				}
				else {
					this.clearError('_linkError');
					this.onSave(link, isExternalResource);
				}
			});
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}
}
customElements.define('d2l-activity-content-editor-link', ContentEditorLink);
