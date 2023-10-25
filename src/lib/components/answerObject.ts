import type { AnswerObject } from '$lib/interfaces';

export class Answer {
	answer: AnswerObject;
	solution: AnswerObject;

	constructor(answerBody?: string, solutionBody?: string) {
		const answer: AnswerObject = {};
		const solution: AnswerObject = {};
		if (answerBody) answer['body'] = answerBody;
		if (solutionBody) solution['body'] = solutionBody;
		this.answer = answer;
		this.solution = solution;
	}

	addPart(answerBody?: string, solutionBody?: string) {
		if (this.answer['parts'] === undefined) this.answer['parts'] = [];
		if (this.solution['parts'] === undefined) this.solution['parts'] = [];
		if (answerBody) this.answer['parts'].push({ body: answerBody });
		if (solutionBody) this.solution['parts'].push({ body: solutionBody });
	}
}
