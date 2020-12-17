const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-activity-card', function() {

	const visualDiff = new VisualDiff('activity-card', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({ width: 900, height: 1900, deviceScaleFactor: 2 });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-activity-card.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	[
		'quiz',
		'assignment',
		'discussion',
		'no-completed',
		'rtl',
		'indicator-pressed',
		'publish-all-disabled',
	].forEach((name) => {
		it(name, async function() {
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

	it ('dismiss', async function() {
		// The differences between this and the "regular" card is only in the buttons which only appear on hover.
		page.hover('#dismiss d2l-quick-eval-activity-card');
		await page.waitFor(2000);
		const rect = await visualDiff.getRect(page, '#dismiss');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('hovered', async function() {
		page.hover('#hovered');
		await page.waitFor(2000);
		const rect = await visualDiff.getRect(page, '#hovered');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('tablet-viewport', async function() {
		await page.setViewport({ width: 899, height: 3100, deviceScaleFactor: 2 });
		const rect = await visualDiff.getRect(page, '#tablet-viewport');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('dismiss-tablet-viewport', async function() {
		await page.setViewport({ width: 899, height: 3100, deviceScaleFactor: 2 });
		const rect = await visualDiff.getRect(page, '#dismiss');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('mobile-viewport', async function() {
		await page.setViewport({ width: 524, height: 3500, deviceScaleFactor: 2 });
		const rect = await visualDiff.getRect(page, '#mobile-viewport');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('dismiss-mobile-viewport', async function() {
		await page.setViewport({ width: 524, height: 3500, deviceScaleFactor: 2 });
		const rect = await visualDiff.getRect(page, '#dismiss');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('dismiss-dropdown-publish-disabled', async function() {
		await page.setViewport({ width: 900, height: 1900, deviceScaleFactor: 2 });
		page.hover('#dismiss d2l-quick-eval-activity-card');
		await page.waitFor(2000);
		await page.evaluate(() => {
			const card = document.querySelector('#dismiss d2l-quick-eval-activity-card');
			//card.publishAll = null;
			card
				.shadowRoot.querySelector('d2l-quick-eval-activity-card-action-button-more')
				.shadowRoot.querySelector('d2l-dropdown')
				.toggleOpen(false);
		});
		await page.waitFor(2000);
		const rect = await visualDiff.getRect(page, '#dismiss');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('dismiss-dropdown-publish-enabled', async function() {
		await page.setViewport({ width: 900, height: 1900, deviceScaleFactor: 2 });
		page.hover('#dismiss-with-publish d2l-quick-eval-activity-card');
		await page.waitFor(2000);
		await page.evaluate(() => {
			document.querySelector('#dismiss-with-publish d2l-quick-eval-activity-card')
				.shadowRoot.querySelector('d2l-quick-eval-activity-card-action-button-more')
				.shadowRoot.querySelector('d2l-dropdown')
				.toggleOpen(false);
		});
		await page.waitFor(2000);
		const rect = await visualDiff.getRect(page, '#dismiss-with-publish');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});
});
