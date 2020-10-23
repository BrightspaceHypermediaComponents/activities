import { ActivityEditorTelemetryMixin } from './d2l-activity-editor-telemetry-mixin';
import { findComposedAncestor } from '@brightspace-ui/core/helpers/dom.js';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';

export const ActivityEditorContainerMixin = superclass => class extends ActivityEditorTelemetryMixin(superclass) {

	static get properties() {
		return {
			/**
			 * Is Creating New
			 */
			isNew: { type: Boolean },
			/**
			 * If there is an error on the page (client and/or server side).
			 */
			isError: { type: Boolean },
			/**
			 * If there is a save attempt in progress. After being enabled, it will only disable on validation or save error.
			 */
			isSaving: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.addEventListener('d2l-activity-editor-connected', this._registerEditor);
		this.addEventListener('d2l-activity-editor-save', this._save);
		this.addEventListener('d2l-activity-editor-cancel', this._cancel);

		this._editors = new Set();
		this.isError = false;
		this.isSaving = false;
	}

	get cancelCompleteEvent() {
		return new CustomEvent('d2l-activity-editor-cancel-complete', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
	}

	get saveCompleteEvent() {
		return new CustomEvent('d2l-activity-editor-save-complete', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
	}
	unregisterEditor(editor) {
		this._editors.delete(editor);
	}

	async _cancel() {
		const editorsPendingChanges = await Promise.all(
			Array.from(this._editors).map(editor => editor.hasPendingChanges())
		);

		if (editorsPendingChanges.some(Boolean)) {
			const dialog = this.shadowRoot.querySelector('d2l-dialog-confirm');

			if (!dialog) {
				return this.dispatchEvent(this.cancelCompleteEvent);
			}

			const action = await dialog.open();
			if (action === 'cancel' || action === 'abort') {
				return;
			}
		}

		if (this.isNew) {
			await this._cancelCreate();
		}

		this.dispatchEvent(this.cancelCompleteEvent);
	}

	async _cancelCreate() {
		return Promise.all(
			Array.from(this._editors).map(editor => editor.cancelCreate())
		);
	}

	async _focusOnInvalid() {
		const isAriaInvalid = node => node.getAttribute('aria-invalid') === 'true' && node.getClientRects().length > 0 && !this._hasSkipAlertAncestor(node);
		for (const editor of this._editors) {
			await editor.updateComplete;
			const el = getFirstFocusableDescendant(editor, true, isAriaInvalid);
			if (el) {
				el.focus();
				return true;
			}
		}
		return false;
	}

	_groupBy(target, property) {
		return target.reduce((acc, obj) => {
			const key = obj[property];
			if (!acc[key]) {
				acc[key] = [];
			}
			// Add object to list for given key's value
			acc[key].push(obj);
			return acc;
		}, {});
	}

	_hasSkipAlertAncestor(node) {
		return null !== findComposedAncestor(node, elm => elm && elm.hasAttribute && elm.hasAttribute('skip-alert'));
	}
	_registerEditor(e) {
		this._editors.add(e.detail.editor);
		e.detail.container = this;
		e.stopPropagation();
	}

	async _save() {
		this.isSaving = true;
		this.markSaveStart(this.type, this.telemetryId);

		const groupedEditors = this._groupBy(Array.from(this._editors), 'saveOrder');
		const orderedEditors = Object.entries(groupedEditors).sort((a, b) => a[0] - b[0]).reduce((acc, obj) => [...acc, obj[1]], []);

		const valid = await this._validate(orderedEditors);
		if (!valid) {
			return;
		}

		await this._saveEditors(orderedEditors);

		this.isError = false;
		this.isSaving = false;
		this.dispatchEvent(this.saveCompleteEvent);
		this.logSaveEvent(this.href, this.type, this.telemetryId);
	}

	async _saveEditors(orderedEditors) {
		for (const editorGroup of orderedEditors) {
			// TODO - Once we decide how we want to handle errors we may want to add error handling logic
			// to the save

			const saves = [];
			for (const editor of editorGroup) {
				saves.push(editor.save());
			}

			try {
				await Promise.all(saves);
			} catch (error) {
				this.isSaving = false;
				throw error;
			}
		}
	}

	async _validate(orderedEditors) {
		for (const editorGroup of orderedEditors) {
			const validations = [];
			for (const editor of editorGroup) {
				validations.push(editor.validate());
			}

			try {
				await Promise.all(validations);
			} catch (e) {
				// Server-side validation error
			}
		}

		// Catch both client- and server-side validation errors
		const isInvalid = await this._focusOnInvalid();
		if (isInvalid) {
			this.isError = true;
			this.isSaving = false;
			return false;
		}
		return true;
	}
};
