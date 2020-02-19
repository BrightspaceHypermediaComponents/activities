import { defineCE, expect, fixture } from '@open-wc/testing';
import { ActivityEditorContainerMixin} from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-container-mixin.js';

const container = defineCE(
	class extends ActivityEditorContainerMixin(HTMLElement) {
	}
);

const editor = defineCE(
	class extends HTMLElement {
		save() {
			this.saveCalled = true;
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

describe('d2l-activity-editor-container-mixin', function() {

	it('handles save', async() => {
		const el = await fixture(`<${container}><${editor}></${editor}></${container}`);

		const childEditor = el.firstElementChild;

		childEditor.dispatchEvent(connectedEvent(childEditor));
		childEditor.dispatchEvent(saveEvent);

		expect(childEditor.saveCalled).to.be.true;
	});
});
