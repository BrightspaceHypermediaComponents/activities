const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-widget', function() {

	const visualDiff = new VisualDiff('d2l-quick-eval-widget', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 2 });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval-widget/perceptual/d2l-quick-eval-widget.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	[
		'default',
		'limits-count',
		'error-message',
		'no-submissions'
	].forEach((name) => {
		it(name, async function() {
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});
});
