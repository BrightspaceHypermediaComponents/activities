import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { Rels } from 'd2l-hypermedia-constants';
import 'fastdom/fastdom.min.js';
import 'd2l-card/d2l-card.js';
import 'd2l-card/d2l-card-content-meta.js';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info.js';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name.js';
import 'd2l-typography/d2l-typography.js';
import SirenParse from 'siren-parser';

/**
 * @customElement
 * @polymer
 */
class D2lActivityCard extends PolymerElement {
	static get template() {
		return html`
			<style include="d2l-typography-shared-styles">
				:host {
					display: block;
				}

				d2l-card {
					height: 100%;
					width: 100%;
				}

				.d2l-activity-card-header-container {
					height: var(--course-image-height);
					line-height: 0;
				}

				.d2l-activity-card-content-container {
					display: flex;
					flex-direction: column;
					margin: -0.35rem 0 -0.1rem;
					overflow-wrap: break-word; /* replaces 'word-wrap' in Firefox, Chrome, Safari */
					overflow: hidden;
					word-wrap: break-word; /* IE/Edge */
				}

				.d2l-activity-card-content-organization-info {
					display: block;
				}

				@keyframes pulsingAnimation {
					0% { background-color: var(--d2l-color-sylvite); }
					50% { background-color: var(--d2l-color-regolith); }
					100% { background-color: var(--d2l-color-sylvite); }
				}
				.d2l-activity-list-item-pulse-placeholder {
					animation: pulsingAnimation 1.8s linear infinite;
					border-radius: 4px;
					height: 100%;
					width: 100%;
				}
			</style>

			<d2l-card text="[[_accessibilityText]]" href$="[[_activityHomepage]]" on-click="_sendClickEvent">
				<div class="d2l-activity-card-header-container" slot="header">
					<div class="d2l-activity-list-item-pulse-placeholder" hidden$="[[!_imageLoading]]"></div>
					<d2l-organization-image
						hidden$="[[_imageLoading]]"
						href="[[_organizationUrl]]"
						token="[[token]]"
						type="tile"
					></d2l-organization-image>
				</div>

				<div class="d2l-activity-card-content-container" slot="content">
					<d2l-organization-name href="[[_organizationUrl]]" token="[[token]]"></d2l-organization-name>
					<d2l-card-content-meta>
						<d2l-organization-info
							class="d2l-activity-card-content-organization-info"
							href="[[_organizationUrl]]"
							token="[[token]]"
							show-organization-code="[[showOrganizationCode]]"
							show-semester-name="[[showSemesterName]]"
						></d2l-organization-info>
					</d2l-card-content-meta>
				</div>
			</d2l-card>
		`;
	}

	static get properties() {
		return {
			href: {
				type: String,
				observer: '_onHrefChange'
			},
			token: String,
			entity: {
				type: Object,
				value: function() {
					return {};
				},
				observer: '_onEntityChange'
			},
			/*
			* Presentation Attributes
			*/
			showOrganizationCode: {
				type: Boolean,
				value: false
			},
			showSemesterName: {
				type: Boolean,
				value: false
			},
			_accessibilityData: {
				type: Object,
				value: function() { return {}; }
			},
			_accessibilityText: {
				type: String,
			},
			_semester: String,
			_organizationUrl: String,
			_activityHomepage: String,
			_imageLoading: {
				type: Boolean,
				value: true
			},
			sendEventOnClick: {
				type: Boolean,
				value: false,
			}
		};
	}
	connectedCallback() {
		super.connectedCallback();
		const image = this.shadowRoot.querySelector('d2l-organization-image');
		if (image) {
			image.addEventListener('d2l-organization-image-loaded', this._activityImageLoaded.bind(this));
		}
		this.addEventListener('d2l-organization-accessible', this._onD2lOrganizationAccessible);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		const image = this.shadowRoot.querySelector('d2l-organization-image');
		if (image) {
			image.removeEventListener('d2l-organization-image-loaded', this._activityImageLoaded);
		}
		this.removeEventListener('d2l-organization-accessible', this._onD2lOrganizationAccessible);
	}
	focus() {
		this.shadowRoot.querySelector('d2l-card').focus();
	}
	_onHrefChange(href) {
		if (!href ||
			(this.entity.hasLinkByRel &&
				this.entity.hasLinkByRel('self') &&
				this.entity.getLinkByRel('self').href === href)) {
			return;
		}

		this._fetchEntity(href)
			.then((sirenEntity) => this.entity = sirenEntity);
	}
	_fetchEntity(url) {
		if (!url) {
			return;
		}

		return window.d2lfetch
			.fetch(new Request(url, {
				headers: { Accept: 'application/vnd.siren+json' },
			}))
			.then(this._responseToSirenEntity.bind(this));
	}
	_responseToSirenEntity(response) {
		if (response.ok) {
			return response
				.json()
				.then((json) => SirenParse(json));
		}
		return Promise.reject(response.status + ' ' + response.statusText);
	}
	_onEntityChange(sirenEntity) {
		if (!sirenEntity ||
			!sirenEntity.hasAction ||
			!sirenEntity.hasLink
		) {
			return;
		}

		if (sirenEntity.hasAction('assign') && !sirenEntity.hasClass('enroll')) {
			this._actionEnroll = sirenEntity.getAction('assign');
		}
		this._activityHomepage = sirenEntity.hasLink(Rels.Activities.activityHomepage) && sirenEntity.getLinkByRel(Rels.Activities.activityHomepage).href;
		this._organizationUrl = sirenEntity.hasLink(Rels.organization) && sirenEntity.getLinkByRel(Rels.organization).href;

		this.href = sirenEntity.hasLink('self') && sirenEntity.getLinkByRel('self').href;
	}
	_onD2lOrganizationAccessible(e) {
		if (e && e.detail && e.detail.organization) {
			if (e.detail.organization.name) {
				this._accessibilityData.organizationName = e.detail.organization.name;
			}
			if (e.detail.organization.code) {
				this._accessibilityData.organizationCode = e.detail.organization.code;
			}
		}
		if (e.detail.semesterName) {
			this._accessibilityData.semesterName = e.detail.semesterName;
		}
		this._accessibilityText = this._accessibilityDataToString(this._accessibilityData);
	}
	_accessibilityDataToString(accessibility) {
		if (!accessibility) {
			return;
		}

		const textData = [
			accessibility.organizationName,
			accessibility.organizationCode,
			accessibility.semesterName
		];
		return textData.filter(function(text) {
			return text && typeof text === 'string';
		}).join(', ');
	}
	_activityImageLoaded() {
		this._imageLoading = false;
	}
	_sendClickEvent(event) {
		if (!this.sendEventOnClick || !this._activityHomepage || event.ctrlKey || event.metaKey) {
			return;
		}

		this.dispatchEvent(new CustomEvent('d2l-activity-card-clicked', {
			detail: {
				path: this._activityHomepage,
				orgUnitId: this._getOrgUnitId()
			},
			bubbles: true,
			composed: true
		}));
		event.preventDefault();
	}
	_getOrgUnitId() {
		if (!this._organizationUrl) {
			return;
		}
		const match = /[0-9]+$/.exec(this._organizationUrl);

		if (!match) {
			return;
		}
		return match[0];
	}
}

window.customElements.define('d2l-activity-card', D2lActivityCard);
