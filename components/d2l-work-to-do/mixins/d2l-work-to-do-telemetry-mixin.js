import Events from 'd2l-telemetry-browser-client';

const W2D_BASE_MARK = 'd2l-work-to-do';
const W2D_OVERDUE_MARK = `${W2D_BASE_MARK}.ovedue`;
const W2D_OVERDUE_LOAD_START_MARK = `${W2D_OVERDUE_MARK}.start`;
const W2D_OVERDUE_LOADED_MEASURE = `${W2D_OVERDUE_MARK}.loaded`;

export const WorkToDoTelemetryMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/** Represents telemetry endpoint to publish events to */
			_telemetryEndpoint: { type: String, attribute: 'data-telemetry-endpoint' },
		};
	}

	constructor() {
		super();

		this._telemetryId = 'worktodo';
		this._telemetryEndpoint = undefined;
		this._client = undefined;
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

	markAndLogLoadOverdueEnd(href, type, count) {
		this._logPerformanceEvent('LoadOverdue', href, type, W2D_OVERDUE_LOAD_START_MARK, W2D_OVERDUE_LOADED_MEASURE, { OverdueCount: count });
	}

	_markEventStart(startMark) {
		if (!startMark) {
			return;
		}

		performance.clearMarks(startMark);
		performance.mark(startMark);
	}

	_logPerformanceEvent(action, href, type, startMark, measureName, custom) {
		if (!this._client || !action || !href || !type || !startMark || !measureName) {
			return;
		}

		performance.clearMeasures(measureName);
		performance.measure(measureName, startMark);

		const eventBody = new Events.PerformanceEventBody()
			.setAction(action)
			.setObject(encodeURIComponent(href), type, href)
			.addUserTiming(performance.getEntriesByName(measureName));

		if (custom) {
			Object.entries(custom).forEach(([key, value]) => {
				eventBody.addCustom(key, value.toString());
			});
		}

		const event = new Events.TelemetryEvent()
			.setType('PerformanceEvent')
			.setDate(new Date())
			.setSourceId(this._telemetryId)
			.setBody(eventBody);

		this._client.logUserEvent(event);
	}
};
