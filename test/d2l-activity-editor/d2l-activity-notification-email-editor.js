import '../../components/d2l-activity-editor/d2l-activity-notification-email-editor.js';
import { fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

describe('d2l-activity-notification-email-editor', function() {

	async function loadComponent(notificationEmail, canEditNotificationEmail, changedCallback) {
		return await fixture(html`
			<d2l-activity-notification-email-editor
				value="${notificationEmail}"
				?disabled="${!canEditNotificationEmail}"
				@activity-notification-email-changed="${changedCallback}">
				<span slot="description">Test description slot</span>
			</d2l-activity-notification-email-editor>
		`);
	}

	beforeEach(() => {
		sinon.restore();
	});

	describe('initialization', () => {
		it('correctly initializes notificationEmail value', async() => {
			// undefined
			let el = await loadComponent();
			expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('');

			// empty
			el = await loadComponent('');
			expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('');

			// invalid emails
			el = await loadComponent('abc; def; ghi');
			expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('abc; def; ghi');

			// valid email
			el = await loadComponent('test@d2l.com');
			expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('test@d2l.com');
		});

		it('correctly initializes disabled value', async() => {
			// undefined
			let el = await loadComponent();
			expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.false;

			// false
			el = await loadComponent('abc', false);
			expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('abc');
			expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.false;

			// true
			el = await loadComponent('abc', true);
			expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('abc');
			expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.true;
		});
	});

	describe('_checkNotificationEmail function', () => {
		let el;

		const createEventObject = (value) => {
			return { target: { value } };
		};

		beforeEach(async() => {
			el = await loadComponent();
			sinon.spy(el, 'setError');
			sinon.spy(el, 'clearError');
		});

		afterEach(() => {
			el.setError.restore();
			el.clearError.restore();
		});

		it('correctly identifies valid emails', () => {
			const validEmailsList = ['', 'a@d2l.com', 'a@d2l.com; a@d2l.com;'];

			validEmailsList.forEach(email => {
				const event = createEventObject(email);
				el._checkNotificationEmail(event);
			});

			expect(el.setError).not.to.have.been.called();
			expect(el.clearError).to.have.been.called.exactly(validEmailsList.length);
		});

		it('correctly identifies INVALID emails', () => {
			const invalidEmailsList = [null, undefined, true, 'null', 'undefined', 'true', 'a', 'a@d2l.com; b', 'b; a@d2l.com', 'b@.com', '@d2l.com', 'a@d2l;', '   '];

			invalidEmailsList.forEach(email => {
				const event = createEventObject(email);
				el._checkNotificationEmail(event);
			});

			expect(el.setError).to.have.been.called.exactly(invalidEmailsList.length);
			expect(el.clearError).not.to.have.been.called();
		});
	});

	it('initializes as opened when errors are present', async() => {
		const el = await loadComponent(true);
		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('opened');
	});

	// 	it('handles click event', async() => {
	// 		const el = await loadComponent();
	// 		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('closed');

	// 		const accordion = el.shadowRoot.querySelector('d2l-labs-accordion-collapse');
	// 		const link = accordion.shadowRoot.querySelector('#trigger');
	// 		setTimeout(() => link.click());

	// 		await oneEvent(accordion, 'd2l-labs-accordion-collapse-state-changed');
	// 		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('opening');
	// 	});
	// });

	// describe('d2l-activity-editor-buttons', function() {

	// 	it('sends save event', async() => {
	// 		const el = await fixture(html`
	// 			<d2l-activity-editor-buttons foo="bar"></d2l-activity-editor-buttons>
	// 		`);

	// 		await waitUntil(() => el.shouldUpdate([]), 'Waiting for localization/render');

	// 		setTimeout(() => el.shadowRoot.querySelector('d2l-button').click());

	// 		await oneEvent(el, 'd2l-activity-editor-save');
	// 	});
});
