import '../../components/d2l-activity-editor/d2l-activity-score-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActivityScoreGrade } from '../../components/d2l-activity-editor/state/activity-score-grade.js';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

function dispatchEvent(elem, eventType, composed) {
	const e = new Event(
		eventType,
		{ bubbles: true, cancelable: false, composed: composed }
	);
	elem.dispatchEvent(e);
}

describe('d2l-activity-score-editor', function() {

	let el, href, activity, score;

	beforeEach(async() => {
		score = new ActivityScoreGrade('token');
		await score.fetch({
			scoreOutOf: () => 50,
			inGrades: () => true,
			gradeType: () => 'Points',
			canEditScoreOutOf: () => true,
			canSeeGrades: () => true,
			canEditGrades: () => true,
			gradeHref: () => '',
			gradeCandidatesHref: () => '',
			newGradeCandidatesHref: () => undefined,
			isNewGradeCandidate: () => false,
			fetchLinkedScoreOutOfEntity: () => null
		});
		href = 'http://activity/1';

		activity = new ActivityUsage(href, 'token');
		activity.setScoreAndGrade(score);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-score-editor href=${href} token="token"></d2l-activity-score-editor>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('graded', () => {
		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders score out of input', async() => {
			expect(el.shadowRoot.querySelectorAll('#score-out-of')).to.exist;
			const input = el.shadowRoot.querySelector('#score-out-of');
			expect(input.value).to.equal('50');
		});

		it('does not render error', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-tooltip')).to.not.exist;
		});

		describe('can see grades', () => {
			it('renders grade menu', async() => {
				expect(el.shadowRoot.querySelectorAll('#grade-dropdown')).to.exist;
			});
		});
	});

	describe('ungraded', () => {
		beforeEach(async() => {
			score.setUngraded();
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders ungraded button', async() => {
			expect(el.shadowRoot.querySelectorAll('#ungraded')).to.exist;
		});

		it('does not render grade menu', async() => {
			expect(el.shadowRoot.querySelectorAll('#grade-dropdown')).to.not.exist;
		});
	});

	describe('errors', () => {
		beforeEach(async() => {
			score.setScoreOutOf('abc');
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders error', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-tooltip')).to.exist;
		});
	});

	describe('events', () => {
		it('updates score out of', async() => {
			const input = el.shadowRoot.querySelector('#score-out-of');
			input.value = '15';
			await elementUpdated(input);
			dispatchEvent(input, 'change', true);

			expect(score.scoreOutOf).to.equal('15');
		});

		it('sets ungraded', async() => {
			const menu = el.shadowRoot.querySelectorAll('d2l-menu-item')[2];
			dispatchEvent(menu, 'd2l-menu-item-select', true);

			expect(score.isUngraded).to.be.true;
		});

		it('removes from grades', async() => {
			const menu = el.shadowRoot.querySelectorAll('d2l-menu-item')[1];
			dispatchEvent(menu, 'd2l-menu-item-select', true);

			expect(score.inGrades).to.be.false;
		});

		it('adds to grades', async() => {
			score.removeFromGrades();
			await elementUpdated(el);

			const menu = el.shadowRoot.querySelectorAll('d2l-menu-item')[1];
			dispatchEvent(menu, 'd2l-menu-item-select', true);

			expect(score.inGrades).to.be.true;
		});
	});
});
