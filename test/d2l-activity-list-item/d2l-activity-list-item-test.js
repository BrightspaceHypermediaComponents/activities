import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
describe('d2l-activity-list-item', () => {

	var component,
		fetchStub,
		sandbox,
		activityEntity,
		organizationEntity,
		imageEntity;

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match.has('url', sinon.match(url)))
			.returns(Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(entity); }
			}));
	}

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		activityEntity = window.D2L.Hypermedia.Siren.Parse({
			class:['activity'],
			links: [{
				rel:['self'],
				href: '/activity/1'
			}, {
				rel:['https://api.brightspace.com/rels/organization'],
				href:'/organization/1'
			}, {
				rel:['https://activities.api.brightspace.com/rels/activity-homepage'],
				href:'#'
			}],
			actions:[{
				href:'/activity/1',
				name:'assign',
				method:'PUT'
			}]
		});
		organizationEntity = window.D2L.Hypermedia.Siren.Parse({
			class: ['active', 'course-offering'],
			properties: {
				name: 'Course name',
				code: 'COURSE100',
				startDate: null,
				endDate: null,
				isActive: true,
				description: '<p>Financial Planning & Analysis: Building a Company\'s Budget from Scratch guides you through the core principles of Financial Planning and helps you to understand how a company prepares its budget. The video lessons touch on several awesome. Ultra-Financial Planning & Analysis in the 20th Century: Building a Successful Budget</p>'
			},
			links: [{
				rel: ['self'],
				href: '/organizations/1'
			}],
			entities: [
				{
					class: ['course-image'],
					rel: ['https://api.brightspace.com/rels/organization-image'],
					href: '/organization/1/image/1'
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
				href: '/organization/1/image/1'
			}, {
				rel: ['alternate'],
				class: ['narrow', 'high-density', 'min'],
				href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
			}]
		});
		fetchStub = sandbox.stub(window.d2lfetch, 'fetch');
		SetupFetchStub(/\/activity\/1$/, activityEntity);
		SetupFetchStub(/\/organization\/1$/, organizationEntity);
		SetupFetchStub(/\/organization\/1\/image\/1$/, imageEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		component = fixture('d2l-activity-list-item-empty-fixture');
		expect(component).to.exist;
	});

	[
		{
			name: 'Setting the href attribute',
			beforeEachFn: () => {
				component = fixture('d2l-activity-list-item-href-fixture');
			}
		},
		{
			name: 'Setting the entity attribute',
			beforeEachFn: () => {
				component = fixture('d2l-activity-list-item-empty-fixture');
				component.entity = activityEntity;
			}
		}
	].forEach((testCase) => {
		describe(testCase.name, () => {
			let textLoadedSuccessfulSpy;

			beforeEach(done => {
				textLoadedSuccessfulSpy = sinon.spy();
				window.document.addEventListener('d2l-activity-text-loaded', textLoadedSuccessfulSpy);
				testCase.beforeEachFn();
				afterNextRender(component, done);
			});

			afterEach(() => {
				window.document.removeEventListener('d2l-activity-text-loaded', textLoadedSuccessfulSpy);
			});

			it('should set the href', () => {
				expect(component.href).to.equal('/activity/1');
			});

			it('should set entity', () => {
				expect(component.entity).to.equal(activityEntity);
			});

			it('should fetch the organization', () => {
				expect(component._organizationUrl).to.equal('/organization/1');
			});

			it('should set the image entity', () => {
				expect(component._image).to.equal(imageEntity);
			});

			it('should set the activity homepage', () => {
				expect(component._activityHomepage).to.equal('#');
			});

		});

		let handler;
		afterEach(() => {
			window.document.removeEventListener('d2l-activity-text-loaded', handler);
			window.document.removeEventListener('d2l-activity-image-loaded', handler);
		});

		it(testCase.name + 'should send text loaded event', done => {
			handler = () => {
				done();
			};
			window.document.addEventListener('d2l-activity-text-loaded', handler);
			testCase.beforeEachFn();
		});

		it(testCase.name + 'should send image loaded event', done => {
			handler = () => {
				done();
			};
			window.document.addEventListener('d2l-activity-image-loaded', handler);
			testCase.beforeEachFn();
		});
	});

	describe('Accessibility', () => {
		beforeEach(done => {
			component = fixture('d2l-activity-list-item-href-fixture');
			afterNextRender(component, done);
		});

		it('Organization', done => {
			component.fire('d2l-organization-accessible', {
				organization: {
					name: 'Course name'
				}
			});
			afterNextRender(component, () => {
				expect(component._accessibilityData.organizationName).to.equal('Course name');
				var accessibilityText = component.$$('.d2l-activity-list-item-link-text').innerHTML;
				expect(accessibilityText).to.contain('Course name');
				done();
			});
		});
	});

	describe('Responsive Behaviour', () => {
		it('Description is hidden at width 384', done => {
			component = fixture('d2l-activity-list-item-responsive-384-fixture');
			afterNextRender(component, () => {
				expect(component._showDescription).to.be.false;
				var description = component.$$('#d2l-activity-list-item-description');
				expect(description.hasAttribute('hidden')).to.be.true;
				done();
			});
		});

		it('Description is not hidden at width 385', done => {
			component = fixture('d2l-activity-list-item-responsive-385-fixture');
			expect(component._showDescription).to.be.true;
			var description = component.$$('#d2l-activity-list-item-description');
			expect(description.hasAttribute('hidden')).to.be.false;
			afterNextRender(component, () => {
				expect(component._showDescription).to.be.true;
				var description = component.$$('#d2l-activity-list-item-description');
				expect(description.hasAttribute('hidden')).to.be.false;
				done();
			});
		});
	});
});
