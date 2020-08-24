import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { ActivityListItemLocalize } from './ActivityListItemLocalize.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-button/d2l-button.js';
import SirenParse from 'siren-parser';
import 'd2l-fetch/d2l-fetch.js';

/**
 * @customElement
 * @polymer
 */
class D2lActivityListItemEnroll extends ActivityListItemLocalize(PolymerElement) {
	static get template() {
		return html`
			<style include="d2l-typography">
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
			</style>
			<d2l-button id="d2l-activity-list-item-enroll" primary$=[[_hasActionBoolean(actionEnroll)]] disabled$=[[!_hasActionBoolean(actionEnroll)]]>
				[[localize('enroll')]]
			</d2l-button>
		`;
	}

	static get properties() {
		return {
			actionEnroll: {
				type: String,
				value: '',
				observer: '_onActionEnrollChange'
			}
		};
	}

	ready() {
		super.ready();
		this._onEnrollKeyPress = this._enroll.bind(this);
		this._onEnrollMouseUp = this._enroll.bind(this);
	}

	detached() {
		this._removeEnrollAction();
	}
	_hasActionBoolean(actionEnroll) {
		return !!actionEnroll;
	}
	_enroll() {
		if (this.actionEnroll) {
			this._fetchEntity(this.actionEnroll.href, this.actionEnroll.method)
				.then(() => {
					this.actionEnroll = '';
				});
		}
	}
	_onActionEnrollChange(actionEnroll) {
		if (!actionEnroll) {
			this._removeEnrollAction();
		}

		this._addEnrollAction();
	}
	_addEnrollAction() {
		const enrollButton = this.shadowRoot.querySelector('d2l-button');
		if (enrollButton) {
			enrollButton.addEventListener('keypress', this._onEnrollKeyPress);
			enrollButton.addEventListener('mouseup', this._onEnrollKeyPress);
		}
	}

	_removeEnrollAction() {
		const enrollButton = this.shadowRoot.querySelector('d2l-button');
		if (enrollButton) {
			enrollButton.removeEventListener('keypress', this._onEnrollKeyPress);
			enrollButton.removeEventListener('mouseup', this._onEnrollMouseUp);
		}
	}

	_fetchEntity(url, method) {
		if (!url) {
			return;
		}
		method = method || 'GET';
		return window.d2lfetch
			.fetch(new Request(url, {
				method: method,
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
}

window.customElements.define('d2l-activity-list-item-enroll', D2lActivityListItemEnroll);
