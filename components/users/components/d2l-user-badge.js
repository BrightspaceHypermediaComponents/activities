import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-link/d2l-link.js';
import './d2l-profile-image.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels} from 'd2l-hypermedia-constants';

/**
 * @customElement
 * @polymer
 */

class D2LUserBadge extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		const userBadgeTemplate = html`
			<style>
				:host {
					display: block;
				}
				.d2l-user-badge-image {
					display: inline-block;
					padding-right: 0.6rem;
					vertical-align: middle;
				}
				:host(:dir(rtl)) .d2l-user-badge-image {
					padding-right: 0;
					padding-left: 0.6rem;
				}
				.d2l-user-badge-link {
					display: inline-block;
					vertical-align: middle;
				}
			</style>
			<d2l-profile-image class="d2l-user-badge-image" href="[[_userHref]]" token="[[token]]" large=""></d2l-profile-image>
			<d2l-link class="d2l-user-badge-link" href="[[_linkHref]]">[[_displayName]]</d2l-link>
		`;
		userBadgeTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return userBadgeTemplate;
	}
	static get is() { return 'd2l-user-badge'; }
	static get properties() {
		return {
			'displayNameHref': {
				type: String,
				value: '',
				reflectToAttribute: true
			},
			_userHref: {
				type: String,
				value: ''
			},
			_displayName: {
				type: String,
				value: ''
			},
			_linkHref: {
				type: String,
				value: ''
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)'
		];
	}

	_userFetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		try {
			if (this.href) {
				this._userHref = this.href;
			}
			if (this.displayNameHref) {
				this._linkHref = this.displayNameHref;
			}
			if (entity.hasSubEntityByRel(Rels.displayName)) {
				this._displayName = entity.getSubEntityByRel(Rels.displayName).properties.name;
			}
		} catch (e) {
			// Unable to load user from entity
		}
	}

	_followLink(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			const href = entity.getLinkByRel(rel).href;
			return this._userFetch(href);
		}
		return Promise.resolve();
	}
}

window.customElements.define(D2LUserBadge.is, D2LUserBadge);
