import '../../components/d2l-activity-editor/d2l-activity-visibility-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

describe('d2l-activity-visibility-editor-toggle', function() {

	let el;

	describe('enabled', () => {

		beforeEach(async() => {
			el = await fixture(html`
				<d2l-activity-visibility-editor-toggle can-edit-draft is-draft></d2l-activity-visibility-editor-toggle>
			`);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders switch when enabled', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-switch')).to.exist;
		});
	});

	describe('disabled', () => {
		beforeEach(async() => {
			el = await fixture(html`
				<d2l-activity-visibility-editor-toggle is-draft></d2l-activity-visibility-editor-toggle>
			`);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('hides switch', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-switch')).to.not.exist;
		});

		it('shows label', async() => {
			expect(el.shadowRoot.querySelectorAll('div.d2l-label-text')).to.exist;
		});
	});
});

describe('d2l-activity-visibility-editor', function() {

	let el, href, activity, toggle;

	beforeEach(async() => {
		href = 'http://activity/1';
		activity = new ActivityUsage(href, 'token');
		activity.setDraftStatus(true);
		activity.setCanEditDraft(true);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-visibility-editor href=${href} token="token"></d2l-activity-visibility-editor>
		`);

		toggle = el.shadowRoot.querySelector('d2l-activity-visibility-editor-toggle');
	});

	afterEach(() => {
		store.clear();
	});

	describe('enabled draft', () => {
		it('renders toggle with correct attributes', async() => {
			expect(toggle).to.have.attr('can-edit-draft');
			expect(toggle).to.have.attr('is-draft');
		});
	});

	describe('disabled published', () => {
		beforeEach(async() => {
			activity.setCanEditDraft(false);
			activity.setDraftStatus(false);
			await elementUpdated(el);
		});

		it('renders toggle with correct attributes', async() => {
			expect(toggle).to.not.have.attr('can-edit-draft');
			expect(toggle).to.not.have.attr('is-draft');
		});
	});
});
