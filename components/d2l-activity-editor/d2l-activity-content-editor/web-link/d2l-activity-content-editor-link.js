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
import { getInvalidWeblinkKey } from './helpers/url-validation-helper.js'

class ContentEditorLink extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

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

			// TODO: this is a little awkward, cleanup
			// if (link === defaultPlaceholderLink) {
			// 	link = '';
			// }
		}

		return html`
			<div id="content-link-container">
				<d2l-input-text
					id="content-link"
					value="${link}"
					@change="${this._saveOnChange('link')}"
					@input="${this._saveLinkOnInput}"
					label="${this.localize('content.link')} *"
					aria-invalid="${this._linkError ? 'true' : ''}"
					prevent-submit
					novalidate
					?skeleton="${this.skeleton}"
				>
				</d2l-input-text>
				${this._renderLinkTooltip()}
			</div>
		`;
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
				?showing="${!!this._linkError}"
			>
				${this._linkError}
			</d2l-tooltip>
		`;
	}

	_saveOnChange(jobName) {
	 	this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveLinkOnInput(e) {
		const link = e.target.value.trim();

		const invalidWeblinkError = getInvalidWeblinkKey(link, this.entity.isExternalResource);

		if (invalidWeblinkError) {
			this.setError('_linkError', invalidWeblinkError, 'link-tooltip');
			return;
		}

		this.clearError('_linkError');
		this._debounceJobs.link = Debouncer.debounce(
			this._debounceJobs.link,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this.onSave(link)
		);
	}
}

customElements.define('d2l-activity-content-editor-link', ContentEditorLink);
