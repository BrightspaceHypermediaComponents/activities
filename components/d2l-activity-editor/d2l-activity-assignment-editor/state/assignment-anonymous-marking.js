import { action, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class AnonymousMarkingProps {

	constructor(entity) {
		this.isAnonymousMarkingEnabled = entity.isAnonymousMarkingEnabled;
		this.canEditAnonymousMarking = entity.canEditAnonymousMarking;
		this.anonymousMarkingHelpText = entity.getAnonymousMarkingHelpText;
		this.entityAnonymousMarkingAvailable = entity.isAnonymousMarkingAvailable;
		this.isAnonymousMarkingAvailable = this.entityAnonymousMarkingAvailable;

		this.setIsAnonymousMarkingAvailableForSubmissionType(entity.submissionType);
	}

	isSubmissionTypeWithAnonMarking(submissionType) {
		// only file (0) and text (1) submissions can have anonymous marking, see https://docs.valence.desire2learn.com/res/dropbox.html#attributes
		return ['0', '1'].includes(submissionType);
	}

	setAnonymousMarking(value) {
		this.isAnonymousMarkingEnabled = value;
	}

	setIsAnonymousMarkingAvailableForSubmissionType(submissionType) {
		this.isAnonymousMarkingAvailable =
			this.entityAnonymousMarkingAvailable && this.isSubmissionTypeWithAnonMarking(submissionType);
	}

}

decorate(AnonymousMarkingProps, {
	isAnonymousMarkingAvailable: observable,
	isAnonymousMarkingEnabled: observable,
	canEditAnonymousMarking: observable,
	anonymousMarkingHelpText: observable,
	setAnonymousMarking: action
});
