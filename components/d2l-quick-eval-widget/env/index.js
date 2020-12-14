import { Classes, Rels } from 'siren-sdk/src/hypermedia-constants';

export const QuickEvalActivityAllowList = {
	userAssignmentActivity: {
		class: Classes.activities.assignmentActivity,
		icon: 'tier2:assignments',
		rel: Rels.assignment,
		type: 'Assignment'
	},
	userDiscussionActivity: {
		class: Classes.activities.discussionActivity,
		icon: 'tier2:discussions',
		rel: Rels.Discussions.topic,
		type: 'Discussion'
	},
	userQuizActivity: {
		class: Classes.activities.quizActivity,
		icon: 'tier2:quizzing',
		rel: Rels.quiz,
		type: 'Quiz'
	}
};
