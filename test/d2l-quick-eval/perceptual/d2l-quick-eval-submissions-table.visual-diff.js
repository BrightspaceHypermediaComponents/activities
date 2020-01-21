const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-submissions-table', function() {

	const visualDiff = new VisualDiff('submissions-table', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-submissions-table.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	it ('basic', async function() {
		const rect = await visualDiff.getRect(page, '#basic');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	['with-data', 'master-teacher'].forEach((name) => {
		it(name, async function() {
			await populate(page, name);
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

	async function populate(page, name) {
		await page.evaluate((n) =>
		{
			const table = document.querySelector(`#${n} d2l-quick-eval-submissions-table`);
			table.shadowRoot.querySelectorAll('d2l-profile-image').forEach((dpi) => {
				dpi._loading = false;
			});
			table.shadowRoot.querySelectorAll('d2l-activity-name').forEach((dan, index) => {
				dan._activityName = `Activity ${index + 1}`;
				dan._activityIcon = 'd2l-tier1:quizzing';
			});
			// Boolean property that defaults to true cannot be set to false in the html.
			table.showLoadingSkeleton = false;
			// We could bind this in the html, but it's quite large and should be the same for all.
			table._headerColumns = [
				{
					key: 'displayName',
					meta: { firstThenLast: true },
					headers: [
						{ key: 'firstName', sortClass: 'first-name', suffix: ',', canSort: false, sorted: false, desc: false },
						{ key: 'lastName', sortClass: 'last-name', canSort: false, sorted: false, desc: false }
					]
				},
				{
					key: 'activityName',
					headers: [{ key: 'activityName', sortClass: 'activity-name', canSort: false, sorted: false, desc: false }]
				},
				{
					key: 'courseName',
					headers: [{ key: 'courseName', sortClass: 'course-name', canSort: false, sorted: false, desc: false }]
				},
				{
					key: 'submissionDate',
					headers: [{ key: 'submissionDate', sortClass: 'completion-date', canSort: false, sorted: false, desc: false }]
				},
				{
					key: 'masterTeacher',
					headers: [{ key: 'masterTeacher', sortClass: 'primary-facilitator', canSort: false, sorted: false, desc: false }]
				}
			];
		}, name);
	}
});
