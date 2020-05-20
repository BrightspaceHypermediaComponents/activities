export async function fetchEntity(href, token, bypassCache) {
	let entity;
	if (!bypassCache) {
		entity = await window.D2L.Siren.EntityStore.get(href, token);
	}
	if (!entity) {
		const fetched = await window.D2L.Siren.EntityStore.fetch(href, token, bypassCache);
		if (!fetched || !fetched.entity) {
			return;
		}
		entity = fetched.entity;
	}
	return entity;
}
