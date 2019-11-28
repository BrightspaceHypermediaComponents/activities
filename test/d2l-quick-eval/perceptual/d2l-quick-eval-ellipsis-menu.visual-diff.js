const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-ellipsis-menu', function() {

	const visualDiff = new VisualDiff('ellipsis-menu', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-ellipsis-menu.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	[
		'default',
	].forEach((name) => {
		it(name, async function() {
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

	it('dropdown-opened', async function() {
		await page.click('#dropdown-opened d2l-quick-eval-ellipsis-menu');
		await page.waitFor(2000);
		const rect = await visualDiff.getRect(page, '#dropdown-opened');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('dialog-opened', async function() {
		await page.click('#dialog-opened d2l-quick-eval-ellipsis-menu');
		await page.waitFor(200);
		await page.evaluate(() => {
			document.querySelector('#dialog-opened d2l-quick-eval-ellipsis-menu').shadowRoot.querySelector('d2l-quick-eval-ellipsis-dialog').opened = true;
		});
		await page.waitFor(200);
		const rect = await visualDiff.getRect(page, 'body');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
