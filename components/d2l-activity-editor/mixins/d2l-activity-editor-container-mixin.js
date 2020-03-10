import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';

export const ActivityEditorContainerMixin = superclass => class extends superclass {

	constructor() {
		super();
		this.addEventListener('d2l-activity-editor-connected', this._registerEditor);
		this.addEventListener('d2l-activity-editor-save', this._save);
		this._editors = new Set();
		this.isError = false;
	}

	_registerEditor(e) {
		this._editors.add(e.detail.editor);
		e.detail.container = this;
		e.stopPropagation();
	}

	unregisterEditor(editor) {
		this._editors.delete(editor);
	}

	get saveCompleteEvent() {
		return new CustomEvent('d2l-activity-editor-save-complete', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
	}

	_focusOnInvalid() {
		const isAriaInvalid = node => node.getAttribute('aria-invalid') === 'true' && node.getClientRects().length > 0;
		for (const editor of this._editors) {
			const el = getFirstFocusableDescendant(editor, true, isAriaInvalid);
			if (el) {
				el.focus();
				return true;
			}
		}
		return false;
	}

	async _save() {
		const validations = [];
		for (const editor of this._editors) {
			validations.push(editor.validate());
		}

		try {
			await Promise.all(validations);
		} catch (e) {
			// Server-side validation error
		}

		// Catch both client- and server-side validation errors
		if (this._focusOnInvalid()) {
			this.isError = true;
			return;
		}

		for (const editor of this._editors) {
			// TODO - Once we decide how we want to handle errors we may want to add error handling logic
			// to the save
			await editor.save();
		}

		this.isError = false;
		this.dispatchEvent(this.saveCompleteEvent);
	}

};
