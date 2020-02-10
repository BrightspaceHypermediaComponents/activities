export async function fetchEntity(href, token) {
	let entity = await window.D2L.Siren.EntityStore.get(href, token);
	if (!entity) {
		const fetched = await window.D2L.Siren.EntityStore.fetch(href, token);
		if (!fetched || !fetched.entity) {
			return;
		}
		entity = fetched.entity;
	}
	return entity;
}
