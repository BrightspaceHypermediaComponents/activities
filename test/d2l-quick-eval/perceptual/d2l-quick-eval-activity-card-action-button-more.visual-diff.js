const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe.skip('d2l-quick-eval-activity-card-action-button-more', function() {

	const visualDiff = new VisualDiff('activity-card-action-button-more', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({ width: 900, height: 800, deviceScaleFactor: 2 });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-activity-card-action-button-more.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	const focus = (page, selector) => {
		return page.evaluate((selector) => {
			const button = document.querySelector(selector).shadowRoot.querySelector('d2l-quick-eval-activity-card-action-button');
			button.focus();
		}, selector);
	};

	describe('basic', () => {
		const name = 'basic';
		[ 'normal', 'hover', 'focus', 'click' ].forEach((state) => {
			it(state, async function() {
				switch (state) {
					case 'hover':
						await page.hover(`.${name}`);
						break;
					case 'focus':
						focus(page, `.${name}`);
						break;
					case 'click':
						await page.click(`.${name}`);
						await page.waitFor(2000);
						break;
				}
				const rect = await visualDiff.getRect(page, `#${name}`);
				await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
			});
		});
	});
});
