export const ActivityEditorDialogMixin = superclass => class extends superclass {

	static get properties() {
		return {
			opened: { type: Boolean }
		};
	}

	constructor() {
		super();
		this.opened = false;
	}

	handleClose(e) {
		const wasOpen = this.opened;
		this.opened = false;
		e && e.stopPropagation(); //https://github.com/BrightspaceHypermediaComponents/activities/pull/1476#pullrequestreview-585651698

		if (wasOpen) {
			// This custom event is fired to workaround the above 'stopPropagation'
			const event = new CustomEvent('d2l-activity-editor-dialog-mixin-handled-close', {
				bubbles: true,
				composed: true,
				cancelable: true,
				detail: e.detail
			});
			this.dispatchEvent(event);
		}
	}

	open(event) {
		event && event.preventDefault();
		this.opened = true;
	}
};
