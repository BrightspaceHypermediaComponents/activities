/* eslint-disable indent */
import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-content-lti-link-jump-icon.js';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityContentLTILinkExternalActivity extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object },
			showIsOpened: { type: Boolean },
			skeleton: { type: Boolean },
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				.d2l-external-activity-outer-frame {
					flex-direction: column;
				}
				.d2l-content-link-external-activity {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}
				.d2l-external-activity-inner-frame {
					display: flex;
					margin-top: 18px;
					padding-top: 18px;
				}
			`,
			labelStyles
		];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.showIsOpened = false;
		this.activityWindowPopout = undefined;
	}

	render() {
		if (this.entity) {
			this.skeleton = false;
		}
		return html`
			<div class="d2l-external-activity-outer-frame d2l-skeletize-container">
				<div class="d2l-content-link-external-activity">
					<label class="d2l-label-text d2l-skeletize">
						${this.localize('content.externalActivity')}
					</label>
					<d2l-button-subtle
						text="${this.localize('content.openInNewWindow')}"
						icon="tier1:new-window"
						@click="${this._openPopout}"
						class="d2l-skeletize"
					>
					</d2l-button-subtle>
				</div>
				${this.showIsOpened ?
					html`<d2l-activity-content-lti-link-jump-icon text="${this.localize('content.externalActivityOpened')}"></d2l-activity-content-lti-link-jump-icon>` :
					html`<div class="d2l-external-activity-inner-frame d2l-skeletize">&nbsp;</div>`
				}
			</div>
		`;
	}

	_closePopout() {
		if (this.activityWindowPopout) {
			this.activityWindowPopout.close();
		}
	}

	_openPopout() {
		this.showIsOpened = true;
		if (this.activityWindowPopout) {
			if (!this.activityWindowPopout.closed) {
				this.activityWindowPopout.focus();
				return;
			}
		}

		this.activityWindowPopout = window.open(
			this.entity.link,
			'activityPopout',
			'width=1000,height=1000,scrollbars=no,toolbar=no,screenx=0,screeny=0,location=no,titlebar=no,directories=no,status=no,menubar=no'
		);

	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ActivityContentLTILinkExternalActivity);
