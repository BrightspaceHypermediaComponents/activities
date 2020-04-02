const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-activity-card-action-button', function() {

	const visualDiff = new VisualDiff('activity-card-action-button', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-activity-card-action-button.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
		await visualDiff.disableAnimations(page);
	});

	after(() => browser.close());

	[
		'text-and-icon',
		'button-disabled',
		'icon-only',
		'text-only',
		'tall-height'
	].forEach((name) => {
		describe(name, () => {
			[ 'normal', 'hover', 'focus' ].forEach((state) => {
				it(state, async function() {
					switch (state) {
						case 'hover':
							await page.hover(`.${name}`);
							break;
						case 'focus':
							await page.focus(`.${name}`);
							break;
					}
					const rect = await visualDiff.getRect(page, `#${name}`);
					await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
				});
			});
		});
	});
	//Screen width <900px
	[
		'text-and-icon',
		'tall-height'
	].forEach((name) => {
		describe(`${name}-small-screen-width`, () => {
			[ 'normal', 'hover', 'focus' ].forEach((state) => {
				it(state, async function() {
					switch (state) {
						case 'hover':
							await page.hover(`.${name}`);
							break;
						case 'focus':
							await page.focus(`.${name}`);
							break;
					}
					await page.setViewport({width: 899, height: 800, deviceScaleFactor: 2});
					const rect = await visualDiff.getRect(page, `#${name}`);
					await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
				});
			});
		});
	});
});
