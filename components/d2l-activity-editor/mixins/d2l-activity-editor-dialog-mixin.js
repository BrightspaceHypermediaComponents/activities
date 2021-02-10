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
		e.stopPropagation();
	}

	open(event) {
		event.preventDefault();
		this.opened = true;
	}
};
