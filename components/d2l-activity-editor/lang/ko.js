/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "릴리스 조건 편집", // edit release conditions button
	"btnAddReleaseCondition": "릴리스 조건 추가", // add release condition button
	"btnCreateNew": "새로 만들기", // create new button
	"btnAddExisting": "기존 항목 추가", // add existing button
	"btnRemoveCondition": "조건 제거", // remove condition button
	"lblConditionsOperator": "이 항목을 보려면 사용자가 다음을 충족해야 합니다.", // conditions operator label
	"txtNumReleaseConditions": "{수, 복수, =1 {{count}개 릴리스 조건} 기타 {{count}개 릴리스 조건}}", // num release condition text
	"btnCancel": "취소", // cancel button
	"btnSave": "저장 및 닫기", // save and close button
	"dueDate": "기한", // ARIA label for the due date field when creating/editing an activity
	"endDate": "종료일", // ARIA label for the end date field when creating/editing an activity
	"startDate": "시작일", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "기한 시간", // ARIA label for the due time field when creating/editing an activity
	"endTime": "종료 시각", // ARIA label for the end time field when creating/editing an activity
	"startTime": "시작 시각", // ARIA label for the start time field when creating/editing an activity
	"hidden": "숨김", // Label displayed with the visibility switch when hidden
	"ariaHidden": "학습자에게 표시되지 않음", // Aria Label for the visibility switch when hidden
	"noDueDate": "기한 없음", // Placeholder text for due date field when no due date is set
	"noEndDate": "종료일 없음", // Placeholder text for due date field when no due date is set
	"noStartDate": "시작일 없음", // Placeholder text for due date field when no due date is set
	"visible": "표시", // Label displayed with the visibility switch when visible
	"ariaVisible": "학습자에게 표시됩니다.", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "사용 가능 날짜는 {startDate}에 시작되고 {endDate}에 종료됩니다.", // start/end text
	"txtAvailabilityStartOnly": "사용 가능 날짜 시작일 {startDate}", // start only text
	"txtAvailabilityEndOnly": "사용 가능 날짜 종료일 {endDate}", // end only text
	"txtAvailabilityNeither": "항상 사용 가능", // always available text
	"ungraded": "평점 미산정", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "평점 내", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "평점에 없음", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "평점에 추가", // Menu item for adding grade association
	"addAGrade": "평점 추가", //ARIA label to add a grade to the activity
	"removeFromGrades": "평점에서 삭제됩니다.", // Menu item for removing grade association
	"setUngraded": "평점 없음으로 재설정", // Menu item for setting the activity to ungraded
	"scoreOutOf": "기준 만점 점수", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "평점 내 활동에 대한 포인트 값을 지정해야 합니다.", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "기준 만점 점수는 0.01 이상 9,999,999,999 이하여야 합니다.", // Error message when an invalid score out of value is entered
	"loading": "로드 중...", // Message displayed while page is loading
	"ok": "확인", // Text of dialog button to commit action
	"cancel": "취소", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "도구 모음을 불러오려면 ALT-F10을 누르고, 도구 모음을 끝내려면 도구 모음 내에서 ESC를 누르십시오.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "평점 중에서 선택하십시오.", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "루브릭", //Header for the rubrics section
	"startBeforeEndDate": "시작일은 종료일 이전이어야 합니다.",
	"dueBetweenStartEndDate": "기한은 시작 날짜 이후여야 하며 종료 날짜 이전이거나 종료일과 같아야 합니다.",
	"dueAfterStartDate": "기한은 시작일 이후여야 합니다.",
	"dueBeforeEndDate": "기한은 종료일 이전이거나 종료일과 같아야 합니다.",
	"createAndLinkToNewGradeItem": "새 평점 항목을 생성하고 연결합니다.", //Radio button text
	"linkToExistingGradeItem": "기존 평점 항목에 연결합니다.", //Radio button text
	"points": "점수: {points}", // Text label for displaying points of a grade
	"noGradeItems": "기존 평점 항목이 없습니다.", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "새 평점 항목을 생성할 권한이 없습니다." // Reason why a new grade items cannot be created in the choose grades dialog
};
