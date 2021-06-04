import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentEditorLtiLinkOptions extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {
		return {
			entity: { type: Object },
			onSave: { type: Function }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			radioStyles,
			activityContentEditorStyles,
			css`
				.display-options-text {
					padding: 0 0 7px 0;
				}
				#open-new-tab-help-span {
					margin-left: 7px;
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
		let isExternalResource = false;

		if (this.entity) {
			this.skeleton = false;
			isExternalResource = this.entity.isExternalResource;
		}

		return html`
		<div id="content-link-options-container" class="d2l-skeletize">
			<div class="d2l-label-text display-options-text">${this.localize('content.displayOptions')}</div>
			<label class="d2l-input-radio-label">
				<input
					id="embed-on-page"
					type="radio"
					name="link-display-group"
					value="embed"
                    ?checked="${!isExternalResource}"
                    @change="${this._saveLinkOptions}">
					${this.localize('content.embedOnPage')}
			</label>
			<label class="d2l-input-radio-label">
				<input
					id="open-new-tab"
					type="radio"
					name="link-display-group"
					value="newTab"
                    ?checked="${isExternalResource}"
                    @change="${this._saveLinkOptions}">
					${this.localize('content.openNewTab')}
					<span id="open-new-tab-help-span" tabindex="0">
						<d2l-icon
							icon="d2l-tier1:help">
						</d2l-icon>
						<d2l-tooltip
							for="open-new-tab-help-span">
							${this.localize('content.openNewTabHelp')}
						</d2l-tooltip>
					</span>
			</label>
		</div>
		`;
	}

	_saveLinkOptions(e) {
		const isExternalResource = e.target.value === 'newTab';
		this.onSave(isExternalResource);
	}
}
customElements.define('d2l-activity-content-lti-link-options', ContentEditorLtiLinkOptions);
