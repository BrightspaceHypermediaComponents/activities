import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels} from 'd2l-hypermedia-constants';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import './d2l-evaluation-hub-activities-list.js';

/**
 * @customElement
 * @polymer
 */
class D2LEvaluationHub extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
				.d2l-evaluation-hub-top-bar {
					padding: 0.5rem 2rem 1rem 2rem;
					text-align: right;
				}
			</style>
			<div class="d2l-evaluation-hub-top-bar">
				<d2l-hm-filter href="[[_filterHref]]" token="[[token]]" category-whitelist="[[_filterClasses]]"></d2l-hm-filter>
			</div>
			<d2l-evaluation-hub-activities-list href="[[href]]" token="[[token]]" master-teacher="[[masterTeacher]]"></d2l-evaluation-hub-activities-list>
		`;
	}

	static get properties() {
		return {
			masterTeacher: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_filterHref: {
				type: String,
				computed: '_getFilterHref(entity)'
			},
			_filterClasses: {
				type: Array,
				computed: '_getFilterClasses(masterTeacher)'
			},
		};
	}

	static get is() { return 'd2l-evaluation-hub'; }

	attached()  {
		this.addEventListener('d2l-hm-filter-filters-updated', this._filterChanged);
		this.addEventListener('d2l-evaluation-hub-activities-list-sort-updated', this._sortChanged);
	}

	detached() {
		this.removeEventListener('d2l-hm-filter-filters-updated', this._filterChanged);
		this.removeEventListener('d2l-evaluation-hub-activities-list-sort-updated', this._sortChanged);
	}

	_getFilterHref(entity) {
		return this._getHref(entity, Rels.filters);
	}

	_getHref(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			return entity.getLinkByRel(rel).href;
		}
		return '';
	}

	_getFilterClasses(masterTeacher) {
		let filters = [ 'activity-name', 'enrollments', 'completion-date' ];
		if (masterTeacher) {
			filters = filters.concat('primary-facilitator');
		}
		return filters;
	}

	_filterChanged(e) {
		const list = this.shadowRoot.querySelector('d2l-evaluation-hub-activities-list');
		list.entity = e.detail.filteredActivities;
		this.entity = e.detail.filteredActivities;
	}

	_sortChanged(e) {
		this.entity = e.detail.sortedActivities;
	}

}

window.customElements.define('d2l-evaluation-hub', D2LEvaluationHub);
