import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-activities-list', function() {
	let list;
	const expectedCourses = [
		{
			name: 'Org Name',
			activities: [
				{
					courseName: 'Org Name',
					activityNameHref: 'data/assignmentActivity.json',
					assigned: 21,
					completed: 22,
					published: 23,
					evaluated: 24,
					newSubmissions: 25,
					resubmitted: 26,
					dueDate: '2019-03-03T03:03:03.003Z',
					activityType: 'assignment'
				},
				{
					courseName: 'Org Name',
					activityNameHref: 'data/quizActivity.json',
					assigned: 11,
					completed: 12,
					published: 13,
					evaluated: 14,
					newSubmissions: 15,
					resubmitted: 16,
					dueDate: '2019-02-02T02:02:02.002Z',
					activityType: 'quiz'
				},
				{
					courseName: 'Org Name',
					activityNameHref: 'data/topicActivity.json',
					assigned: 1,
					completed: 2,
					published: 3,
					evaluated: 4,
					newSubmissions: 5,
					resubmitted: 6,
					dueDate: '2019-01-01T01:01:01.001Z',
					activityType: 'discussion'
				}
			]
		},
		{
			name: 'Org Name 2',
			activities: [
				{
					courseName: 'Org Name 2',
					activityNameHref: 'data/assignmentActivity.json',
					assigned: 21,
					completed: 22,
					published: 23,
					evaluated: 24,
					newSubmissions: 25,
					resubmitted: 26,
					dueDate: '2019-03-03T03:03:03.003Z',
					activityType: 'assignment'
				},
				{
					courseName: 'Org Name 2',
					activityNameHref: 'data/quizActivity.json',
					assigned: 11,
					completed: 12,
					published: 13,
					evaluated: 14,
					newSubmissions: 15,
					resubmitted: 16,
					dueDate: '2019-02-02T02:02:02.002Z',
					activityType: 'quiz'
				},
				{
					courseName: 'Org Name 2',
					activityNameHref: 'data/topicActivity.json',
					assigned: 1,
					completed: 2,
					published: 3,
					evaluated: 4,
					newSubmissions: 5,
					resubmitted: 6,
					dueDate: '2019-01-01T01:01:01.001Z',
					activityType: 'discussion'
				}
			]
		}
	];

	setup(function() {
		list = fixture('basic');
	});
	test('instantiating the element works', function() {
		assert.equal(list.tagName.toLowerCase(), 'd2l-quick-eval-activities-list');
	});
	test('attributes are set correctly', function() {
		assert.equal(list.token, 't');
	});
	test('data displays correctly', function(done) {
		list.courses = expectedCourses;
		window.requestAnimationFrame(function() {
			const elements = list.shadowRoot.querySelectorAll('h2, d2l-quick-eval-activity-card');
			let element = 0;
			for (let i = 0; i < expectedCourses.length; i++) {
				const c = expectedCourses[i];
				assert.equal(elements[element].tagName.toLowerCase(), 'h2');
				assert.equal(elements[element].innerHTML, c.name);
				element++;
				for (let j = 0; j < c.activities.length; j++) {
					const card = elements[element];
					const a = c.activities[j];
					assert.equal(card.tagName.toLowerCase(), 'd2l-quick-eval-activity-card');
					assert.equal(card.assigned, a.assigned);
					assert.equal(card.completed, a.completed);
					assert.equal(card.published, a.published);
					assert.equal(card.evaluated, a.evaluated);
					assert.equal(card.newSubmissions, a.newSubmissions);
					assert.equal(card.resubmitted, a.resubmitted);
					assert.equal(card.dueDate, a.dueDate);
					assert.equal(card.activityType, a.activityType);
					assert.equal(card.activityNameHref, a.activityNameHref);
					assert.equal(card.token, list.token);
					element++;
				}
			}
			done();
		});
	});
});
