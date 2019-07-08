'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'activities': 'Actividades',
			'activityName': 'Nombre de la actividad',
			'assignment': 'Asignación',
			'caughtUp': 'Ya está al día.',
			'checkBackOften': 'Vuelva a revisar a menudo para ver los nuevos envíos.',
			'clearSearch': 'Borrar búsqueda',
			'completed': 'Completado',
			'courseName': 'Curso',
			'discussion': 'Debate',
			'displayName': 'Nombre, Apellido',
			'due': 'Fecha de entrega: {date}',
			'evaluate': 'Evaluar {displayName}',
			'evaluateAll': 'Evaluar todo',
			'evaluated': 'Evaluado',
			'failedToFilter': 'No se puede aplicar el filtro. Intente de nuevo en algunos minutos.',
			'failedToLoadData': 'No se puede cargar los envíos. Intente de nuevo en algunos minutos.',
			'failedToLoadMore': 'No se puede cargar más envíos. Intente de nuevo en algunos minutos.',
			'failedToSearch': 'No se puede aplicar la búsqueda. Intente de nuevo en algunos minutos.',
			'firstName': 'Nombre',
			'lastName': 'Apellido',
			'loadMore': 'Cargar más',
			'loading': 'Cargando',
			'masterTeacher': 'Profesor',
			'noCriteriaMatch': 'No hay materiales enviados que coincidan con sus criterios.',
			'noResults': 'No hay resultados aquí.',
			'noSubmissions': 'No hay envíos que requieran su atención.',
			'publishAll': 'Publicar todo',
			'published': 'Publicado',
			'quiz': 'Cuestionario',
			'search': 'Buscar',
			'searchResultsMore': 'Más de {num} resultados de búsqueda',
			'searchResultsMultiple': '{num} resultados de búsqueda',
			'searchResultsSingle': '1 resultado de búsqueda',
			'sortBy': 'Ordenar por {columnName}',
			'submissionDate': 'Fecha del material enviado',
			'submissionList': 'Lista de material enviado',
			'submissions': 'Materiales enviados',
			'tableTitle': 'Lista de envíos no evaluados del estudiante de todos los cursos y herramientas',
			'tryAgain': 'Volver a intentarlo',
			'unreadSubmissions': '{num} materiales enviados no leídos',
			'unreadSubmissionsDetail': '{unread} nuevos, {resub} materiales enviados nuevamente',
			'viewBy': 'Ver por:'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

