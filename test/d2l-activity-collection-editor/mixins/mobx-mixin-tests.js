import { defineCE, expect, fixture } from '@open-wc/testing';
import { MobxMixin } from '../../../components/d2l-activity-collection-editor/mixins/MobxMixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class StateSample { }

const basic = defineCE(
	class MobxMixinComponent extends MobxMixin(MobxLitElement) {
		constructor() {
			super();
			this._setStateType(StateSample);
		}
	}
);

class MobxComponentNoType extends MobxMixin(MobxLitElement) {
	constructor() {
		super();
	}
}

describe('MobxMixin', () => {
	describe('Single component using state', () => {
		let component;
		beforeEach(async() => {
			component = await fixture(`<${basic}></${basic}>`);
		});
		it('creates the state', () => {
			expect(component._state).to.exist;
		});

		it('deletes the state', () => {
			component.remove();
			expect(component._state).to.be.null;
		});

		it('makes a new state when href and token change', async() => {
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
		beforeEach(async() => {
			firstComp = await fixture(`<${basic}></${basic}>`);
			secondComp = await fixture(`<${basic}></${basic}>`);
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

		it('deletes the state when all components are removed', async() => {
			const thirdComp = await fixture(`<${basic}></${basic}>`);
			thirdComp._state.item = true;
			secondComp.remove();
			expect(firstComp._state.item).to.be.true;
			firstComp.remove();
			thirdComp.remove();
			expect(firstComp._state).to.be.null;
		});
	});
});
