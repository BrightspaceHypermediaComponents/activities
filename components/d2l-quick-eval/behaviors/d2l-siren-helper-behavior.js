import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import {
	DictToQueryString,
	GetQueryStringParams,
	GetQueryStringParam
} from '../compatability/ie11shims.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Siren = window.D2L.PolymerBehaviors.Siren || {};

/*
* Behavior for helping process siren actions
* @polymerBehavior
*/
D2L.PolymerBehaviors.Siren.D2LSirenHelperBehaviorImpl = {

	_myEntityStoreFetch : function(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	},

	_followLink: function(entity, rel) {
		const href = this._getHref(entity, rel);
		return this._followHref(href);
	},

	_getHref: function(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			return entity.getLinkByRel(rel).href;
		}
		return '';
	},

	_followHref: function(href) {
		if (href) {
			return this._myEntityStoreFetch(href);
		}
		return Promise.resolve();
	},

	_performSirenActionWithQueryParams: function(action, customParams) {
		const url = new URL(action.href, window.location.origin);
		const searchParams = GetQueryStringParams(url.search);
		if (!action.fields) {
			action.fields = [];
		}

		Object.keys(searchParams).forEach(function(key) {
			if (!action.fields.filter(x => x.name === key)[0]) {
				action.fields.push({ name: key, value: searchParams[key], type: 'hidden' });
			}
		});

		if (customParams) {
			Object.keys(customParams).forEach(function(paramName) {
				action.fields.push({ name: paramName, value: customParams[paramName], type: 'hidden' });
			});
		}

		return this.performSirenAction(action);
	},

	_getExtraParams: function(url) {
		if (!url || url === '') return [];

		const extraParams = [];
		const parsedUrl = new URL(url);

		const filterVal = GetQueryStringParam('filter', parsedUrl);
		if (filterVal) {
			extraParams.push(
				{
					name: 'filter',
					value: filterVal
				}
			);
		}
		const sortVal = GetQueryStringParam('sort', parsedUrl);
		if (sortVal) {
			extraParams.push(
				{
					name: 'sort',
					value: sortVal
				}
			);
		}
		const searchVal = GetQueryStringParam('collectionSearch', parsedUrl);
		if (searchVal) {
			extraParams.push(
				{
					name: 'collectionSearch',
					value: window.btoa(searchVal)	// base64 encoding of the search text
				}
			);
		}

		return extraParams;
	},

	_buildRelativeUri: function(url, extraParams) {
		if (extraParams.length === 0) {
			return url;
		}

		const parsedUrl = new window.URL(url, 'https://notused.com');
		const searchParams = GetQueryStringParams(parsedUrl.search);

		let extraInfo = '';
		extraParams.forEach(param => {
			extraInfo += '|' + param.name + '~' + param.value;
		});

		searchParams['cfi'] = extraInfo.substring(1);

		return parsedUrl.pathname + DictToQueryString(searchParams);
	},

	_getAction: function(entity, name) {
		if (entity && entity.hasActionByName && entity.hasActionByName(name)) {
			return entity.getActionByName(name);
		}
		return null;
	},

	_hasNonEmptyQueryParam: function(url, queryParam) {
		const parsed = new URL(url, 'https://ThisExistsToAvoidAnException.com');

		if (!parsed.searchParams.has(queryParam)) {
			return false;
		}

		return parsed.searchParams.get(queryParam) !== '';
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior = [
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Siren.SirenActionBehavior,
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehaviorImpl
];
