import type {
	AnswerObject,
	//QuestionVariables
} from '$lib/interfaces';
import { Fraction, getRandomInt, heads, sample } from 'mathlify';
import { math } from 'mathlifier';

/**
 * N14/I/6
 * Given that x * y^n = 1, find n
 */
export function qn(variables?: Partial<Variables>): [
	AnswerObject,
	AnswerObject,
	// QuestionVariables
] {
	const { base, n1, n2, isTimes } = {
		...variablesGen(),
		...variables,
	};

	// question
	const x = Math.pow(base, n1);
	const y = Math.pow(base, n2);
	let qn: string, ans: Fraction;
	if (isTimes) {
		qn = `${x} \\times ${y}^n = 1`;
		ans = new Fraction(-n1, n2);
	} else {
		qn = `${y}^n \\div ${x} = 1`;
		ans = new Fraction(n1, n2);
	}
	const body = `Given that ${math(`${qn},`)}
		find the value of ${math(`n.`)}
	`;

	const question: AnswerObject = {
		body,
	};
	const answer: AnswerObject = {
		body: `${math(`n=${ans}.`)}`,
	};

	return [
		question,
		answer,
		//qnVariables
	];
}

export function variablesGen(): Variables {
	const bases = [2, 3, 4, 5];
	return {
		base: sample(bases),
		n1: getRandomInt(1, 4),
		n2: getRandomInt(2, 5),
		isTimes: heads(),
	};
}

interface Variables {
	base: number;
	n1: number;
	n2: number;
	isTimes?: boolean;
}
