/* eslint-disable indent */
import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-content-lti-link-jump-icon.js';
import './d2l-activity-content-lti-link-preview.js';
import { bodyStandardStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityContentLTILinkExternalActivity extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object },
			showInNewTab: { type: Boolean },
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				.d2l-external-activity-outer-frame {
					display: flex;
					flex-direction: column;
					height: 100%;
					justify-content: flex-start;
				}
				.d2l-content-link-external-activity {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}
				.d2l-external-activity-inner-frame {
					margin-top: 6px;
				}
				d2l-activity-content-lti-link-preview {
					height: 100%;
				}
			`,
			labelStyles,
			bodyStandardStyles
		];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.showInNewTab = false;
		this.activityWindowPopout = null;
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
				<div class="d2l-external-activity-inner-frame d2l-skeletize">
					${this.showInNewTab ?
						html`
							<d2l-activity-content-lti-link-jump-icon>
								<p class="d2l-body-standard">
									${this.localize('content.externalActivityOpened')}
								</p>
							</d2l-activity-content-lti-link-jump-icon>` :
						html`<d2l-activity-content-lti-link-preview .entity=${this.entity}></d2l-activity-content-lti-link-preview>`
					}
				</div>
			</div>
		`;
	}

	_openPopout() {
		this.showInNewTab = true;
		if (this.activityWindowPopout && !this.activityWindowPopout.closed) {
			this.activityWindowPopout.focus();
			return;
		}

		this.activityWindowPopout = window.open(
			this.entity.link,
			'activityPopout',
			'width=1000,height=1000,scrollbars=no,toolbar=no,screenx=0,screeny=0,location=no,titlebar=no,directories=no,status=no,menubar=no'
		);

	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ActivityContentLTILinkExternalActivity);
