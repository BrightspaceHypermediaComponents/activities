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
			'close': 'إغلاق',
			'completed': 'تم الإكمال',
			'confirmation': 'تأكيد',
			'courseName': 'المقرر التعليمي',
			'discussion': 'المناقشة',
			'displayName': 'الاسم الأول، اسم العائلة',
			'due': 'تاريخ الاستحقاق: {date}',
			'evaluate': 'تقييم {displayName}',
			'evaluateAll': 'تقييم الكل',
			'evaluated': 'تم التقييم',
			'failedToFilter': 'يتعذّر تطبيق التصفية. حاول مجددًا في غضون بضع دقائق.',
			'failedToLoadActivities': 'يتعذّر تحميل الأنشطة. حاول مجددًا بعد بضع دقائق.',
			'failedToLoadData': 'يتعذّر تحميل عمليات الإرسال. حاول مجددًا في غضون بضع دقائق.',
			'failedToLoadMore': 'يتعذّر تحميل المزيد من عمليات الإرسال. حاول مجددًا في غضون بضع دقائق.',
			'failedToSearch': 'يتعذّر تطبيق البحث. حاول مجددًا في غضون بضع دقائق.',
			'firstName': 'الاسم الأول',
			'lastName': 'اسم العائلة',
			'loadMore': 'تحميل المزيد',
			'loading': 'يتم الآن التحميل',
			'masterTeacher': 'المعلّم',
			'newAttempts': 'محاولات جديدة',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {إعادة محاولة واحدة} other ‏{{reAttemptNum} من إعادة المحاولات}}} other {{reAttemptNum, plural, =0 {{newNum} إعادة محاولة جديدة} =1{{newNum} إعادة محاولة واحدة جديدة} other {{newNum}{reAttemptNum} من إعادة المحاولات الجديدة}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {ترابط أو رد واحد} other {{numInteractions} من الترابطات أو الردود}}',
			'newPosts': 'منشورات جديدة',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {عملية إعادة إرسال واحدة} other {{resub} من عمليات إعادة الإرسال}}} other {{resub, plural, =0 {{newNum} إعادة محاولة جديدة} =1{{newNum} عملية إعادة إرسال واحدة جديدة} other {{newNum} {resub} من عمليات إعادة الإرسال الجديدة}}}}',
			'newSubmissions': 'إرسالات جديدة',
			'no': 'لا',
			'noCriteriaMatch': 'لا تتوفر أي عمليات إرسال تتوافق مع معاييرك.',
			'noCriteriaMatchActivities': 'لا تتوفر أي أنشطة تتطابق مع معاييرك.',
			'noResults': 'لا تتوفر أي نتائج هنا.',
			'noSubmissions': 'لا تتوفر أي عمليات إرسال تتطلب اهتمامك.',
			'publishAll': 'نشر الكل',
			'publishAllConfirmDialogMessage': 'سيتلقى {evaluated} من أصل {assigned} من المستخدمين ملاحظات حول النشر. هل تريد المتابعة؟',
			'publishAllToastMessage': 'تم نشر تقييمات {activityName} بنجاح.',
			'publishAllToastMessageTruncated': 'تم نشر تقييمات {truncatedActivityName}… بنجاح.',
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
			'toggleIndicatorLabelActions': 'تنفيذ الإجراءات في {target}',
			'toggleIndicatorLabelInfo': 'عرض المعلومات في {target}',
			'tryAgain': 'المحاولة مرة أخرى',
			'viewBy': 'عرض حسب:',
			'yes': 'نعم'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);

