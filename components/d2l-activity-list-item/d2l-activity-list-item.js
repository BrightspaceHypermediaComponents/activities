import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {MutableData} from '@polymer/polymer/lib/mixins/mutable-data.js';
import {beforeNextRender, afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import 'fastdom/fastdom.min.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import {Rels} from 'd2l-hypermedia-constants';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import 'd2l-button/d2l-button.js';
import './d2l-activity-list-item-enroll.js';
import SirenParse from 'siren-parser';
import {ActivityListItemResponsiveConstants} from './ActivityListItemResponsiveConstants.js';
import {ActivityListItemLocalize} from './ActivityListItemLocalize.js';
import 'd2l-colors/d2l-colors.js';

/**
 * @customElement
 * @polymer
 */
class D2lActivityListItem extends mixinBehaviors([
	IronResizableBehavior,
	D2L.PolymerBehaviors.FocusableBehavior], ActivityListItemResponsiveConstants(ActivityListItemLocalize(MutableData(PolymerElement)))) {
	static get template() {
		return html`
			<style include="d2l-typography-shared-styles"></style>
			<style include="d2l-offscreen-shared-styles">
				:host {
					display: block;
				}
				:host([active]) a.d2l-focusable {
					border-color: rgba(0, 111, 191, 0.4);
					box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
					border-radius: 6px;
				}
				.d2l-activity-list-item-top-line,
				.d2l-activity-list-item-bottom-line {
					display: none;
					border: 0;
					border-top: 1px solid var(--d2l-color-mica);
					margin: 0;
				}
				.d2l-activity-list-item-top-line {
					margin-top: -1px;
				}
				.d2l-activity-list-item-bottom-line {
					margin-bottom: -1px;
				}
				.d2l-activity-list-item-container:hover .d2l-activity-list-item-top-line,
				.d2l-activity-list-item-container:hover .d2l-activity-list-item-bottom-line {
					display: block;
				}
				.d2l-activity-list-item-container:hover {
					background-color: var(--d2l-color-regolith);
				}
				.d2l-activity-list-item-container {
					position: relative;
					height: 100%;
				}
				.d2l-activity-list-item-link-container {
					overflow: hidden;
					display: inline-flex;
					flex-direction: row;
					flex-grow: 1;
					flex-shrink: 1;
					flex-basis: 0;
					width: 100%;
				}
				.d2l-activity-list-item-link-text {
					display: inline-block;
					@apply --d2l-offscreen;
				}
				a.d2l-focusable {
					display: block;
					position: absolute;
					height: 100%;
					outline: none;
					width: 100%;
					z-index: 1;
				}
				/* P2-shadow */
				:host-context([dir="rtl"]) .d2l-activity-list-item-link-text {
					@apply --d2l-offscreen-rtl
				}
				/* P1-shady, P2-shady */
				:host(:dir(rtl)) .d2l-activity-list-item-link-text {
					@apply --d2l-offscreen-rtl
				}
				.d2l-activity-list-item-image {
					flex-shrink: 0;
					margin-right: 1.2rem;
					width: 216px;
					height: 120px;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
				}
				:host(:dir(rtl)) .d2l-activity-list-item-image {
					margin-right: 0;
					margin-left: 1.2rem;
				}
				.d2l-activity-list-item-title {
					flex-shrink: 0;
					@apply --d2l-heading-2;
					font-size: 0.95rem;
					line-height: 1.58rem;
					max-height: 3.16rem;
					overflow: hidden;
					color: var(--d2l-color-celestine);
					margin: 0.2rem 0;
				}
				.d2l-activity-list-item-container:hover .d2l-activity-list-item-title ,
				:host([active]) .d2l-activity-list-item-title {
					color: var(--d2l-color-celestine-minus-1);
					text-decoration: underline;
				}
				.d2l-activity-list-item-description p {
					margin: 0;
					padding: 0;
					@apply --d2l-body-compact-text;
					color: var(--d2l-color-ferrite);
				}
				.d2l-activity-list-item-footer,
				.d2l-activity-list-item-footer span d2l-icon {
					flex-shrink: 0;
					color: var(--d2l-color-tungsten);
					@apply --d2l-body-small-text;
				}
				.d2l-activity-list-item-footer {
					height: 1rem;
					margin: 0;
					margin-top: 0.45rem;
					overflow: hidden;
				}
				.d2l-activity-list-item-footer span d2l-icon {
					--d2l-icon-width: 18px;
					--d2l-icon-height: 18px;
				}
				.d2l-activity-list-item-footer span:first-child d2l-icon {
					display: none;
				}
				.d2l-activity-list-item-footer span {
					white-space: nowrap;
				}
				.d2l-activity-list-item-content {
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					width: 100%;
				}
				:host d2l-activity-list-item-enroll {
					margin: 0.5rem 1rem;
				}
				.d2l-activity-list-item-category {
					flex-shrink: 0;
					@apply --d2l-body-small-text;
					line-height: 0.9rem;
					margin: 0;
					overflow: hidden;
					height: 0.9rem;
					white-space: nowrap;
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
				.d2l-activity-list-item-category-placeholder {
					display: block;
					height: 0.5rem;
					margin: 0.2rem 0;
				}
				.d2l-activity-list-item-title-placeholder {
					display: block;
				}
				.d2l-activity-list-item-description-placeholder-container {
					padding: 0.325rem 0;
				}
				.d2l-activity-list-item-description-placeholder {
					display: block;
					height: 0.55rem;
					width: 95%;
				}
				.d2l-activity-list-item-footer-placeholder-container {
					display: flex;
					flex-direction: row;
				}
				.d2l-activity-list-item-footer-placeholder {
					display: block;
					height: 0.5rem;
					margin-bottom: 0.25rem;
					margin-top: 0.7rem;
					margin-right: 0.5rem;
				}
				:host(:dir(rtl)) .d2l-activity-list-item-footer-placeholder {
					margin-right: 0;
					margin-left: 0.5rem;
				}
				.d2l-activity-list-item-header-no-margin {
					margin: 0;
				}
			</style>
			<div class="d2l-activity-list-item-container" style="visibility:hidden;">
				<hr class="d2l-activity-list-item-top-line" />
				<h2 class="d2l-activity-list-item-header-no-margin">
					<a class="d2l-focusable" href$="[[_activityHomepage]]" aria-label$="[[_accessibilityDataToString(_accessibilityData)]]">
						<span class="d2l-activity-list-item-link-text">[[_accessibilityDataToString(_accessibilityData)]]</span>
					</a>
				</h2>
				<div class="d2l-activity-list-item-link-container">
					<div class="d2l-activity-list-item-image">
						<div class="d2l-activity-list-item-pulse-placeholder" hidden$="[[!imagePlaceholder]]"></div>
						<d2l-organization-image
							hidden$="[[imagePlaceholder]]"
							href="[[_organizationUrl]]"
							token="[[token]]"
							type="narrow"
						></d2l-organization-image>
					</div>

					<div class="d2l-activity-list-item-content">
						<div>
							<div hidden$="[[!_textPlaceholder]]">
								<div class="d2l-activity-list-item-pulse-placeholder d2l-activity-list-item-category-placeholder"></div>
							</div>
							<div hidden$="[[_textPlaceholder]]">
								<div class="d2l-activity-list-item-category" hidden$="[[!_category]]">[[_category]]</div>
							</div>
						</div>

						<div aria-hidden="true">
							<div hidden$="[[!_textPlaceholder]]">
								<div class="d2l-activity-list-item-pulse-placeholder d2l-activity-list-item-title-placeholder"></div>
							</div>
							<div hidden$="[[_textPlaceholder]]">
								<h2 class="d2l-activity-list-item-title">
									<d2l-organization-name href="[[_organizationUrl]]" token="[[token]]"></d2l-organization-name>
								</h2>
							</div>
						</div>

						<div id="d2l-activity-list-item-description" hidden$="[[!_showDescription]]">
							<div hidden$="[[!_textPlaceholder]]">
								<template is="dom-repeat" items="[[_descriptionPlaceholderLines]]">
									<div class="d2l-activity-list-item-description-placeholder-container">
										<div class="d2l-activity-list-item-pulse-placeholder d2l-activity-list-item-description-placeholder"></div>
									</div>
								</template>
							</div>
							<div hidden$="[[_textPlaceholder]]">
								<div class="d2l-activity-list-item-description"><p>[[_description]]</p></div>
							</div>
						</div>

						<div>
							<div hidden$="[[!_textPlaceholder]]">
								<div class="d2l-activity-list-item-footer-placeholder-container">
									<template is="dom-repeat" items="[[_footerPlaceholderItems]]">
										<div class="d2l-activity-list-item-pulse-placeholder d2l-activity-list-item-footer-placeholder"></div>
									</template>
								</div>
							</div>
							<div hidden$="[[_textPlaceholder]]">
								<div class="d2l-activity-list-item-footer" hidden$="[[!_tags]]">
									<template is="dom-repeat" items="[[_tags]]">
										<span>
											<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
											[[item]]
										</span>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="d2l-activity-list-item-bottom-line" />
			</div>
			<d2l-activity-list-item-enroll hidden$="[[!actionEnrollShow]]" action-enroll="[[_actionEnroll]]"></d2l-activity-list-item-enroll>
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
				observer: '_onSirenEntityChange'
			},
			sendOnTriggerEvent: {
				type: Boolean,
				value: false
			},
			_title: String,
			_category: {
				type: String,
				value: null
			},
			_description: {
				type: String,
				observer: '_onDescriptionChange'
			},
			_organizationUrl: String,
			_tags: {
				type: String,
				observer: '_onTagsChange'
			},
			_showDescription: Boolean,
			_imageLoading: {
				type: Boolean,
				value: false
			},
			_imageLoadingProgress: {
				type: Boolean,
				value: false
			},
			actionEnroll: {
				type: String,
				value: ''
			},
			actionEnrollShow: {
				type: Boolean,
				value: false
			},
			_activityHomepage: String,
			_accessibilityData: {
				type: Object,
				value: function() { return {}; }
			},
			imagePlaceholder: {
				type: Boolean,
				value: false
			},
			textPlaceholder: {
				type: Boolean,
				value: false,
				observer: '_onTextPlaceholderChange'
			},
			_textPlaceholder: {
				type: Boolean,
				value: false
			},
			_descriptionPlaceholderLines: {
				type: Array,
				value: [{}, {}]
			},
			_footerPlaceholderItems: {
				type: Array,
				value: [{}, {}]
			}
		};
	}

	constructor() {
		super();
		this._currentResponsiveConfig = undefined;
		this._isRTL = document.dir === 'rtl';
	}

	ready() {
		super.ready();
		this._onLinkBlur = this._onLinkBlur.bind(this);
		this._onLinkFocus = this._onLinkFocus.bind(this);
		this._onIronSize = () => this._setResponsiveSizes(this.offsetWidth);
		this.addEventListener('d2l-organization-accessible', this._onD2lOrganizationAccessible);
	}
	attached() {
		super.attached();
		afterNextRender(this, () => {
			const link = this.shadowRoot.querySelector('a');
			link.addEventListener('blur', this._onLinkBlur.bind(this));
			link.addEventListener('focus', this._onLinkFocus.bind(this));
			link.addEventListener('click', this._onLinkTrigger.bind(this));
			link.addEventListener('keydown', this._onLinkTrigger.bind(this));
			this.addEventListener('iron-resize', this._onIronSize.bind(this));
			this._setResponsiveSizes(this.offsetWidth);

			const image = this.shadowRoot.querySelector('d2l-organization-image');
			image.addEventListener('d2l-organization-image-loaded', this._activityImageLoaded.bind(this));
		});
	}
	_onD2lOrganizationAccessible(e) {
		this._accessibilityData.organizationName = e.detail.organization && e.detail.organization.name;
		this._accessibilityData.semesterName = e.detail.semesterName && e.detail.semesterName;
		this._accessibilityData.ariaContext = this.localize('clickToViewActivity');

		this.notifyPath('_accessibilityData');

		afterNextRender(this, () => {
			this.dispatchEvent(new CustomEvent('d2l-activity-text-loaded', {
				bubbles: true,
				composed: true
			}));
		});
	}

	_accessibilityDataToString(accessibility) {
		if (!accessibility) {
			return;
		}

		const textData = [
			accessibility.ariaContext,
			accessibility.organizationName
		];
		return textData.filter(function(text) {
			return text && typeof text === 'string';
		}).join(', ');
	}
	detached() {
		const link = this.shadowRoot.querySelector('a');
		link.removeEventListener('blur', this._onLinkBlur);
		link.removeEventListener('focus', this._onLinkFocus);
		this.removeEventListener('iron-resize', this._onIronSize);

		const image = this.shadowRoot.querySelector('d2l-organization-image');
		image.removeEventListener('d2l-organization-image-loaded', this._activityImageLoaded);
	}

	_reset() {
		Object.keys(D2lActivityListItem.properties).forEach((key) => {
			this.set(key, D2lActivityListItem.properties[key].default);
		});
	}

	_onLinkBlur() {
		window.fastdom.mutate(function() {
			this.removeAttribute('active', 'active');
		}.bind(this));
	}

	_onLinkFocus() {
		window.fastdom.mutate(function() {
			this.setAttribute('active', 'active');
		}.bind(this));
	}

	_setResponsiveSizes(currentWidth) {
		const currentConfig = this._getResponsiveConfig(currentWidth);
		this._showDescription = currentConfig.showDescription;
		this._clampDescription(this._description);

		if (this._currentResponsiveConfig && this._currentResponsiveConfig.minWidth === currentConfig.minWidth) {
			return;
		}

		this._currentResponsiveConfig = currentConfig;
		window.fastdom.mutate(() => {
			const container = this.shadowRoot.querySelector('.d2l-activity-list-item-link-container');
			container.style.margin = currentConfig.padding;

			const image = this.shadowRoot.querySelector('.d2l-activity-list-item-image');
			image.style.width = currentConfig.image.width + 'px';
			image.style.height = currentConfig.image.height + 'px';
			image.style[this._isRTL ? 'margin-left' : 'margin-right'] = currentConfig.image.marginRight;

			const title = this.shadowRoot.querySelector('.d2l-activity-list-item-title');
			title.style.fontSize = currentConfig.title.fontSize + 'rem';
			title.style.fontWeight = currentConfig.title.fontWeight;
			title.style.lineHeight = currentConfig.title.lineHeight + 'rem';
			title.style.maxHeight = 2 * currentConfig.title.lineHeight + 'rem';
			title.style.margin = currentConfig.title.margin;
			title.style.marginTop = currentConfig.title.marginTop + 'rem';
			title.style[this._isRTL ? 'margin-left' : 'margin-right'] = currentConfig.title.marginRight + 'rem';
			title.style.marginBottom = currentConfig.title.marginBottom + 'rem';
			title.style[this._isRTL ? 'margin-right' : 'margin-left'] = currentConfig.title.marginLeft + 'rem';

			if (this.textPlaceholder) {
				this._setTextPlaceholderStyles(currentConfig);
			}
			const listItemContainer = this.shadowRoot.querySelector('.d2l-activity-list-item-container');
			if (listItemContainer.style.visibility === 'hidden') {
				afterNextRender(this, () => {
					listItemContainer.style.visibility = 'visible';
				});
			}
		});
	}
	_onDescriptionChange(description) {
		this._clampDescription(description);
	}

	_onLinkTrigger(event) {
		if (!this.sendOnTriggerEvent ||
			!this._activityHomepage ||
			event.ctrlKey ||
			event.metaKey ||
			(event.type === 'keydown' && event.keyCode !== 13 && event.keyCode !== 32)) {
			return;
		}
		this.dispatchEvent(new CustomEvent('d2l-activity-trigger', {
			detail: {
				path: this._activityHomepage,
				orgUnitId: this._getOrgUnitId()
			},
			bubbles: true,
			composed: true
		}));
		event.preventDefault();
	}
	_clampDescription(description) {
		if (!description) return;
		const p = this.shadowRoot.querySelector('.d2l-activity-list-item-description p');
		if (!this._showDescription) {
			p.textContent = '';
			return;
		}
		let height = 0;
		window.fastdom.measure(() => {
			height = window.getComputedStyle(p).getPropertyValue('line-height').match(/\d+/);
		});
		beforeNextRender(this, () => {
			window.fastdom.mutate(() => {
				const lineHeight = height && height[0];
				p.textContent = description;
				const currentLineNumber = p.offsetHeight / lineHeight;
				if (currentLineNumber <= this._descriptionLineCount) {
					return;
				}
				// The idea is to mathematically find the most probable point to clamp.
				// Take the average per line while distrbuting the characters from the last line between all the lines.
				// So the average line length is between 1 to (1 + 1/(this._descriptionLineCount+1)) the actual average.
				// The `+1` in the previous line is because the description has to be more than the this._descriptionLineCount
				// For example if the description max number of lines is 2 then the average count would be between 1 to 1.33 times the actual average.
				const avgCharPerLine = description.length / ((currentLineNumber - 1));

				// This is where we clamp using the ~average length of a line. We want the clamp to not be exactly at the edge
				// so clamp 75% of the last line. Since the average line could be larger we need to make sure that this cut
				// is still lower then the average line.
				// So we need to prove 1 <= 3/4*(1 + 1/(this._descriptionLineCount+1))
				// The above line simplifies to this._descriptionLineCount >= 2
				// So as long as we clamp down to two lines this will work.
				p.textContent = description.substring(0, avgCharPerLine * (this._descriptionLineCount - 0.75));

				// Okay what about when this._descriptionLineCount = 1? We will do a loop through this step to solve that case.
				// This loop will make sure the clamping is done on words and will make sure that if our quick cut above
				// wasn't enough to fix that too.
				do {
					p.textContent = p.textContent.replace(/\W*\s(\S)*$/, '');
				} while (p.offsetHeight > this._descriptionLineCount * lineHeight && p.textContent);
				p.textContent += '...';
			});
		});
	}
	_onHrefChange(href) {
		if (!href || (this.entity.hasLinkByRel && this.entity.hasLinkByRel('self') && this.entity.getLinkByRel('self').href === href)) {
			return;
		}

		this._fetchEntity(href)
			.then((sirenEntity) => this.entity = sirenEntity);
	}
	_onSirenEntityChange(sirenEntity) {
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

		if (this._organizationUrl) {
			this._fetchEntity(this._organizationUrl)
				.then(this._handleOrganizationResponse.bind(this))
				.then(() => {
					afterNextRender(this, () => {
						this.dispatchEvent(new CustomEvent('d2l-activity-text-loaded', {
							bubbles: true,
							composed: true
						}));
					});
				});
		}

		this.href = sirenEntity.hasLink('self') && sirenEntity.getLinkByRel('self').href;
	}

	_handleOrganizationResponse(organization) {
		let description = organization.properties && organization.properties.description;

		//Use a temporary div to strip html out of the content and display html entities.
		if (description) {
			description = description.replace(/<[^>]*>/g, '');
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = description;
			description = tempDiv.textContent || tempDiv.innerText;
		}
		this._description = description;

		return Promise.resolve();
	}

	_activityImageLoaded() {
		this.dispatchEvent(new CustomEvent('d2l-activity-image-loaded', {
			bubbles: true,
			composed: true
		}));
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
				.then(function(json) {
					return SirenParse(json);
				});
		}
		return Promise.reject(response.status + ' ' + response.statusText);
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
	_onTextPlaceholderChange(textPlaceholder) {
		// If placeholders were disabled, we want everything resized before showing it to avoid flickering
		if (!textPlaceholder) {
			beforeNextRender(this, () => {
				this._textPlaceholder = false;
			});
			this._setResponsiveSizes(this.offsetWidth);
		} else {
			// If the placeholders were enabled, we want them to get styled
			const currentConfig = this._getResponsiveConfig(this.offsetWidth);
			window.fastdom.mutate(() => {
				this._setTextPlaceholderStyles(currentConfig);
				this._textPlaceholder = true;
			});
		}
	}
	_setTextPlaceholderStyles(currentConfig) {
		const remInPixelConstant = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const categoryPlaceholder = this.shadowRoot.querySelector('.d2l-activity-list-item-category-placeholder');
		const titlePlaceholder = this.shadowRoot.querySelector('.d2l-activity-list-item-title-placeholder');
		const newFooterCount = currentConfig.placeholder.footer.count;

		if (categoryPlaceholder) {
			categoryPlaceholder.style.width = currentConfig.placeholder.category.width;
		}

		if (titlePlaceholder && remInPixelConstant) {
			titlePlaceholder.style.width =  currentConfig.placeholder.title.width;
			// Get the fontSize and convert into pixels
			// Multiply by 0.7 and round to get cap size
			const titleCapSize = Math.round((currentConfig.title.fontSize * remInPixelConstant) * 0.7);
			titlePlaceholder.style.height = titleCapSize + 'px';
			const titleCapSizeInRem = titleCapSize / remInPixelConstant;

			// Split the difference between line height and cap size between the two vertical margins:
			const verticalMargin =  (currentConfig.title.lineHeight - titleCapSizeInRem) / 2;
			titlePlaceholder.style['margin-top'] = +currentConfig.title.marginTop + +verticalMargin + 'rem';
			titlePlaceholder.style['margin-bottom'] = +currentConfig.title.marginBottom + +verticalMargin + 'rem';
		}

		if (this._footerPlaceholderItems.length !== newFooterCount) {
			this._footerPlaceholderItems = Array(currentConfig.placeholder.footer.count);
			beforeNextRender(this, () => {
				const footerPlaceholders = this.shadowRoot.querySelectorAll('.d2l-activity-list-item-footer-placeholder');
				if (footerPlaceholders && footerPlaceholders.length) {
					footerPlaceholders.forEach((footer) => {
						footer.style.width = currentConfig.placeholder.footer.width;
					});
				}
			});
		} else {
			const footerPlaceholders = this.shadowRoot.querySelectorAll('.d2l-activity-list-item-footer-placeholder');
			if (footerPlaceholders && footerPlaceholders.length) {
				footerPlaceholders.forEach((footer) => {
					footer.style.width = currentConfig.placeholder.footer.width;
				});
			}
		}
	}
	_onTagsChange() {
		if (this._isRTL) {
			this._tags.reverse();
		}
	}
}

window.customElements.define('d2l-activity-list-item', D2lActivityListItem);
