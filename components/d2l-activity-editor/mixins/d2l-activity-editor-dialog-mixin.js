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
		this.opened = false;
		e && e.stopPropagation(); //https://github.com/BrightspaceHypermediaComponents/activities/pull/1476#pullrequestreview-585651698
	}

	open(event) {
		event && event.preventDefault();
		this.opened = true;
	}
};
