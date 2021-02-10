const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe.skip('d2l-quick-eval-action-dismiss-dialog', function() {

	const visualDiff = new VisualDiff('action-dismiss-dialog', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 800 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-action-dismiss-dialog.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	async function waitForOpen(element) {
		await page.evaluate((element) => {
			return new Promise((resolve) => {
				const el = document.querySelector(element);
				const onEnd = function() {
					el.removeEventListener('d2l-dialog-open', onEnd);
					resolve();
				};
				el.addEventListener('d2l-dialog-open', onEnd);
				el.open();
			});
		}, element);
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	async function waitForClose(element) {
		await page.evaluate((element) => {
			return new Promise((resolve) => {
				const el = document.querySelector(element);
				const onEnd = function() {
					el.removeEventListener('d2l-dialog-close', onEnd);
					resolve();
				};
				el.addEventListener('d2l-dialog-close', onEnd);
				el.shadowRoot.querySelector('d2l-dialog')._close();
			});
		}, element);
	}

	it('default', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});

	it('forever', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const forever = dialog.shadowRoot.querySelector('#dismiss-action-dialog-radio-input-forever');
			forever.click();
		});
		await new Promise(resolve => setTimeout(resolve, 100));
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});

	it('specific-date', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const specDate = dialog.shadowRoot.querySelector('#dismiss-action-dialog-radio-input-specificDate');
			specDate.click();
		});
		await new Promise(resolve => setTimeout(resolve, 100));
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});

	it('next-submission', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const nextSub = dialog.shadowRoot.querySelector('#dismiss-action-dialog-radio-input-nextSubmission');
			nextSub.click();
		});
		await new Promise(resolve => setTimeout(resolve, 100));
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});
});
