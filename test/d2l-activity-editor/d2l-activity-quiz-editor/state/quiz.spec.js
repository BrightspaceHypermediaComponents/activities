import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { Quiz } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/quizzes/QuizEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Quiz', function() {
	afterEach(() => {
		sinon.restore();
		QuizEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		QuizEntity.mockImplementation(() => {
			return {
				name: () => 'Homework 101',
				canEditName: () => true,
				canEditPreventMovingBackwards: () => true,
				isPreventMovingBackwardsEnabled: () => false,
				canEditShuffle: () => true,
				isShuffleEnabled: () => false,
				canEditHints: () => true,
				getHintsToolEnabled: () => false,
				canEditDisableRightClick: () => true,
				isDisableRightClickEnabled: () => false,
				canEditDisablePagerAndAlerts: () => true,
				isDisablePagerAndAlertsEnabled: () => false,
				isAutoSetGradedEnabled: () => false,
				canEditAutoSetGraded: () => true,
				canEditNotificationEmail: () => true,
				notificationEmail: () => 'hello@d2l.com',
				previewHref: () => 'http://test.desire2learn.d2l/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6606&qi=46&isprv=1&fromQB=1&bp=1',
				attemptsHref: () => 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/attempts?workingCopyId=4321',
				timingHref: () => 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234',
				ipRestrictionsHref: () => 'https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip',
				canEditPassword: () => true,
				password: () => 'hello',
				canPreviewQuiz: () => true,
				descriptionEditorHtml: () => 'This is a description',
				canEditDescription: () => true,
				descriptionIsDisplayed: () => true,
				originalDescriptionIsEmpty: () => true,
				descriptionRichTextEditorConfig: () => {},
				headerEditorHtml: () => 'This is an header',
				headerIsDisplayed: () => true,
				canEditHeader: () => true,
				headerRichTextEditorConfig: () => { },
				originalHeaderIsEmpty: () => false,
				introIsAppendedToDescription: () => {},
				activityTypes: () => []
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		expect(quiz.name).to.equal('Homework 101');
		expect(quiz.canEditName).to.equal(true);
		expect(quiz.canEditShuffle).to.equal(true);
		expect(quiz.isShuffleEnabled).to.equal(false);
		expect(quiz.canEditHints).to.equal(true);
		expect(quiz.hintsToolEnabled).to.equal(false);
		expect(quiz.canEditDisableRightClick).to.equal(true);
		expect(quiz.isDisableRightClickEnabled).to.equal(false);
		expect(quiz.canEditDisablePagerAndAlerts).to.equal(true);
		expect(quiz.isDisablePagerAndAlertsEnabled).to.equal(false);
		expect(quiz.canEditPreventMovingBackwards).to.equal(true);
		expect(quiz.isPreventMovingBackwardsEnabled).to.equal(false);
		expect(quiz.isPreventMovingBackwardsEnabled).to.equal(false);
		expect(quiz.isAutoSetGradedEnabled).to.equal(false);
		expect(quiz.notificationEmail).to.equal('hello@d2l.com');
		expect(QuizEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(QuizEntity.mock.calls[0][1]).to.equal('token');
		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(quiz.attemptsHref).to.equal('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/attempts?workingCopyId=4321');
		expect(quiz.previewHref).to.equal('http://test.desire2learn.d2l/d2l/lms/quizzing/user/quiz_summary.d2l?ou=6606&qi=46&isprv=1&fromQB=1&bp=1');
		expect(quiz.timingHref).to.equal('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/22/timing?workingCopyId=1234');
		expect(quiz.ipRestrictionsHref).to.equal('https://afe99802-9130-4320-a770-8d138b941e74.quizzes.api.proddev.d2l/6606/quizzes/37/ip');
		expect(quiz.canPreviewQuiz).to.equal(true);
		expect(quiz.description).to.equal('This is a description');
		expect(quiz.descriptionIsDisplayed).to.equal(true);
		expect(quiz.header).to.equal('This is an header');
		expect(quiz.originalHeaderIsEmpty).to.equal(false);
	});

	it('setName', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setName('No Homework');

		expect(quiz.name).to.equal('No Homework');
	});

	it('setPreventMovingBackwards', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setPreventMovingBackwards(true);

		expect(quiz.isPreventMovingBackwardsEnabled).to.equal(true);
	});

	it('setShuffle', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setShuffle(true);

		expect(quiz.isShuffleEnabled).to.equal(true);
	});

	it('setHintsToolEnabled', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setHintsToolEnabled(true);

		expect(quiz.hintsToolEnabled).to.equal(true);
	});

	it('setDisablePagerAndAlerts', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setDisablePagerAndAlertsTool(true);

		expect(quiz.isDisablePagerAndAlertsEnabled).to.equal(true);
	});

	it('setDisableRightClick', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setDisableRightClick(true);

		expect(quiz.isDisableRightClickEnabled).to.equal(true);
	});

	it('setNotificationEmail', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		const notificationEmail = 'modified@email.com';
		quiz.setNotificationEmail(notificationEmail);

		expect(quiz.notificationEmail).to.equal(notificationEmail);
	});

	it('setPassword', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		const password = 'super-secret-password';
		quiz.setPassword(password);

		expect(quiz.password).to.equal(password);
	});

	it('setAutoSetGraded', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		quiz.setAutoSetGraded(true);

		expect(quiz.isAutoSetGradedEnabled).to.equal(true);
	});

	it('setDescription', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		quiz.setDescription('New description');

		expect(quiz.description).to.equal('New description');
	});

	it('setHeader', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		quiz.setHeader('New header');

		expect(quiz.header).to.equal('New header');
	});
});
