import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const ErrorHandlingMixin = superclass => class extends LocalizeMixin(superclass) {

	clearError(errorProperty) {
		this[errorProperty] = '';
	}
	async setError(errorProperty, langterm, tooltipId) {
		this[errorProperty] = this.localize(langterm);

		await this.updateComplete;
		this._showTooltip(tooltipId);
	}

	_showTooltip(tooltipId) {
		const tooltipElem = this.shadowRoot.getElementById(tooltipId);
		if (tooltipElem) {
			tooltipElem.show();
		}
	}
};
