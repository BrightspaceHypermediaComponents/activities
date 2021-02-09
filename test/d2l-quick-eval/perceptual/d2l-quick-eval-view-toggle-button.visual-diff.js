const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-view-toggle-button', function() {

	const visualDiff = new VisualDiff('view-toggle-button', __dirname);

	let browser, page;

	beforeEach(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 800 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-view-toggle-button.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	afterEach(() => browser.close());

	['basic', 'right', 'left', 'selected'].forEach((name) => {
		describe(name, () => {
			[ 'normal', 'hover', 'focus', 'click' ].forEach((state) => {
				it(state, async function() {
					const selector = `#${name} d2l-quick-eval-view-toggle-button`;
					switch (state) {
						case 'hover':
							await page.hover(selector);
							break;
						case 'focus':
							await focus(page, selector);
							break;
						case 'click':
							await page.click(selector);
							break;
					}
					await new Promise(resolve => setTimeout(resolve, 100));
					const rect = await visualDiff.getRect(page, `#${name}`);
					await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
				});
			});
		});
	});

	async function focus(page, selector) {
		await page.evaluate((selector) => {
			document.querySelector(selector).shadowRoot.querySelector('button').focus();
		}, selector);
	}
});
