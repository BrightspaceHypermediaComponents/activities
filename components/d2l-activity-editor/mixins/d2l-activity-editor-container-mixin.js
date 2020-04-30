import { ActivityEditorTelemetryMixin } from './d2l-activity-editor-telemetry-mixin';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';

export const ActivityEditorContainerMixin = superclass => class extends ActivityEditorTelemetryMixin(superclass) {

	static get properties() {
		return {
			/**
			 * Is Creating New
			 */
			isNew: { type: Boolean }
		};
	}

	constructor() {
		super();
		this.addEventListener('d2l-activity-editor-connected', this._registerEditor);
		this.addEventListener('d2l-activity-editor-save', this._save);
		this.addEventListener('d2l-activity-editor-cancel', this._cancel);

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

	get cancelCompleteEvent() {
		return new CustomEvent('d2l-activity-editor-cancel-complete', {
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

	async delete() {}

	async _save() {
		this.markSaveStart(this.type, this.telemetryId);

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

		this.logSaveEvent(this.href, this.type, this.telemetryId);
	}

	async _cancel() {
		const hasPendingChanges = Array.from(this._editors).some(editor => editor.hasPendingChanges());

		if (hasPendingChanges) {
			const dialog = this.shadowRoot.querySelector('d2l-dialog');
			const action = await dialog.open();
			if (action === 'cancel') {
				return;
			}
		}

		if (this.isNew) {
			await this.delete();
		}

		this.dispatchEvent(this.cancelCompleteEvent);
	}
};
