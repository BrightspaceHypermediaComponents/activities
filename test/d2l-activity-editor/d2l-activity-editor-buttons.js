import '../../components/d2l-activity-editor/d2l-activity-editor-buttons.js';
import { fixture, html, oneEvent, waitUntil } from '@open-wc/testing';

describe('d2l-activity-editor-buttons', function() {

	it('sends save event', async() => {
		const el = await fixture(html`
			<d2l-activity-editor-buttons foo="bar"></d2l-activity-editor-buttons>
		`);

		await waitUntil(() => el.shouldUpdate([]), 'Waiting for localization/render');

		setTimeout(() => el.shadowRoot.querySelector('d2l-button').click());

		await oneEvent(el, 'd2l-activity-editor-save');
	});
});
