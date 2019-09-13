'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'activities': 'Activities',
			'activityName': 'Activity Name',
			'assignment': 'Assignment',
			'caughtUp': 'You\'re all caught up!',
			'checkBackOften': 'Check back often for new submissions.',
			'clearSearch': 'Clear Search',
			'close': 'Close',
			'completed': 'Completed',
			'confirmation': 'Confirmation',
			'courseName': 'Course',
			'discussion': 'Discussion',
			'displayName': 'First Name, Last Name',
			'due': 'Due: {date}',
			'evaluate': 'Evaluate {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Unable to apply filter. Try again in a few minutes.',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadActivities': 'Unable to load activities. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'failedToSearch': 'Unable to apply search. Try again in a few minutes.',
			'firstName': 'First Name',
			'lastName': 'Last Name',
			'loading': 'Loading',
			'loadMore': 'Load more',
			'masterTeacher': 'Teacher',
			'no': 'No',
			'noCriteriaMatch': 'There are no submissions that match your criteria.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'No results here.',
			'noSubmissions': 'There are no submissions that need your attention.',
			'publishAll': 'Publish All',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': 'Published',
			'quiz': 'Quiz',
			'search': 'Search',
			'searchResultsSingle': '1 Search Result',
			'searchResultsMultiple': '{num} Search Results',
			'searchResultsMore': '{num}+ Search Results',
			'sortBy': 'Sort by {columnName}',
			'submissionDate': 'Submission Date',
			'submissionList': 'Submission List',
			'submissions': 'Submissions',
			'tableTitle': 'List of unevaluated Learner submissions from across courses and tools',
			'toggleIndicatorLabelActions': 'Perform Actions on {target}',
			'toggleIndicatorLabelInfo': 'View info on {target}',
			'tryAgain': 'Try Again',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} other {{newNum} new, {resub} resubmissions}}}}',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} other {{numInteractions} threads or replies}}',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} other {{newNum} new, {reAttemptNum} reattempts}}}}',
			'viewBy': 'View by:',
			'yes': 'Yes'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);

