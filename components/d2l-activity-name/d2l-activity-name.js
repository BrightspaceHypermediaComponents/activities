import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';

/**
 * @customElement
 * @polymer
 */

class D2LActivityName extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		const activityNameTemplate = html`
			<style>
				:host {
					display: block;
				}
				.d2l-activity-name-icon {
					display: inline-block;
					padding-right: 0.6rem;
					vertical-align: middle;
				}
				:host(:dir(rtl)) .d2l-activity-name-icon {
					padding-right: 0;
					padding-left: 0.6rem;
				}
				.d2l-activity-name-text {
					display: inline;
					vertical-align: bottom;
				}
				.d2l-activity-name-text-and-icon {
					max-width: 24rem;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			</style>
			<div class="d2l-activity-name-text-and-icon">
				<d2l-icon class="d2l-activity-name-icon" icon="[[_activityIcon]]"></d2l-icon>
				<div title="[[_activityName]]" class="d2l-activity-name-text">[[_activityName]]</div>
			</div>
		`;
		activityNameTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return activityNameTemplate;
	}
	static get is() { return 'd2l-activity-name'; }
	static get properties() {
		return {
			_activityName: {
				type: String,
				value: ''
			},
			_activityIcon: {
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

	_activityNameFetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		try {
			await this._getActivityPromise(entity);
		} catch (e) {
			// Unable to load activities from entity.
		}
	}

	_followLink(entity, rel) {
		let href;
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			href = entity.getLinkByRel(rel).href;
		} else {
			href = '';
		}

		if (href) {
			return this._activityNameFetch(href);
		}
		return Promise.resolve();
	}

	async _getActivityPromise(activityEntity) {
		let rel;
		let activityIcon;
		if (activityEntity.hasClass(Classes.activities.userQuizAttemptActivity) || activityEntity.hasClass(Classes.activities.userQuizActivity)) {
			rel = Rels.quiz;
			activityIcon = 'd2l-tier1:quizzing';
		} else if (activityEntity.hasClass(Classes.activities.userAssignmentActivity)) {
			rel = Rels.assignment;
			activityIcon = 'd2l-tier1:assignments';
		} else if (activityEntity.hasClass(Classes.activities.userDiscussionActivity)) {
			rel = Rels.Discussions.topic;
			activityIcon = 'd2l-tier1:discussions';
		} else {
			return Promise.resolve();
		}
		return this._followLink(activityEntity, rel)
			.then(function(a) {
				if (a && a.entity && a.entity.properties) {
					this._activityName = a.entity.properties.name;
					this._activityIcon = activityIcon;
				}
			}.bind(this));
	}
}

window.customElements.define(D2LActivityName.is, D2LActivityName);
