import { defineCE, expect, fixture, oneEvent } from '@open-wc/testing';
import { ActivityEditorContainerMixin } from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-container-mixin.js';
import { ActivityEditorMixin} from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-mixin.js';
import { AsyncStateEvent } from '@brightspace-ui/core/helpers/asyncStateEvent.js';

const container = defineCE(
	class extends ActivityEditorContainerMixin(HTMLElement) {
	}
);

const editor = defineCE(
	class extends ActivityEditorMixin(HTMLElement) {
	}
);

describe('d2l-activity-editor-mixin', function() {

	it('registers/unregisters editor', async() => {
		const el = await fixture(`<${container}><${editor}></${editor}></${container}`);
		expect(el._editors).to.include(el.firstElementChild);

		el.firstElementChild.remove();
		expect(el._editors).to.be.empty;
	});

	it('sends pending event', async() => {
		const el = await fixture(`<${editor}></${editor}>`);

		setTimeout(() => el._fetch(() => Promise.resolve()));

		await oneEvent(el, (new AsyncStateEvent()).type);
	});
});
