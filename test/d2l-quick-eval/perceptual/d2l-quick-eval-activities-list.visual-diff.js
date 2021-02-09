const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe.skip('d2l-quick-eval-activities-list', function() {

	const visualDiff = new VisualDiff('activities-list', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 800 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-activities-list.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	it ('basic', async function() {
		const rect = await visualDiff.getRect(page, '#basic');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('with-data', async function() {
		await populate(page, 'with-data');
		const rect = await visualDiff.getRect(page, '#with-data');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	async function populate(page, name) {
		await page.evaluate((n) =>
		{
			const list = document.querySelector(`#${n} d2l-quick-eval-activities-list`);
			list.shadowRoot.querySelectorAll('d2l-quick-eval-activity-card').forEach((ac) => {
				const dan = ac.shadowRoot.querySelector('d2l-activity-name');
				dan._activityName = ac.activityName;
				dan._activityIcon = `d2l-tier1:${ac.activityType === 'quiz' ? 'quizzing' : ac.activityType === 'discussion' ? 'discussions' : 'assignments'}`;
			});
		}, name);
	}
});
