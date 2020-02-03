export const ActivityEditorContainerMixin = superclass => class extends superclass {

	constructor() {
		super();
		this.addEventListener('d2l-activity-editor-connected', this._registerEditor);
		this.addEventListener('d2l-activity-editor-save', this._save);
		this._editors = new Set();
	}

	_registerEditor(e) {
		this._editors.add(e.detail.editor);
		e.detail.container = this;
		e.stopPropagation();
	}

	unregisterEditor(editor) {
		this._editors.delete(editor);
	}

	async _save() {
		for (const editor of this._editors) {
			// TODO - Once we decide how we want to handle errors we may want to add error handling logic
			// to the save
			await editor.save();
		}
	}

};
