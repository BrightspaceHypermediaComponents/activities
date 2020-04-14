import { MobxComponentNoType } from '../utilities/mobx-mixin.js';

describe('MobxMixin', () => {
	describe('Single component using state', () => {
		it('creates the state', () => {
			const component = fixture('mobx-basic');
			expect(component._state).to.exist;
		});

		it('deletes the state', () => {
			const component = fixture('mobx-basic');
			component.remove();
			expect(component._state).to.be.null;
		});

		it('makes a new state when href and token change', async() => {
			const component = fixture('mobx-basic');
			component._state.extra = 'Added property';
			component.href = 'http://1';
			component.token = 'someToken';
			await component.updateComplete;
			expect(component._state.extra).to.be.undefined;
		});

		it('throws an error when state type is not a class', () => {
			expect(function() {
				(new MobxComponentNoType())._makeState();
			}).to.throw();
		});
	});

	describe('Multiple components sharing a state', () => {
		let firstComp, secondComp;
		beforeEach(() => {
			firstComp = fixture('mobx-basic');
			secondComp = fixture('mobx-uses-shared');
		});

		it('changes the state for two components', () => {
			firstComp._state.item = true;
			expect(secondComp._state.item).to.be.true;
		});

		it('does not delete the state when a component is removed', () => {
			firstComp._state.item = true;
			firstComp.remove();
			expect(firstComp._state).to.be.null;
			expect(secondComp._state).to.exist;
			expect(secondComp._state.item).to.be.true;
		});

		it('deletes the state when all components are removed', () => {
			const thirdComp = fixture('mobx-third-shared');
			thirdComp._state.item = true;
			secondComp.remove();
			expect(firstComp._state.item).to.be.true;
			firstComp.remove();
			thirdComp.remove();
			expect(firstComp._state).to.be.null;
		});
	});
});
