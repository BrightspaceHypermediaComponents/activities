import { Rels, Classes } from 'd2l-hypermedia-constants';
import './d2l-siren-helper-behavior.js';
import { DISMISS_TYPES } from '../dismiss/dismiss-types.js';

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

	getEvaluationStatusHref: function(entity) {
		return entity.getLinkByRel(Rels.Activities.evaluationStatus).href;
	},

	getDismissHref: function(entity) {
		//TODO: change once it's in its final form in HM constants.
		const link = entity.getLinkByRel('https://api.brightspace.com/rels/dismiss');
		if (link) {
			return link.href;
		}
	},

	_getEvaluationStatusPromise: async function(entity, extraParams) {
		return this._followLink(entity, Rels.Activities.evaluationStatus)
			.then(function(e) {
				if (!e || !e.entity || !e.entity.properties) {
					return;
				}

				const p = e.entity.properties;
				const publishAll = this._getAction(e.entity, 'publish-all-feedback');

				const submissionListSubEntity = e.entity.getSubEntityByRel(Rels.Assessments.submissionApplication);
				let submissionListHref = '';
				if (submissionListSubEntity && submissionListSubEntity.properties.path) {
					submissionListHref = submissionListSubEntity.properties.path;
				}

				const evaluateAllSubEntity = e.entity.getSubEntityByRel(Rels.Assessments.assessAllApplication);
				let evaluateAllHref = '';

				if (evaluateAllSubEntity && evaluateAllSubEntity.properties.path) {
					evaluateAllHref = evaluateAllSubEntity.properties.path;
					if (extraParams.length) {
						evaluateAllHref = this._buildRelativeUri(evaluateAllHref, extraParams);
					}
				}
				const evaluateNewSubEntity = e.entity.getSubEntityByRel(Rels.Assessments.assessNewApplication);

				let evaluateNewHref = '';
				if (evaluateNewSubEntity && evaluateNewSubEntity.properties.path) {
					evaluateNewHref = evaluateNewSubEntity.properties.path;
					if (extraParams.length) {
						evaluateNewHref = this._buildRelativeUri(evaluateNewHref, extraParams);
					}
				}
				return {
					assigned: p.assigned || 0,
					completed: p.completed || 0,
					published: p.published || 0,
					evaluated: p.evaluated || 0,
					publishAll: publishAll,
					submissionListHref: submissionListHref,
					evaluateAllHref: this._formBackToQuickEvalLink(evaluateAllHref),
					evaluateNewHref: this._formBackToQuickEvalLink(evaluateNewHref),
					newSubmissions: p.newsubmissions || 0,
					resubmitted: p.resubmissions || 0
				};
			}.bind(this));
	},

	_getDismissPromise: function(entity) {
		return this._followLink(entity, 'https://api.brightspace.com/rels/dismiss')
			.then(function(d) {
				return {
					dismissed: d.entity.properties.isDismissed,
					dismissedOn: d.entity.properties.dismissedOn,
					unDismissAction: this._getAction(d.entity, DISMISS_TYPES.unDismiss),
					dismissForeverAction: this._getAction(d.entity, DISMISS_TYPES.forever),
					dismissUntilAction: this._getAction(d.entity, DISMISS_TYPES.date)
				};
			}.bind(this));
	},

	_getUserPromise: function(entity, item) {
		return this._followLink(entity, Rels.user)
			.then(function(u) {
				if (!u || !u.entity) {
					return;
				}
				const firstName = this._tryGetName(u.entity, Rels.firstName, null);
				const lastName = this._tryGetName(u.entity, Rels.lastName, null);
				const defaultDisplayName = this._tryGetName(u.entity, Rels.displayName, '');

				const displayName = {
					'firstName': firstName,
					'lastName': lastName,
					'defaultDisplayName': defaultDisplayName
				};

				item.displayName = displayName;
			}.bind(this));
	},

	_formBackToQuickEvalLink(url) {
		if (!url) {
			return url;
		}
		const placeHolderHost = 'http://fake.commm';
		const newUrl = new URL(url, placeHolderHost);
		const searchParams = newUrl.searchParams;
		searchParams.append('cft', 'qe');

		return newUrl.pathname + newUrl.search;
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
			return entity.getSubEntityByClass('due-date').properties.localizedDate;
		}
		return '';
	},

	_getActivityName: function(entity) {
		const activityNameHref = this._getActivityNameHref(entity);
		if (!activityNameHref) {
			return Promise.reject(`Activity name href was empty. Content was "${JSON.stringify(entity ? entity.getLinkByRel('self') : entity)}"`);
		}
		return this._followHref(activityNameHref)
			.then(function(a) {
				let rel;
				if (a.entity.hasClass(Classes.activities.userQuizAttemptActivity) || a.entity.hasClass(Classes.activities.userQuizActivity)) {
					rel = Rels.quiz;
				} else if (a.entity.hasClass(Classes.activities.userAssignmentActivity)) {
					rel = Rels.assignment;
				} else if (a.entity.hasClass(Classes.activities.userDiscussionActivity)) {
					rel = Rels.Discussions.topic;
				} else {
					return Promise.resolve();
				}
				return this._followLink(a.entity, rel);
			}.bind(this))
			.then(function(n) {
				if (n && n.entity && n.entity.properties) {
					return n.entity.properties.name;
				}
			});
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
	},

	_dismissActivity: function(dismissHref, actionName, dismissUntil) {
		return this._followHref(dismissHref).then(dismissEntity => {
			const action = this._getAction(dismissEntity.entity, actionName);
			if (dismissUntil) {
				const field = action.getField('dismissUntil');
				field.value = dismissUntil;
			}
			return this.performSirenAction(action);
		});
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehaviorImpl
];
