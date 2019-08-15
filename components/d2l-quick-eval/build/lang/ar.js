'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'activities': 'النشاطات',
			'activityName': 'اسم النشاط',
			'assignment': 'الفرض',
			'caughtUp': 'لقد انتهيت من مهامك!',
			'checkBackOften': 'تحقق باستمرار من احتمال توفر عمليات إرسال جديدة.',
			'clearSearch': 'مسح البحث',
			'close': 'Close',
			'completed': 'تم الإكمال',
			'confirmation': 'Confirmation',
			'courseName': 'المقرر التعليمي',
			'discussion': 'المناقشة',
			'displayName': 'الاسم الأول، اسم العائلة',
			'due': 'تاريخ الاستحقاق: {date}',
			'evaluate': 'تقييم {displayName}',
			'evaluateAll': 'تقييم الكل',
			'evaluated': 'تم التقييم',
			'failedToFilter': 'يتعذّر تطبيق التصفية. حاول مجددًا في غضون بضع دقائق.',
			'failedToLoadData': 'يتعذّر تحميل عمليات الإرسال. حاول مجددًا في غضون بضع دقائق.',
			'failedToLoadMore': 'يتعذّر تحميل المزيد من عمليات الإرسال. حاول مجددًا في غضون بضع دقائق.',
			'failedToSearch': 'يتعذّر تطبيق البحث. حاول مجددًا في غضون بضع دقائق.',
			'firstName': 'الاسم الأول',
			'lastName': 'اسم العائلة',
			'loadMore': 'تحميل المزيد',
			'loading': 'يتم الآن التحميل',
			'masterTeacher': 'المعلّم',
			'no': 'No',
			'noCriteriaMatch': 'لا تتوفر أي عمليات إرسال تتوافق مع معاييرك.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'لا تتوفر أي نتائج هنا.',
			'noSubmissions': 'لا تتوفر أي عمليات إرسال تتطلب اهتمامك.',
			'publishAll': 'نشر الكل',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': 'منشور',
			'quiz': 'الاختبار',
			'search': 'بحث',
			'searchResultsMore': 'أكثر من {num} من نتائج البحث',
			'searchResultsMultiple': '{num} من نتائج البحث',
			'searchResultsSingle': 'نتيجة بحث واحدة',
			'sortBy': 'الفرز بحسب {columnName}',
			'submissionDate': 'تاريخ الإرسال',
			'submissionList': 'قائمة الإرسال',
			'submissions': 'الإرسالات',
			'tableTitle': 'قائمة بعمليات إرسال المتعلّم غير المقيّمة من المقررات التعليمية والأدوات',
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'المحاولة مرة أخرى',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newSubmissionSingularDetails': '{newNum} new, 1 resubmission',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions} threads or replies',
			'newPostSingularDetails': '{numInteractions} thread or reply',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new, {reAttemptNum} reattempts',
			'newAttemptsSingularReattemptDetails': '{newNum} new, 1 reattempt',
			'viewBy': 'عرض حسب:',
			'yes': 'Yes'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);

