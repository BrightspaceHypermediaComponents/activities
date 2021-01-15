export const Milestones = Object.freeze({
	M3DefaultScoringRubric: 'd2l-milestone-three-default-scoring-rubric',
	M3ReleaseConditions: 'd2l-milestone-three-release-conditions',
	M3SpecialAccess: 'd2l-milestone-three-special-access',
	M4EmailSubmission: 'd2l-milestone-four-email-submission',
});

export const ActivityEditorFeaturesMixin = superclass => class extends superclass {

	_isMilestoneEnabled(milestoneToCheck) {
		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: milestoneToCheck },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		return event.detail.provider;

	}

};

