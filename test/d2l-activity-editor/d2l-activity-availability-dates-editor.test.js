import '../../components/d2l-activity-editor/d2l-activity-availability-dates-editor';
import { elementUpdated, expect, fixture, html, nextFrame, waitUntil } from '@open-wc/testing';
import { ActivityDates } from '../../components/d2l-activity-editor/state/activity-dates';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

describe('d2l-activity-availability-dates-editor', function() {

	let el, href, activity, dates, startDateInput, endDateInput;

	beforeEach(async() => {
		dates = new ActivityDates({
			canEditDates: () => true,
			startDate: () => '2020-02-24T04:59:00.000Z',
			dueDate: () => '2020-02-25T04:59:00.000Z',
			endDate: () => '2020-02-26T04:59:00.000Z'
		});

		href = 'http://activity/1';
		activity = new ActivityUsage(href, 'token');
		activity.setDates(dates);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-availability-dates-editor href=${href} token="token"></d2l-activity-availability-dates-editor>
		`);

		startDateInput = el.shadowRoot.querySelector('#start-date-input');
		endDateInput = el.shadowRoot.querySelector('#end-date-input');
	});

	afterEach(() => {
		store.clear();
	});

	it('passes accessibility test', async() => {
		await expect(el).to.be.accessible();
	});

	describe('inputs visible', function() {
		it('renders both availability date inputs when enabled', async() => {
			expect(startDateInput).to.exist;
			expect(endDateInput).to.exist;
		});
	});

	describe('inputs disabled', function() {
		beforeEach(async() => {
			dates.setCanEditDates(false);
			await elementUpdated(el);

			startDateInput = el.shadowRoot.querySelector('#start-date-input');
			endDateInput = el.shadowRoot.querySelector('#end-date-input');
		});

		it('renders disabled date inputs if not allowed to edit', async() => {
			expect(startDateInput).to.have.attr('disabled');
			expect(endDateInput).to.have.attr('disabled');
		});
	});

	describe('dates', function() {
		it('displays correct dates', async() => {
			expect(startDateInput).to.have.attr('value', '2020-02-24T04:59:00.000Z');
			expect(endDateInput).to.have.attr('value', '2020-02-26T04:59:00.000Z');
		});

		it('updates date values on change', async() => {
			dates.setStartDate('2020-02-25T04:59:00.000Z');
			dates.setEndDate('2020-02-27T04:59:00.000Z');
			await elementUpdated(el);

			expect(startDateInput).to.have.attr('value', '2020-02-25T04:59:00.000Z');
			expect(endDateInput).to.have.attr('value', '2020-02-27T04:59:00.000Z');
		});
	});

	describe('invalid state', function() {
		it('sets start date to be invalid for given error', async() => {
			dates.setErrorLangTerms('start-after-due-date-error');

			await waitUntil(() => startDateInput.invalid, 'Start date did not become invalid');
			expect(endDateInput.invalid).to.be.false;
		});
		it('sets end date to be invalid for given error', async() => {
			dates.setErrorLangTerms('end-before-due-date-error');

			await waitUntil(() => endDateInput.invalid, 'End date did not become invalid');
			expect(startDateInput.invalid).to.be.false;
		});
		it('sets start and end date to be invalid for given error', async() => {
			dates.setErrorLangTerms('end-before-start-due-date-error');
			await nextFrame();

			expect(startDateInput.invalid).to.be.true;
			expect(endDateInput.invalid).to.be.true;
		});
		it('clears invalid state', async() => {
			dates.setErrorLangTerms('end-before-start-due-date-error');
			await nextFrame();

			expect(startDateInput.invalid).to.be.true;
			expect(endDateInput.invalid).to.be.true;

			dates.setErrorLangTerms();
			await nextFrame();

			expect(startDateInput.invalid).to.be.false;
			expect(endDateInput.invalid).to.be.false;
		});
	});
});
