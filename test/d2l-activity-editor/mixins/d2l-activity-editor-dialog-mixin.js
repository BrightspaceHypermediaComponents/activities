import { defineCE, expect, fixture } from '@open-wc/testing';
import { ActivityEditorDialogMixin } from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-dialog-mixin.js';

const TYPE_FUNCTION = 'function';

const editor = defineCE(
	class extends ActivityEditorDialogMixin(HTMLElement) {
	}
);

describe('d2l-activity-editor-dialog-mixin', function() {
	it('exposes an opened property', async() => {
		const el = await fixture(`<${editor}></${editor}>`);

		expect(el.opened).to.not.be.undefined;
		expect(typeof el.opened).to.equal('boolean');
	});

	it('exposes an open method', async() => {
		const el = await fixture(`<${editor}></${editor}>`);

		expect(el.open).to.not.be.undefined;
		expect(typeof el.open).to.equal(TYPE_FUNCTION);
	});

	it('exposes a handleClose method', async() => {
		const el = await fixture(`<${editor}></${editor}>`);

		expect(el.handleClose).to.not.be.undefined;
		expect(typeof el.open).to.equal(TYPE_FUNCTION);
	});

	it('handles opening a dialog', async() => {
		const el = await fixture(`<${editor}></${editor}>`);
		const event = { preventDefault: () => {} };

		el.opened = false;

		el.open(event);

		expect(el.opened).to.be.true;
	});

	it('handles closing a dialog', async() => {
		const el = await fixture(`<${editor}></${editor}>`);
		const event = { stopPropagation: () => {} };
		el.opened = true;

		el.handleClose(event);

		expect(el.opened).to.be.false;
	});
});
