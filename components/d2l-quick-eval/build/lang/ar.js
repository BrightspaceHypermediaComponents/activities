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
			'noResults': 'لا تتوفر أي نتائج هنا.',
			'noSubmissions': 'لا تتوفر أي عمليات إرسال تتطلب اهتمامك.',
			'publishAll': 'نشر الكل',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
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
			'tryAgain': 'المحاولة مرة أخرى',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': 'عرض حسب:',
			'yes': 'Yes'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);

