const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-view-toggle', function() {

	const visualDiff = new VisualDiff('view-toggle', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 800 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-view-toggle.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	['invalid', 'undefined', 'activities', 'submissions'].forEach((name) => {
		it(name, async function() {
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});
	describe('switch', () => {
		it('to-activities', async function() {
			await page.evaluate(() => {
				document.querySelector('#submissions d2l-quick-eval-view-toggle')._selectActivities();
			});
			const rect = await visualDiff.getRect(page, '#submissions');
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
		it('to-submissions', async function() {
			await page.evaluate(() => {
				document.querySelector('#activities d2l-quick-eval-view-toggle')._selectSubmissions();
			});
			const rect = await visualDiff.getRect(page, '#activities');
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});
});
