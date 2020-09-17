import SirenParse from 'siren-parser';

(function() {
	let component;

	suite('d2l-quick-eval-siren-helper-behavior', function() {
		setup(function() {
			component = fixture('basic');
		});
		suite('_tryGetName', function() {
			test('_tryGetName returns default value when subentity has class "default-name"', () => {
				const nameRel = 'nameRel';
				const expectedName = 'defaultValue';

				const userEntity = {
					'entities': [
						{
							'class': ['default-name'],
							'rel': [ nameRel ],
							'properties': {
								'name': 'someName'
							}
						}
					]
				};

				const name = component._tryGetName(SirenParse(userEntity), nameRel, expectedName);
				assert.equal(name, expectedName);
			});
			test('_tryGetName returns expected name value name subentity is valid', () => {
				const nameRel = 'nameRel';
				const expectedName = 'expectedName';

				const userEntity = {
					'entities': [
						{
							'class': [],
							'rel': [ nameRel ],
							'properties': {
								'name': expectedName
							}
						}
					]
				};

				const name = component._tryGetName(SirenParse(userEntity), nameRel, 'defaultValue');
				assert.equal(name, expectedName);
			});
		});
	});
})();
