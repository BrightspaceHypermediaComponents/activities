import '../../../../components/d2l-activity-editor/d2l-activity-content-editor/lti-link/d2l-activity-content-lti-link-detail.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ContentLTILink } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/lti-link/state/content-lti-link.js';
import { shared as ltiLinkStore } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/lti-link/state/content-lti-link-store.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-content-lti-link-detail', function() {

	let href, token, contentItem;

	async function loadComponent() {
		ltiLinkStore.put(href, contentItem);
		return await fixture(
			html`
				<d2l-activity-content-lti-link-detail
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-lti-link-detail>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://test-lti-link-href.com';
		token = 'token';
		contentItem = new ContentLTILink(href, token);
	});

	afterEach(async() => {
		ltiLinkStore.clear();
	});

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-lti-link-detail');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
