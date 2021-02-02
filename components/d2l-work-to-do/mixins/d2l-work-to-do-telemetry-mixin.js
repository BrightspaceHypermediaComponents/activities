import Events from 'd2l-telemetry-browser-client';
import { Rels } from 'siren-sdk/src/hypermedia-constants';

const W2D_TELEMETRY_ID = 'worktodo';
const W2D_BASE_NAMESPACE = 'd2l-work-to-do';
const W2D_API_NAMESPACE = `${W2D_BASE_NAMESPACE}.api`;
const W2D_OVERDUE_MARK = `${W2D_API_NAMESPACE}.overdue`;
const W2D_OVERDUE_LOAD_START_MARK = `${W2D_OVERDUE_MARK}.start`;
const W2D_OVERDUE_LOADED_MEASURE = `${W2D_OVERDUE_MARK}.loaded`;
const W2D_UPCOMING_MARK = `${W2D_API_NAMESPACE}.upcoming`;
const W2D_UPCOMING_LOAD_START_MARK = `${W2D_UPCOMING_MARK}.start`;
const W2D_UPCOMING_LOADED_MEASURE = `${W2D_UPCOMING_MARK}.loaded`;
const W2D_UPCOMING_MAX_MARK = `${W2D_API_NAMESPACE}.upcoming.max`;
const W2D_UPCOMING_MAX_LOAD_START_MARK = `${W2D_UPCOMING_MAX_MARK}.start`;
const W2D_UPCOMING_MAX_LOADED_MEASURE = `${W2D_UPCOMING_MAX_MARK}.loaded`;
const W2D_VIEW_NAMESPACE = `${W2D_BASE_NAMESPACE}.view`;
const W2D_VIEW_LOADED_MEASURE = `${W2D_VIEW_NAMESPACE}.loaded`;
const W2D_WIEW_LOAD_MEASURES = [W2D_OVERDUE_LOADED_MEASURE, W2D_UPCOMING_LOADED_MEASURE,
	W2D_UPCOMING_MAX_LOADED_MEASURE, W2D_VIEW_LOADED_MEASURE];

export const WorkToDoTelemetryMixin = superclass => class extends superclass {

	constructor() {
		super();

		this._client = undefined;
		this._custom = {};
	}

	markLoadOverdueStart() {
		this._markEventStart(W2D_OVERDUE_LOAD_START_MARK);
	}

	markLoadOverdueEnd(count) {
		this._markEventEnd(W2D_OVERDUE_LOADED_MEASURE, W2D_OVERDUE_LOAD_START_MARK, { OverdueCount: count });
	}

	markLoadUpcomingStart(isMax) {
		this._markEventStart(isMax ? W2D_UPCOMING_MAX_LOAD_START_MARK : W2D_UPCOMING_LOAD_START_MARK);
	}

	markLoadUpcomingEnd(isMax, count) {
		isMax
			? this._markEventEnd(W2D_UPCOMING_MAX_LOADED_MEASURE, W2D_UPCOMING_MAX_LOAD_START_MARK, { UpcomingMaxCount: count })
			: this._markEventEnd(W2D_UPCOMING_LOADED_MEASURE, W2D_UPCOMING_LOAD_START_MARK, { UpcomingCount: count });
	}

	markLoadMoreStart() {
		this.markLoadUpcomingStart();
	}

	markAndLogLoadMoreEnd(count) {
		this.markLoadUpcomingEnd(false, count);
		this._logPerformanceEvent('LoadMore', Rels.Activities.nextPage, 'ActivitiesNextPage', [W2D_UPCOMING_LOADED_MEASURE]);
	}

	markAndLogWidgetLoaded(fullscreen) {
		this._markEventEnd(W2D_VIEW_LOADED_MEASURE);
		this._logPerformanceEvent('LoadView', window.location.pathname, fullscreen ? 'Fullscreen' : 'Widget', W2D_WIEW_LOAD_MEASURES);
	}

	logActivityNavigatedTo(href, type) {
		this._logTelemetryEvent('NavigatedTo', href, type);
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

		this._custom[measure] = Object.assign({}, this._custom[measure], custom);
	}

	_logPerformanceEvent(action, href, type, measures) {
		if (!action || !href || !type || !measures) {
			return;
		}

		const timings = performance
			.getEntriesByType('measure')
			.filter((measure) => measures.includes(measure.name));

		const eventBody = new Events.PerformanceEventBody()
			.setAction(action)
			.setObject(encodeURIComponent(href), type, href)
			.addUserTiming(timings);

		Object.entries(this._custom).forEach(([measure, values]) => {
			if (measures.includes(measure)) {
				Object.entries(values).forEach(([key, value]) => {
					eventBody.addCustom(key, value.toString());
				});
				this._custom[measure] = {};
			}
		});

		const event = new Events.TelemetryEvent()
			.setType('PerformanceEvent')
			.setDate(new Date())
			.setSourceId(W2D_TELEMETRY_ID)
			.setBody(eventBody);

		this._sendEvent(event);
	}

	_logTelemetryEvent(action, href, type) {
		if (!action || !href || !type) {
			return;
		}

		const eventBody = new Events.EventBody()
			.setAction(action)
			.setObject(encodeURIComponent(href), type, href);

		const event = new Events.TelemetryEvent()
			.setType('TelemetryEvent')
			.setDate(new Date())
			.setSourceId(W2D_TELEMETRY_ID)
			.setBody(eventBody);

		this._sendEvent(event);
	}

	_sendEvent(event) {
		const telemetryEndpoint = window.D2L && window.D2L.workToDoOptions && window.D2L.workToDoOptions.telemetryEndpoint;
		if (!telemetryEndpoint) {
			return;
		}

		if (!this._client || this._client.options.endpoint !== telemetryEndpoint) {
			this._client = new Events.Client({ endpoint: telemetryEndpoint });
		}

		this._client.logUserEvent(event);
	}
};
