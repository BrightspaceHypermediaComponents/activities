import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/*
 * @polymer
 * @mixinFunction
 */
const QuickEvalLoggingImpl = (superClass) => {
	return class extends superClass {

		static get properties() {
			return {
				loggingEndpoint: {
					type: String
				}
			};
		}

		_logError(error, additionalContext) {

			if (!this.loggingEndpoint) {
				return;
			}

			const message = {};
			message.additionalContext = additionalContext || {};

			if (error) {
				if (!error.message && !error.stack) {
					message.errorMessage = error;
				}
				if (error.message) {
					message.errorMessage = error.message;
				}
				if (error.stack) {
					message.stackTrace = error.stack;
				}
			}

			window.fetch(
				this.loggingEndpoint,
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify([message])
				}
			);
		}
	};
};

export const QuickEvalLogging = dedupingMixin(QuickEvalLoggingImpl);
