import '../../components/d2l-activity-editor/d2l-activity-outcomes.js';
import { fixture, html } from '@open-wc/testing';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

function _requestProviderMock(e) {
	if (e.detail.key === 'd2l-milestone-three') {
		e.detail.provider = true;
		e.stopPropagation();
	}
}

describe('d2l-activity-outcomes', function() {
	let href, activity, el, opener;

	before(() => {
		window.addEventListener('d2l-request-provider', _requestProviderMock);
	});

	after(() => {
		window.removeEventListener('d2l-request-provider', _requestProviderMock);
	});

	beforeEach(() => {
		href = 'http://activity/1';
		activity = new ActivityUsage(href, 'token');
	});

	afterEach(() => {
		store.clear();
	});

	async function _setup(hasAlignmentsHref, canUpdateAlignments) {
		activity.setAlignmentsHref(hasAlignmentsHref ? 'http://alignments-href/' : undefined);
		activity.setCanUpdateAlignments(canUpdateAlignments && hasAlignmentsHref);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-outcomes href=${href} token="token"></d2l-activity-outcomes>
		`);

		opener = el.shadowRoot.querySelector('d2l-button-subtle');
	}

	it('passes accessibility test', async() => {
		await _setup(true, true);

		await expect(el).to.be.accessible();
	});

	it('displays opener when enabled and with permissions', async() => {
		await _setup(true, true);

		expect(opener).to.exist;
	});

	it('does not display opener when with permissions but not enabled', async() => {
		await _setup(false, true);

		expect(opener).to.not.exist;
	});

	it('does not display opener when enabled but without permissions', async() => {
		await _setup(true, false);

		expect(opener).to.not.exist;
	});
});
