import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';
import { ActivityEditorContainerMixin } from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-container-mixin.js';

const container = defineCE(
	class extends ActivityEditorContainerMixin(HTMLElement) {
	}
);

const editor = defineCE(
	class extends HTMLElement {
		hasPendingChanges() {
			this.hasPendingChangesCalled = true;
		}
		save() {
			this.saveCalled = true;
		}

		validate() {
			this.validateCalled = true;
		}

	}
);

const editorValidationFail = defineCE(
	class extends HTMLElement {
		save() {
			this.saveCalled = true;
		}

		validate() {
			this.validateCalled = true;
			throw new Error('Validation error');
		}
	}
);

function connectedEvent(editor) {
	return new CustomEvent('d2l-activity-editor-connected', {
		detail: { editor },
		bubbles: true,
		composed: true,
		cancelable: true
	});
}

const saveEvent = new CustomEvent('d2l-activity-editor-save', {
	bubbles: true,
	composed: true,
	cancelable: true
});

const cancelEvent = new CustomEvent('d2l-activity-editor-cancel', {
	bubbles: true,
	composed: true,
	cancelable: true
});

describe('d2l-activity-editor-container-mixin', function() {

	it('handles save', async() => {
		const el = await fixture(`<${container}><${editor}></${editor}></${container}`);

		const childEditor = el.firstElementChild;

		childEditor.dispatchEvent(connectedEvent(childEditor));
		childEditor.dispatchEvent(saveEvent);

		await nextFrame();

		expect(childEditor.validateCalled, 'validateCalled with successful validation').to.be.true;
		expect(childEditor.saveCalled, 'saveCalled after successful validation').to.be.true;
	});

	it('handles cancel', async() => {
		const el = await fixture(`<${container}><${editor}></${editor}></${container}`);

		const childEditor = el.firstElementChild;

		childEditor.dispatchEvent(connectedEvent(childEditor));
		childEditor.dispatchEvent(cancelEvent);

		await nextFrame();

		expect(childEditor.hasPendingChangesCalled, 'hasPendingChanges should be called').to.be.true;
	});

	it('does not save on validation fail', async() => {
		const el = await fixture(`<${container}><${editorValidationFail}></${editorValidationFail}></${container}`);

		const childEditor = el.firstElementChild;

		childEditor.dispatchEvent(connectedEvent(childEditor));
		childEditor.dispatchEvent(saveEvent);

		await nextFrame();

		expect(childEditor.validateCalled, 'validateCalled with unsuccessful validation').to.be.true;
		expect(childEditor.saveCalled, 'saveCalled after unsuccessful validation').to.be.undefined;
	});
});
