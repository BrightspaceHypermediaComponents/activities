import '../../components/d2l-activity-editor/d2l-activity-editor-alert.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

describe('d2l-activity-visibility-editor', function() {

	let el, href, activity, alert;

	beforeEach(async() => {
		href = 'http://activity/1';
		activity = new ActivityUsage(href, 'token');
		activity.setIsError(true);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-editor-alert href=${href} token="token" text="This is an alert"></d2l-activity-editor-alert>
		`);

		alert = el.shadowRoot.querySelector('d2l-alert');
	});

	afterEach(() => {
		store.clear();
	});

	it('passes accessibility test', async() => {
		await expect(el).to.be.accessible();
	});

	it('is visible if activity is in error', async() => {
		expect(alert).to.have.attr('type', 'error');
		expect(alert).to.have.text('This is an alert');
	});

	it('is not visible if activity is in error but text is not set', async() => {
		el = await fixture(html`
			<d2l-activity-editor-alert href=${href} token="token"></d2l-activity-editor-alert>
		`);

		alert = el.shadowRoot.querySelector('d2l-alert');
		expect(alert).to.be.null;
	});

	it('is not visible if activity is not in error', async() => {
		activity.setIsError(false);
		await elementUpdated(el);

		alert = el.shadowRoot.querySelector('d2l-alert');
		expect(alert).to.be.null;
	});
});
