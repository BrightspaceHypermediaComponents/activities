import {Rels, Classes} from 'd2l-hypermedia-constants';
import './d2l-siren-helper-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/*
* Behavior for helping process siren actions
* @polymerBehavior
*/
D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehaviorImpl = {

	_getMasterTeacherPromise: function(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(org) {
				if (org && org.entity) {
					return this._followLink(org.entity, 'https://enrollments.api.brightspace.com/rels/primary-facilitators');
				}
			}.bind(this))
			.then(function(enrollment) {
				if (enrollment && enrollment.entity && enrollment.entity.hasSubEntityByRel(Rels.userEnrollment)) {
					const userEnrollment = enrollment.entity.getSubEntityByRel(Rels.userEnrollment);
					if (userEnrollment.href) {
						return this._followHref(userEnrollment.href);
					}
				}
			}.bind(this))
			.then(function(userEnrollment) {
				if (userEnrollment && userEnrollment.entity) {
					return this._followLink(userEnrollment.entity, Rels.user);
				}
			}.bind(this))
			.then(function(user) {
				if (user && user.entity && user.entity.hasSubEntityByRel(Rels.displayName)) {
					item.masterTeacher = user.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			}.bind(this));
	},

	_getOrgHref: function(entity) {
		return this._getHref(entity, Rels.organization);
	},

	_getCourseNamePromise: async function(entity) {
		return this._followLink(entity, Rels.organization)
			.then(function(o) {
				if (o && o.entity && o.entity.properties) {
					return o.entity.properties.name;
				}
			});
	},

	_getCoursePromise: function(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(o) {
				if (o && o.entity && o.entity.properties) {
					item.courseName = o.entity.properties.name;
				}
			});
	},

	_tryGetName: function(
		entity,
		rel,
		defaultValue
	) {
		if (!entity || !entity.hasSubEntityByRel(rel)) {
			return defaultValue;
		}

		const subEntity =  entity.getSubEntityByRel(rel);
		if (!subEntity || !subEntity.properties || subEntity.hasClass('default-name')) {
			return defaultValue;
		}

		return subEntity.properties.name;
	},

	_getEvaluationStatusPromise: async function(entity) {
		return this._followLink(entity, Rels.Activities.evaluationStatus)
			.then(function(e) {
				if (e && e.entity && e.entity.properties) {
					const p = e.entity.properties;
					const empty = [];
					const publishAll = this._getAction(e.entity, 'publish-all-feedback');
					const submissionListHref = this._getRelativeUriProperty(e.entity, empty);

					return {
						assigned: p.assigned || 0,
						completed: p.completed || 0,
						published: p.published || 0,
						evaluated: p.evaluated || 0,
						publishAll: publishAll,
						submissionListHref: submissionListHref,
						unread: p.newsubmissions || 0,
						resubmitted: p.resubmissions || 0
					};
				}
			}.bind(this));
	},

	_getUserPromise: function(entity, item) {
		return this._followLink(entity, Rels.user)
			.then(function(u) {
				if (u && u.entity) {
					const firstName = this._tryGetName(u.entity, Rels.firstName, null);
					const lastName = this._tryGetName(u.entity, Rels.lastName, null);
					const defaultDisplayName = this._tryGetName(u.entity, Rels.displayName, '');

					const displayName = {
						'firstName': firstName,
						'lastName': lastName,
						'defaultDisplayName': defaultDisplayName
					};

					item.displayName = displayName;
				}
			}.bind(this));
	},

	_getUserHref: function(entity) {
		if (entity.hasLinkByRel(Rels.user)) {
			const link = entity.getLinkByRel(Rels.user);
			return link.href;
		}
		return '';
	},

	_getFilterHref: function(entity) {
		return this._getHref(entity, Rels.filters);
	},

	_getPageNextHref: function(entity) {
		return this._getHref(entity, 'next');
	},

	_getActivityNameHref: function(entity) {
		if (entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			const link = entity.getLinkByRel(Rels.Activities.userActivityUsage);
			return link.href;
		}
		return '';
	},

	_getActivityType: function(entity) {
		if (entity) {
			if (entity.hasClass(Classes.activities.quizActivity)) {
				return 'quiz';
			} else if (entity.hasClass(Classes.activities.assignmentActivity)) {
				return 'assignment';
			} else if (entity.hasClass(Classes.activities.discussionActivity)) {
				return 'discussion';
			}
		}
	},

	_getActivityDueDate: function(entity) {
		if (entity && entity.hasSubEntityByClass('due-date')) {
			return entity.getSubEntityByClass('due-date').properties.date;
		}
		return '';
	},

	_getSubmissionDate: function(entity) {
		if (entity.hasSubEntityByClass('localized-formatted-date')) {
			const i = entity.getSubEntityByClass('localized-formatted-date');
			return i.properties.localizedDate;
		}
		return '';
	},

	_getEvaluation: function(entity) {
		if (entity.hasSubEntityByRel(Rels.evaluation)) {
			return entity.getSubEntityByRel(Rels.evaluation);
		}
	},

	_getRelativeUriProperty: function(entity, extraParams) {
		if (entity.hasSubEntityByClass(Classes.relativeUri)) {
			const i = entity.getSubEntityByClass(Classes.relativeUri);
			return this._buildRelativeUri(i.properties.path, extraParams);
		}
		return '';
	},

	_determineIfActivityIsDraft: function(activity) {
		const evaluation = this._getEvaluation(activity);
		if (evaluation && evaluation.properties && evaluation.properties.state === 'Draft') {
			return true;
		}

		return false;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehaviorImpl
];
