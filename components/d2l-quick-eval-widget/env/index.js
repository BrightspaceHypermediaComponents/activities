import { Rels } from 'siren-sdk/src/hypermedia-constants';

export const QuickEvalActivityAllowList = {
	assignmentActivity: {
		class: 'assignment-activity',
		icon: 'tier2:assignments',
		rel: Rels.assignment,
		type: 'Assignment'
	},
	discussionActivity: {
		class: 'discussion-activity',
		icon: 'tier2:discussions',
		rel: Rels.Discussions.topic,
		type: 'Discussion'
	},
	quizActivity: {
		class: 'quiz-activity',
		icon: 'tier2:quizzing',
		rel: Rels.quiz,
		type: 'Quiz'
	}
};
