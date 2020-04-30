import '../../components/d2l-activity-editor/d2l-activity-availability-dates-editor';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActivityDates } from '../../components/d2l-activity-editor/state/activity-dates';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

describe('d2l-activity-availability-dates-editor', function() {

	let el, href, activity, dates, startDatePicker, startDatePickerContainer, endDatePicker, endDatePickerContainer, labels;

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

		startDatePicker = el.shadowRoot.querySelector('#startDate');
		startDatePickerContainer = el.shadowRoot.querySelector('#startdate-container');
		endDatePicker = el.shadowRoot.querySelector('#endDate');
		endDatePickerContainer = el.shadowRoot.querySelector('#enddate-container');
		labels = el.shadowRoot.querySelectorAll('.d2l-label-text');
	});

	afterEach(() => {
		store.clear();
	});

	it('passes accessibility test', async() => {
		await expect(el).to.be.accessible();
	});

	describe('visible', function() {
		it('renders both labels when enabled', async() => {
			expect(labels.length).to.equal(2);
			expect(labels[0]).to.not.have.attr('hidden');
			expect(labels[1]).to.not.have.attr('hidden');
			expect(labels[0]).to.have.text('Start Date');
			expect(labels[1]).to.have.text('End Date');
		});

		it('renders both date pickers when enabled', async() => {
			expect(startDatePickerContainer).to.not.have.attr('hidden');
			expect(endDatePickerContainer).to.not.have.attr('hidden');
			expect(startDatePicker).to.exist;
			expect(endDatePicker).to.exist;
		});
	});

	describe('hidden', function() {
		beforeEach(async() => {
			dates.setCanEditDates(false);
			await elementUpdated(el);
		});

		it('hides both labels if not allowed to edit', async() => {
			expect(labels.length).to.equal(2);
			expect(labels[0]).to.have.attr('hidden');
			expect(labels[1]).to.have.attr('hidden');
		});

		it('hides both date pickers if not allowed to edit', async() => {
			expect(startDatePickerContainer).to.have.attr('hidden');
			expect(endDatePickerContainer).to.have.attr('hidden');
		});
	});

	describe('dates', function() {
		it('displays dates', async() => {
			expect(startDatePicker).to.have.attr('datetime', '2020-02-24T04:59:00.000Z');
			expect(endDatePicker).to.have.attr('datetime', '2020-02-26T04:59:00.000Z');
		});

		it('displays updated dates on change', async() => {
			dates.setStartDate('2020-02-25T04:59:00.000Z');
			dates.setEndDate('2020-02-27T04:59:00.000Z');
			await elementUpdated(el);

			expect(startDatePicker).to.have.attr('datetime', '2020-02-25T04:59:00.000Z');
			expect(endDatePicker).to.have.attr('datetime', '2020-02-27T04:59:00.000Z');
		});
	});
});
