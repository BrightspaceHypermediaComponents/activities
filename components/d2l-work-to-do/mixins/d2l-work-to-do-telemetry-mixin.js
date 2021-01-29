import Events from 'd2l-telemetry-browser-client';

const W2D_TELEMETRY_ID = 'worktodo';
const W2D_BASE_NAMESPACE = 'd2l-work-to-do';
const W2D_API_NAMESPACE = `${W2D_BASE_NAMESPACE}.api`;
const W2D_OVERDUE_MARK = `${W2D_API_NAMESPACE}.overdue`;
const W2D_OVERDUE_LOAD_START_MARK = `${W2D_OVERDUE_MARK}.start`;
const W2D_OVERDUE_LOADED_MEASURE = `${W2D_OVERDUE_MARK}.loaded`;
const W2D_VIEW_NAMESPACE = `${W2D_BASE_NAMESPACE}.view`;
const W2D_VIEW_LOADED_MEASURE = `${W2D_VIEW_NAMESPACE}.loaded`;

export const WorkToDoTelemetryMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/** Represents telemetry endpoint to publish events to */
			_telemetryEndpoint: { type: String, attribute: 'data-telemetry-endpoint' },
		};
	}

	constructor() {
		super();

		this._telemetryEndpoint = undefined;
		this._client = undefined;
		this._custom = {};
	}

	attributeChangedCallback(name, oldval, newval) {
		if (name === 'data-telemetry-endpoint') {
			this._client = newval
				? new Events.Client({ endpoint: newval })
				: undefined;
		}

		super.attributeChangedCallback(name, oldval, newval);
	}

	markLoadOverdueStart() {
		this._markEventStart(W2D_OVERDUE_LOAD_START_MARK);
	}

	markLoadOverdueEnd(count) {
		this._markEventEnd(W2D_OVERDUE_LOADED_MEASURE, W2D_OVERDUE_LOAD_START_MARK, { OverdueCount: count });
	}

	markAndLogWidgetLoaded(href) {
		this._markEventEnd(W2D_VIEW_LOADED_MEASURE);
		this._logPerformanceEvent('LoadView', href, 'View');
	}

	_markEventStart(startMark) {
		if (!startMark) {
			return;
		}

		performance.clearMarks(startMark);
		performance.mark(startMark);
	}

	_markEventEnd(measure, startMark, custom) {
		performance.clearMeasures(measure);
		performance.measure(measure, startMark);

		Object.assign(this._custom, custom);
	}

	_logPerformanceEvent(action, href, type) {
		if (!this._client || !action || !href || !type) {
			return;
		}

		const eventBody = new Events.PerformanceEventBody()
			.setAction(action)
			.setObject(encodeURIComponent(href), type, href)
			.addUserTiming(performance.getEntriesByType('measure').filter((measure) => {
				return measure.name.startsWith(W2D_BASE_NAMESPACE);
			}));

		performance.clearMarks();
		performance.clearMeasures();

		Object.entries(this._custom).forEach(([key, value]) => {
			eventBody.addCustom(key, value.toString());
		});

		this._custom = {};

		const event = new Events.TelemetryEvent()
			.setType('PerformanceEvent')
			.setDate(new Date())
			.setSourceId(W2D_TELEMETRY_ID)
			.setBody(eventBody);

		console.log(event);
		// this._client.logUserEvent(event);
	}
};
