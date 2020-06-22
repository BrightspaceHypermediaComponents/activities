import sinon from 'sinon';

class HypermediaEntity {

	get properties() {
		return {
			submissionType: {
				value: '1', title: 'first submission type'
			}
		};
	}

	hasActionByName() {}

	getSubEntityByRel() {
		// return {
		// 	getActionByName: () => {
		// 		return {
		// 			hasFieldByName: () => true,
		// 			getFieldByName: () => {
		// 				return {
		// 					value: [
		// 						{
		// 							value: 1,
		// 							title: 'completion type 1'
		// 						}
		// 					]
		// 				};
		// 			},
		// 		};
		// 	},
		// 	getSubEntityByRel: () => {},
		// 	hasActionByName: () => true,
		// 	hasClass: () => true,
		// 	properties: {
		// 		url: ''
		// 	}
		// };

		return {}
	}

	hasSubEntityByRel() {
		// return { hasActionByName: () => true };
	}

	hasLinkByRel() {}

	getLinkByRel() {
	}

	getActionByName() {
		// return {
		// 	hasFieldByName: () => true,
		// 	getFieldByName: () => {
		// 		return {
		// 			value: [
		// 				{
		// 					value: 1, title: 'first submission type'
		// 				},
		// 				{
		// 					value: 2, title: 'second submission type'
		// 				}
		// 			]
		// 		};
		// 	}
		// };
	}

	hasClass() {}

	hasFieldByName() {}
};

export default function createHypermediaEntityStub() {

	const stub = sinon.createStubInstance(HypermediaEntity);

	// stub.getProperties.returns();
	stub.hasActionByName.returns(true);
	stub.getSubEntityByRel.returns(sinon.createStubInstance(HypermediaEntity));
	stub.hasSubEntityByRel.returns(true);
	stub.hasLinkByRel.returns(true);
	stub.getLinkByRel.returns('http://stub');
	stub.getActionByName.returns({
		hasFieldByName: () => true,
		getFieldByName: () => {
			return {
				value: [
					{
						value: 1, title: 'first submission type'
					},
					{
						value: 2, title: 'second submission type'
					}
				]
			};
		}
	});

	return stub;
}
