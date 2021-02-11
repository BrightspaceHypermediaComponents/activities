const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe.skip('d2l-quick-eval-submissions-table', function() {

	const visualDiff = new VisualDiff('submissions-table', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 800 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-submissions-table.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	after(() => browser.close());

	it ('basic', async function() {
		const rect = await visualDiff.getRect(page, '#basic');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	['with-data', 'master-teacher', 'course-level', 'course-master'].forEach((name) => {
		it(name, async function() {
			await populate(page, name, name.includes('master'), name.includes('course'));
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

	async function populate(page, name, masterTeacher, courseLevel) {
		await page.evaluate((n, m, c) =>
		{
			const table = document.querySelector(`#${n} d2l-quick-eval-submissions-table`);
			// Boolean property that defaults to true cannot be set to false in the html.
			table.showLoadingSkeleton = false;
			const headers = [];
			headers.push({
				key: 'displayName',
				meta: { firstThenLast: true },
				headers: [
					{ key: 'firstName', sortClass: 'first-name', suffix: ',', canSort: false, sorted: false, desc: false },
					{ key: 'lastName', sortClass: 'last-name', canSort: false, sorted: false, desc: false }
				],
				type: 'user',
				widthOverride: m ? 25 : 30
			});
			headers.push({
				key: 'activityName',
				headers: [{ key: 'activityName', sortClass: 'activity-name', canSort: false, sorted: false, desc: false }],
				type: 'activity-name',
				truncated: true
			});
			if (!c) {
				headers.push({
					key: 'courseName',
					headers: [{ key: 'courseName', sortClass: 'course-name', canSort: false, sorted: false, desc: false }],
					type: 'none',
					truncated: true
				});
			}
			headers.push({
				key: 'localizedSubmissionDate',
				headers: [{ key: 'submissionDate', sortClass: 'completion-date', canSort: false, sorted: false, desc: false }],
				type: 'none',
				widthOverride: m ? 15 : 20
			});
			if (m) {
				headers.push({
					key: 'masterTeacher',
					headers: [{ key: 'masterTeacher', sortClass: 'primary-facilitator', canSort: false, sorted: false, desc: false }],
					type: 'none'
				});
			}

			table.headerColumns = headers;

			table._data = [
				{
					isDraft: true,
					userHref: 'data/user.json',
					activityNameHref: 'data/activity.json',
					courseName: 'Course 1',
					localizedSubmissionDate: '2019-01-01',
					displayName: {
						firstName:' first',
						lastName: 'last',
						defaultDisplayName: 'first last'
					},
					masterTeacher: 'Master Teacher'
				},
				{
					isDraft: false,
					userHref: 'data/user.json',
					activityNameHref: 'data/activity.json',
					courseName: 'Course 2',
					localizedSubmissionDate: '2019-02-02',
					displayName: {
						firstName: 'first',
						lastName: 'last',
						defaultDisplayName: 'first last'
					},
					masterTeacher: 'Master Teacher'
				},
				{
					isDraft: false,
					userHref: 'data/user.json',
					activityNameHref: 'data/activity.json',
					courseName: 'This is a really long course name that really should truncate with an ellipsis because it is way too long.',
					localizedSubmissionDate: '2019-02-02',
					displayName: {
						firstName: 'first',
						lastName: 'last',
						defaultDisplayName: 'first last'
					},
					masterTeacher: 'Master Teacher'
				}
			];
		}, name, masterTeacher, courseLevel);

		// There's a delay after the data is set before we can select the table elements from the shadowRoot.
		await page.waitFor((n) => !!(document.querySelector(`#${n} d2l-quick-eval-submissions-table`).shadowRoot.querySelector('d2l-profile-image')), {}, name);
		await page.evaluate((n) => {
			const table = document.querySelector(`#${n} d2l-quick-eval-submissions-table`);
			table.shadowRoot.querySelectorAll('d2l-profile-image').forEach((dpi) => {
				dpi._loading = false;
			});
			table.shadowRoot.querySelectorAll('d2l-activity-name').forEach((dan, index) => {
				if (index === table._data.length - 1) {
					dan._activityName = 'This is a really long activity name that really should truncate with an ellipsis because it is way too long.';
				} else {
					dan._activityName = `Activity ${index + 1}`;
				}
				dan._activityIcon = 'd2l-tier1:quizzing';
			});
		}, name);
	}
});
