// TODO Integrate JOI/Validation of configurable options
import { Classes, Rels } from 'siren-sdk/src/hypermedia-constants';

export const Config = {
	OverdueWeekLimit: 6,
	UpcomingWeekLimit: 2,
};

export const Constants = {
	APINamespace: 'api.dev.brightspace.com',
	DaysPerWeek: 7,
	MaxDays: 365,
	MaxActivityCount: 99,
	MaxWidgetDisplay: 6,
};

export const ActivityAllowList = {
	userAssignmentActivity: {
		class: Classes.activities.userAssignmentActivity,
		icon: 'tier2:assignments',
		rel: Rels.assignment,
		type: 'Assignment'
	},
	userChecklistActivity: {
		class: Classes.activities.userChecklistActivity,
		icon: 'tier2:checklist',
		rel: Rels.Checklists.checklist,
		type: 'Checklist'
	},
	userContentActivity: {
		class: Classes.activities.userContentActivity,
		icon: 'tier2:content',
		rel: Rels.content,
		type: 'Content'
	},
	userCourseOfferingActivity: {
		class: Classes.activities.userCourseOfferingActivity,
		icon: 'tier2:syllabus',
		rel: Rels.courseOfferingInfoPage,
		type: 'Course'
	},
	userDiscussionActivity: {
		class: Classes.activities.userDiscussionActivity,
		icon: 'tier2:discussions',
		rel: Rels.Discussions.topic,
		type: 'Discussion'
	},
	userQuizActivity: {
		class: Classes.activities.userQuizActivity,
		icon: 'tier2:quizzing',
		rel: Rels.quiz,
		type: 'Quiz'
	},
	userQuizAttemptActivity: {
		class: Classes.activities.userQuizAttemptActivity,
		icon: 'tier2:quizzing',
		rel: Rels.quiz,
		type: 'Quiz'
	},
	userSurveyActivity: {
		class: Classes.activities.userSurveyActivity,
		icon: 'tier2:surveys',
		rel: Rels.Surveys.survey,
		type: 'Survey'
	}
};

export function getUpcomingWeekLimit() {
	if (window.D2L && window.D2L.workToDoOptions && window.D2L.workToDoOptions.upcomingWeekLimit) {
		return window.D2L.workToDoOptions.upcomingWeekLimit;
	} else {
		return Config.UpcomingWeekLimit;
	}
}

export function getOverdueWeekLimit() {
	if (window.D2L && window.D2L.workToDoOptions && window.D2L.workToDoOptions.overdueWeekLimit) {
		return window.D2L.workToDoOptions.overdueWeekLimit;
	} else {
		return Config.OverdueWeekLimit;
	}
}
