function compare(x, y) {
	if (x < y) {
		return -1;
	}
	if (x > y) {
		return 1;
	}
	return 0;
}

export default
{
	sorts: [
		{
			'class': 'course-name',
			'id': 'bycourse',
			'fn': (x, y) => {
				const xname = x.rowData.courseName;
				const yname = y.rowData.courseName;
				return compare(xname, yname);
			}
		},
		{
			'class': 'first-name',
			'id': 'byuser',
			'fn': (x, y) => {
				const xname = x.rowData.firstName;
				const yname = y.rowData.firstName;
				return compare(xname, yname);
			}
		},
		{
			'class': 'activity-name',
			'id': 'byactivity',
			'fn': (x, y) => {
				const xname = x.rowData.activityName;
				const yname = y.rowData.activityName;
				return compare(xname, yname);
			}
		},
		{
			'class': 'completion-date',
			'id': 'bydate',
			'fn': (x, y) => {
				const xname = x.rowData.localizedFormattedDate;
				const yname = y.rowData.localizedFormattedDate;
				return compare(xname, yname);
			}
		}
	],
	data: [
		{
			'firstName': 'Alex',
			'lastName': 'Bedley',
			'activityType': 'assignment',
			'activityName': 'What is Love?',
			'courseName': 'Music 304 - A Study of Haddaway',
			'localizedFormattedDate': '3/9/2019 10:16 AM',
			'masterTeacher': {
				'firstName': 'Brett',
				'lastName': 'Hertzberger'
			}
		},
		{
			'firstName': 'Alex',
			'lastName': 'Bedley',
			'activityType': 'assignment',
			'activityName': 'The Bestest Number',
			'courseName': 'Math 102 - Numbers',
			'localizedFormattedDate': '3/9/2019 10:16 AM',
			'masterTeacher': {
				'firstName': 'Chris',
				'lastName': 'Alexander'
			}
		},
		{
			'firstName': 'Stacey',
			'lastName': 'Van Herk',
			'activityType': 'assignment',
			'activityName': 'The Bestest Number',
			'courseName': 'Math 102 - Numbers',
			'localizedFormattedDate': '3/9/2019 10:16 AM',
			'masterTeacher': {
				'firstName': 'Chris',
				'lastName': 'Alexander'
			},
			'isDraft': true
		},
		{
			'firstName': 'Carol',
			'lastName': 'Busman',
			'activityType': 'assignment',
			'activityName': 'The Bestest Number',
			'courseName': 'Math 102 - Numbers',
			'localizedFormattedDate': '18/2/2019 10:16 AM',
			'masterTeacher': {
				'firstName': 'Chris',
				'lastName': 'Alexander'
			},
			'isDraft': true
		},
		{
			'firstName': 'Viktor',
			'lastName': 'Yakovlyev',
			'activityType': 'discussion',
			'activityName': 'Was Shakespeare secretly illiterate?',
			'courseName': 'Literature 303 - Real Talks',
			'localizedFormattedDate': '1/1/2019 10:52 AM',
			'masterTeacher': {
				'firstName': 'Surekha',
				'lastName': 'Rao'
			}
		},
		{
			'firstName': 'Jamie',
			'lastName': 'Murray',
			'activityType': 'quiz',
			'activityName': "Months that start with 'Feb'",
			'courseName': 'Arts 101 - Underwater Basket Weaving',
			'localizedFormattedDate': '1/16/2019 5:16 AM',
			'masterTeacher': {
				'firstName': 'Tina',
				'lastName': 'Fletcher'
			}
		},
		{
			'firstName': 'Amaury',
			'lastName': 'Perez',
			'activityType': 'quiz',
			'activityName': "Months that start with 'Feb'",
			'courseName': 'Arts 101 - Underwater Basket Weaving',
			'localizedFormattedDate': '1/15/2019 10:12 AM',
			'masterTeacher': {
				'firstName': 'Tina',
				'lastName': 'Fletcher'
			}
		}
	]
};
