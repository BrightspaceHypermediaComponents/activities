import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';
import { ActivityEditorContainerMixin } from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-container-mixin.js';

const container = defineCE(
	class extends ActivityEditorContainerMixin(HTMLElement) {
	}
);

let saveCount = 0;

const editor = defineCE(
	class extends HTMLElement {

		constructor() {
			super();
			this.saveOrder = 1;
		}

		cancelChanges() {
			this.cancelChangesCalled = true;
		}

		hasPendingChanges() {
			this.hasPendingChangesCalled = true;
		}
		save() {
			saveCount += 1;
			this.saveCount = saveCount;
			this.saveCalled = true;
		}

		validate() {
			this.validateCalled = true;
		}

	}
);

const editor2 = defineCE(
	class extends HTMLElement {
		constructor() {
			super();
			this.saveOrder = 2;
		}

		cancelChanges() {
			this.cancelChangesCalled = true;
		}

		hasPendingChanges() {
			this.hasPendingChangesCalled = true;
		}
		save() {
			saveCount += 1;
			this.saveCount = saveCount;
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
	this.beforeEach(() => {
		saveCount = 0;
	});

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
		expect(childEditor.cancelChangesCalled, 'cancelChanges should be called').to.be.true;

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

	it('handles save order', async() => {
		const el = await fixture(`<${container}><${editor2}></${editor2}><${editor}></${editor}></${container}`);

		const childEditor2 = el.firstElementChild;

		childEditor2.dispatchEvent(connectedEvent(childEditor2));

		const childEditor1 = childEditor2.nextElementSibling;

		childEditor1.dispatchEvent(connectedEvent(childEditor1));

		childEditor2.dispatchEvent(saveEvent);

		await nextFrame();

		expect(childEditor2.validateCalled, 'editor2: validateCalled with successful validation').to.be.true;
		expect(childEditor2.saveCalled, 'editor2: saveCalled after successful validation').to.be.true;
		expect(childEditor2.saveCount, 'editor2: should be saved second').to.equal(2);

		expect(childEditor1.validateCalled, 'editor1: validateCalled with successful validation').to.be.true;
		expect(childEditor1.saveCalled, 'editor1: saveCalled after successful validation').to.be.true;
		expect(childEditor1.saveCount, 'editor1: should be saved first').to.equal(1);
	});
});
