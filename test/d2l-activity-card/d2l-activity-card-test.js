import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
describe('d2l-activity-card', () => {

	var component,
		fetchStub,
		sandbox,
		activityEntity,
		organizationEntity,
		imageEntity,
		semesterEntity;

	const testActivityHref = '/activity/1',
		testOrganizationHref =  '/organization/1',
		testImageHref = '/organization/1/image/1',
		testSemesterHref = '/organization/1/semester/1',
		testCourseName = 'Course name',
		testSemester = 'Test Semester Name',
		testCourseCode = 'COURSE987',
		testActivityHomepage = 'test activity home page';

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match.has('url', sinon.match(url)))
			.returns(Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(entity); }
			}));
	}

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		activityEntity = window.D2L.Hypermedia.Siren.Parse({
			class:['activity'],
			links: [{
				rel: ['self'],
				href: testActivityHref
			}, {
				rel: ['https://api.brightspace.com/rels/organization'],
				href: testOrganizationHref
			}, {
				rel: ['https://activities.api.brightspace.com/rels/activity-homepage'],
				href: testActivityHomepage
			}]
		});
		organizationEntity = window.D2L.Hypermedia.Siren.Parse({
			class: ['active', 'course-offering'],
			properties: {
				name: testCourseName,
				code: testCourseCode,
				startDate: null,
				endDate: null,
				isActive: true
			},
			links: [
				{
					rel: ['self'],
					href: testOrganizationHref
				},
				{
					rel: ['https://api.brightspace.com/rels/parent-semester'],
					href: testSemesterHref
				}
			],
			entities: [
				{
					class: ['course-image'],
					rel: ['https://api.brightspace.com/rels/organization-image'],
					href: testImageHref
				}
			],
			actions: []
		});
		imageEntity = window.D2L.Hypermedia.Siren.Parse({
			rel: ['https://api.brightspace.com/rels/organization-image'],
			class: ['course-image'],
			propeties: {
				name: '1.jpg',
				type: 'image/jpeg'
			},
			links: [{
				rel: ['self'],
				href: testImageHref
			}, {
				rel: ['alternate'],
				class: ['tile', 'low-density', 'max'],
				href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
			}]
		});
		semesterEntity = window.D2L.Hypermedia.Siren.Parse({
			properties: {
				name: testSemester
			},
			links: [{
				rel: ['self'],
				href: testSemesterHref
			}]
		});
		fetchStub = sandbox.stub(window.d2lfetch, 'fetch');
		SetupFetchStub(/\/activity\/1$/, activityEntity);
		SetupFetchStub(/\/organization\/1$/, organizationEntity);
		SetupFetchStub(/\/organization\/1\/image\/1$/, imageEntity);
		SetupFetchStub(/\/organization\/1\/semester\/1$/, semesterEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		component = fixture('d2l-activity-card-empty-fixture');
		expect(component).to.exist;
	});

	[
		{
			name: 'Setting the href attribute',
			beforeEachFn: () => {
				component = fixture('d2l-activity-card-href-fixture');
				component.showOrganizationCode = true;
				component.showSemesterName = true;
			}
		},
		{
			name: 'Setting the entity attribute',
			beforeEachFn: () => {
				component = fixture('d2l-activity-card-empty-fixture');
				component.showOrganizationCode = true;
				component.showSemesterName = true;
				component.entity = activityEntity;
			}
		}
	].forEach((testCase) => {
		describe(testCase.name, () => {

			beforeEach(done => {
				testCase.beforeEachFn();
				afterNextRender(component, done);
			});

			it('should set the href', () => {
				expect(component.href).to.equal(testActivityHref);
			});

			it('should set entity', () => {
				expect(component.entity).to.equal(activityEntity);
			});

			it('should fetch the organization', () => {
				expect(component._organizationUrl).to.equal(testOrganizationHref);
			});

			it('should set the image entity', () => {
				expect(component._image).to.equal(imageEntity);
			});

			it('should set the activity homepage', () => {
				expect(component._activityHomepage).to.equal(testActivityHomepage);
			});

			it('should set card href to activity homepage', () => {
				const cardElement = component.shadowRoot.querySelector('d2l-card');
				expect(cardElement.href).to.equal(testActivityHomepage);
			});

			it('should show course code and semester', () => {
				setTimeout(function() {
					const organizationInfo = component.shadowRoot.querySelector('.d2l-activity-card-content-organization-info').shadowRoot.innerHTML;
					expect(organizationInfo).to.contain('Test Semester Name');
					expect(organizationInfo).to.contain('COURSE987');
				}, 2000);
			});

			it('accessible text contains name, code, and semester', () => {
				setTimeout(function() {
					expect(component._accessibilityText).to.contain(testCourseName);
					expect(component._accessibilityText).to.contain(testCourseCode);
					expect(component._accessibilityText).to.contain(testSemester);
				}, 2000);
			});
		});
	});

	describe('override click to get an event instead', () => {
		beforeEach((done) => {
			component = fixture('d2l-activity-card-href-click-fixture');
			afterNextRender(component, done);
		});

		it('should set card href to activity homepage', () => {
			const cardElement = component.shadowRoot.querySelector('d2l-card');
			expect(cardElement.href).to.equal(testActivityHomepage);
		});

		it('click event fired', (done) => {
			component.addEventListener('d2l-activity-card-clicked', (e) => {
				expect(e.detail.path).to.equal(testActivityHomepage);
				expect(e.detail.orgUnitId).to.equal('1');
				done();
			});
			const d2lCard = component.shadowRoot.querySelector('d2l-card');
			d2lCard.click();
		});
	});
});
