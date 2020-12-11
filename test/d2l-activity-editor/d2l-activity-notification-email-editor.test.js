import '../../components/d2l-activity-editor/d2l-activity-notification-email-editor.js';
import { expect, fixture, html } from '@open-wc/testing';
import { default as langTerms } from '../../components/d2l-activity-editor/lang/en.js';
import sinon from 'sinon';

describe('d2l-activity-notification-email-editor', function() {

	async function loadComponent(notificationEmail = '', canEditNotificationEmail, slotText = 'test', changedCallback) {
		return await fixture(
			html`
				<d2l-activity-notification-email-editor
					value="${notificationEmail}"
					?disabled="${!canEditNotificationEmail}"
					@activity-notification-email-changed="${changedCallback}">
					<span slot="description">${slotText}</span>
				</d2l-activity-notification-email-editor>
			`
		);
	}

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});

	describe('initialization', () => {
		describe('d2l-input-text email value', () => {
			it('correctly initializes notificationEmail value', async() => {
				// empty
				let el = await loadComponent('');
				expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('');

				// invalid email
				el = await loadComponent('abc; def; ghi');
				expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('abc; def; ghi');

				// valid email
				el = await loadComponent('test@d2l.com');
				expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('test@d2l.com');
			});
		});

		describe('d2l-input-text disabled attribute', () => {
			it('correctly initializes input as disabled', async() => {
				// without value
				let el = await loadComponent('', false);
				expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('');
				expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.true;

				// with value
				el = await loadComponent('abc', false);
				expect(el.shadowRoot.querySelector('d2l-input-text').value).to.equal('abc');
				expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.true;
			});

			it('correctly initializes input as NOT disabled', async() => {
				// without value
				let el = await loadComponent('', true);
				expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.false;

				// with value
				el = await loadComponent('abc', true);
				expect(el.shadowRoot.querySelector('d2l-input-text').disabled).to.be.false;
			});
		});

		describe('label for input', () => {
			it('correctly renders input label', async() => {
				const el = await loadComponent();
				const label = el.shadowRoot.querySelector('#notification-email-editor-label');
				expect(label.innerText).to.equal(langTerms['editor.notificationEmailLabel']);
			});
		});
	});

	describe('_checkNotificationEmail function', () => {
		let el;
		let setErrorSpy;
		let clearErrorSpy;

		const createEventObject = (value) => {
			return { target: { value } };
		};

		beforeEach(async() => {
			el = await loadComponent();
			setErrorSpy = sinon.spy(el, 'setError');
			clearErrorSpy = sinon.spy(el, 'clearError');
		});

		afterEach(() => {
			el.setError.restore();
			el.clearError.restore();
		});

		it('correctly identifies valid emails', () => {
			const validEmailsList = ['', 'a@d2l.com', 'a@d2l.com, b@d2l.com'];

			validEmailsList.forEach(email => {
				const event = createEventObject(email);
				el._checkNotificationEmail(event);
			});

			expect(setErrorSpy.callCount).to.equal(0);
			expect(clearErrorSpy.callCount).to.equal(validEmailsList.length);
		});

		it('correctly identifies INVALID emails', () => {
			const invalidEmailsList = [true, 'null', 'undefined', 'true', 'a', 'a@d2l.com,', 'ab,cd@d2l.com', 'a@d2l.com, b', 'b@.com', '@d2l.com', '   '];

			invalidEmailsList.forEach(email => {
				const event = createEventObject(email);
				el._checkNotificationEmail(event);
			});

			expect(setErrorSpy.callCount).to.equal(invalidEmailsList.length);
			expect(clearErrorSpy.callCount).to.equal(0);
		});
	});
});
