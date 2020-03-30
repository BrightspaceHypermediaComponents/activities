export const Milestones = Object.freeze({
	M2: 'd2l-milestone-two',
	M3: 'd2l-milestone-three',
	M4: 'd2l-milestone-four'
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

