suite('d2l-quick-eval-refresh-behavior', function() {

	let component;
	let fetch, oldFetch;

	setup(function() {
		component = fixture('basic');

		oldFetch = window.D2L.Siren.EntityStore.fetch;
		fetch = sinon.stub();
		window.D2L.Siren.EntityStore.fetch = fetch;
	});

	teardown(function() {
		window.D2L.Siren.EntityStore.fetch = oldFetch;
	});

	test('calling refresh fetches self href and updates entity with result', function() {
		const entity = sinon.spy();
		const token = sinon.spy();
		component.entity = entity;
		component.token = token;

		const selfHref = sinon.spy();

		const selfLinkStub = sinon.stub();
		selfLinkStub.withArgs(entity).returns(selfHref);
		component._getSelfLink = selfLinkStub;

		const response = { entity: {} };

		fetch.withArgs(selfHref, token, true).resolves(response);

		return component.refresh().then(() => {
			assert.strictEqual(component.entity, response.entity);
		});
	});
});
