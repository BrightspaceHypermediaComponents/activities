const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-activity-card', function() {

	const visualDiff = new VisualDiff('activity-card', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 1900 } });
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
		const rect = await visualDiff.getRect(page, '#dismiss');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('hovered', async function() {
		page.hover('#hovered');
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
		await page.evaluate(() => {
			return new Promise(resolve => {
				const card = document.querySelector('#dismiss d2l-quick-eval-activity-card');
				//card.publishAll = null;
				const dropdown = card.shadowRoot.querySelector('d2l-quick-eval-activity-card-action-button-more')
					.shadowRoot.querySelector('d2l-dropdown');
				dropdown.addEventListener('d2l-dropdown-open', resolve, { once: true });
				dropdown.toggleOpen(false);
			});
		});
		const rect = await visualDiff.getRect(page, '#dismiss');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('dismiss-dropdown-publish-enabled', async function() {
		await page.setViewport({ width: 900, height: 1900, deviceScaleFactor: 2 });
		page.hover('#dismiss-with-publish d2l-quick-eval-activity-card');
		await page.evaluate(() => {
			return new Promise(resolve => {
				const dropdown = document.querySelector('#dismiss-with-publish d2l-quick-eval-activity-card')
					.shadowRoot.querySelector('d2l-quick-eval-activity-card-action-button-more')
					.shadowRoot.querySelector('d2l-dropdown');
				dropdown.addEventListener('d2l-dropdown-open', resolve, { once: true });
				dropdown.toggleOpen(false);
			});
		});
		const rect = await visualDiff.getRect(page, '#dismiss-with-publish');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});
});
