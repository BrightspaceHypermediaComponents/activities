import { action, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class AssignmentTypeProps {

	constructor(entity) {
		this.isGroupAssignmentTypeDisabled = entity.isGroupAssignmentTypeDisabled;
		this.isIndividualAssignmentType = entity.isIndividualAssignmentType;
		this.groupCategories = entity.groupCategories;
		this.canEditAssignmentType = entity.canEditAssignmentType;
		this.selectedGroupCategoryName = entity.selectedGroupCategoryName;

		if (!this.isIndividualAssignmentType && this.groupCategories.length > 0) {
			this.selectedGroupCategoryId = String(this.groupCategories[0].value);
			const category = this.groupCategories.find(category => category.selected === true);

			if (category) {
				this.selectedGroupCategoryId = String(category.value);
			}
		}
	}

	setAssignmentTypeGroupCategory(value) {
		this.selectedGroupCategoryId = value;
	}

	setToGroupAssignmentType() {
		this.isIndividualAssignmentType = false;
		this.selectedGroupCategoryId =
			this.selectedGroupCategoryId
				? String(this.selectedGroupCategoryId)
				: String(this.groupCategories[0].value);
	}

	setToIndividualAssignmentType() {
		this.isIndividualAssignmentType = true;
	}

}

decorate(AssignmentTypeProps, {
	isGroupAssignmentTypeDisabled: observable,
	isIndividualAssignmentType: observable,
	groupCategories: observable,
	canEditAssignmentType: observable,
	selectedGroupCategoryName: observable,
	setToIndividualAssignmentType: action,
	setToGroupAssignmentType: action,
	setAssignmentTypeGroupCategory: action
});
