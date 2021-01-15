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

