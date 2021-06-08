import '../../../components/d2l-activity-editor/d2l-activity-rubrics/d2l-activity-rubrics-list-wrapper.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ActivityUsage } from '../../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as activityUsageStore } from '../../../components/d2l-activity-editor/state/activity-store.js';
import { Assignment } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { shared as assignmentStore } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { AssociationCollection } from '../../../components/d2l-activity-editor/d2l-activity-rubrics/state/association-collection.js';
import { default as associationStore } from '../../../components/d2l-activity-editor/d2l-activity-rubrics/state/association-collection-store.js';
import { default as langTerms } from '../../../components/d2l-activity-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon';

describe('d2l-activity-rubrics-list-wrapper', function() {

	let href, token, associationCollection, assignment, activity;

	function _requestProviderMock(e) {
		e.detail.provider = 'Standards';
		e.stopPropagation();
	}

	async function loadComponent() {
		associationStore.put(href, associationCollection);
		assignmentStore.put(href, assignment);
		activityUsageStore.put(href, activity);

		return await fixture(
			html`
				<d2l-activity-rubrics-list-wrapper
					href=${href}
					activityUsageHref=${href}
					.token="${token}"
					assignmentHref=${href}
				>
				</d2l-activity-rubrics-list-wrapper>
			`
		);
	}

	before(async() => {
		window.addEventListener('d2l-request-provider', _requestProviderMock);
	});

	after(() => {
		window.removeEventListener('d2l-request-provider', _requestProviderMock);
	});

	beforeEach(async() => {
		href = 'http://activity/1';
		token = 'token';

		associationCollection = new AssociationCollection(href, token);
		associationCollection.defaultScoringRubricOptions = [];

		sinon.stub(associationCollection, 'fetchAssociations').callsFake(() =>
			[
				{
					isAssociated: true,
					isAssociating: false,
					isDeleting: false,
					entity: {
						canDeleteAssociation: sinon.stub().returns(true)
					}
				},
				{
					isAssociated: true,
					isAssociating: false,
					isDeleting: false,
					entity: {
						canDeleteAssociation: sinon.stub().returns(false)
					}
				}
			]
		);
		// associationCollection.addPotentialAssociationToMap(href, );

		assignment = new Assignment(href, token);
		assignment.canEditAnnotations = true;
		assignment.annotationToolsAvailable = false;

		activity = new ActivityUsage(href, token);
		activity.canEditCompetencies = true;
		activity.associationsHref = href;
	});

	afterEach(() => {
		associationCollection = undefined;
		associationStore.clear();
	});

	describe('constructor', () => {

		it('should construct', async() => {
			await loadComponent();
			runConstructor('d2l-activity-rubrics-list-wrapper');
		});

	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});

	it('has rubrics heading', async() => {
		const el = await loadComponent();
		const containerComponent = el.shadowRoot.querySelector('d2l-activity-rubrics-list-container');
		const container = await fixture(html`${containerComponent}`);

		const containerHeadingComponent = container.shadowRoot.querySelector('.d2l-rubric-heading-container');

		const rubricsHeading = containerHeadingComponent.querySelectorAll('.d2l-rubric-heading-title')[0];
		expect(rubricsHeading.innerText).to.equal(langTerms['rubrics.hdrRubrics']);
	});

	describe('Rubrics List Editor', () => {
		let el, containerComponent, container, rubricsListEditorComponent;
		beforeEach(async() => {
			el = await loadComponent();
			containerComponent = el.shadowRoot.querySelector('d2l-activity-rubrics-list-container');
			container = await fixture(html`${containerComponent}`);
			rubricsListEditorComponent = container.shadowRoot.querySelector('d2l-activity-rubrics-list-editor');
		});

		it('has rubrics list editor', async() => {
			const rubricsListEditor = await fixture(html`${rubricsListEditorComponent}`);

			const rubricComponent = rubricsListEditor.shadowRoot.querySelectorAll('.d2l-association-container > d2l-rubric')[0];
			expect(rubricComponent).to.not.be.null;

			const rubricIconComponent = rubricsListEditor.shadowRoot.querySelectorAll('.d2l-association-container > d2l-button-icon')[0];
			expect(rubricIconComponent.text).to.equal(langTerms['rubrics.txtDeleteRubric']);
			expect(rubricIconComponent.hidden).to.equal(false);
		});

		it('hides delete association button when canDeleteAssociation is false', async() => {
			const rubricsListEditor = await fixture(html`${rubricsListEditorComponent}`);

			const rubricComponent = rubricsListEditor.shadowRoot.querySelectorAll('.d2l-association-container > d2l-rubric')[1];
			expect(rubricComponent).to.not.be.null;

			const rubricIconComponent = rubricsListEditor.shadowRoot.querySelectorAll('.d2l-association-container > d2l-button-icon')[1];
			expect(rubricIconComponent.text).to.equal(langTerms['rubrics.txtDeleteRubric']);
			expect(rubricIconComponent.hidden).to.equal(true);
		});
	});

	describe('Rubrics Simple Overlay', () => {
		let el, containerComponent, container;

		beforeEach(async() => {
			el = await loadComponent();
			containerComponent = el.shadowRoot.querySelector('d2l-activity-rubrics-list-container');
			containerComponent._newlyCreatedPotentialAssociationHref = 'http://newref/2';
			container = await fixture(html`${containerComponent}`);
		});

		it('has rubric editor with correct attributes', async() => {
			const rubricEditor = await fixture(container._renderRubricEditor());
			expect(rubricEditor).to.not.equal(html``);
			expect(rubricEditor.getAttribute('title-dropdown-hidden')).to.not.be.null;
			expect(rubricEditor.getAttribute('outcomes-tool-integration-enabled')).to.not.be.null;
			expect(rubricEditor.getAttribute('outcomes-title')).to.equal('Standards');
			expect(rubricEditor.getAttribute('browse-outcomes-text')).to.equal('Standards');
			expect(rubricEditor.getAttribute('align-outcomes-text')).to.equal('Standards');
		});
	});
});
