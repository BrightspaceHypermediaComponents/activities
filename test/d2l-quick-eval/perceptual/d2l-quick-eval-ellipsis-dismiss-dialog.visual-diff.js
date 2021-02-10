const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe.skip('d2l-quick-eval-ellipsis-dialog', function() {

	const visualDiff = new VisualDiff('ellipsis-dialog', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 800 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-ellipsis-dismiss-dialog.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	const exampleData = [
		{ type: 'quiz', name: 'Activity 1', course: 'Course 1', dismissedDate: '2019-01-01' },
		{ type: 'assignment', name: 'Activity 2', course: 'Course 1', dismissedDate: '2019-02-02' },
		{ type: 'discussion', name: 'Activity 3', course: 'Course 2', dismissedDate: '2019-03-03' }
	];

	async function waitForOpen(element) {
		await page.evaluate((element) => {
			return new Promise((resolve) => {
				const el = document.querySelector(element);
				const onEnd = function() {
					el.removeEventListener('d2l-dialog-open', onEnd);
					resolve();
				};
				el.addEventListener('d2l-dialog-open', onEnd);
				el.opened = true;
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
				el.opened = false;
			});
		}, element);
	}

	it('empty-list', async function() {
		await waitForOpen('#default d2l-quick-eval-ellipsis-dialog');
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-ellipsis-dialog');
	});

	it('items-in-list', async function() {
		await page.evaluate((ex) => {
			const dialog = document.querySelector('#default d2l-quick-eval-ellipsis-dialog');
			dialog.dismissedActivities = ex;
		}, exampleData);
		await waitForOpen('#default d2l-quick-eval-ellipsis-dialog');
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-ellipsis-dialog');
	});

	it('item-checked', async function() {
		await waitForOpen('#default d2l-quick-eval-ellipsis-dialog');
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-ellipsis-dialog');
			const list = dialog.shadowRoot.querySelector('d2l-quick-eval-dismissed-activities-list');
			const item = list.shadowRoot.querySelectorAll('d2l-list-item')[1];
			item.shadowRoot.querySelector('label').click();
		});
		await new Promise(resolve => setTimeout(resolve, 100));
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-ellipsis-dialog');
	});
});
