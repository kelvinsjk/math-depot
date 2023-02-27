import type {
	AnswerObject,
	//QuestionVariables
} from '$lib/interfaces';
import { Fraction, getRandomInt, heads, sample } from 'mathlify';
import { math } from 'mathlifier';

/**
 * N17/I/1
 * Given that 1/x = base^k, find k
 */
export function qn(variables?: Partial<Variables>): [
	AnswerObject,
	AnswerObject,
	// QuestionVariables
] {
	const { base, n1, isFraction, isSquareRoot } = {
		...variablesGen(),
		...variables,
	};

	// question
	const x = Math.pow(base, n1);
	let xString = `${x}`;
	if (isSquareRoot) {
		xString = `\\sqrt{${xString}}`;
	}
	if (isFraction) {
		xString = `\\frac{1}{${xString}}`;
	}
	const body = `Given that ${math(`\\displaystyle ${xString} = ${base}^k,`)}
		find ${math(`k.`)}
	`;

	// answer
	let k = new Fraction(n1);
	if (isSquareRoot) {
		k = k.divide(2);
	}
	if (isFraction) {
		k = k.negative();
	}
	const ans = `k=${k}.`;

	const question: AnswerObject = {
		body,
	};
	const answer: AnswerObject = {
		body: `${math(ans)}`,
	};

	return [
		question,
		answer,
		//qnVariables
	];
}

export function variablesGen(): Variables {
	const bases = [2, 3, 5, 7];
	const [isFraction, isSquareRoot] = generateBoolean();
	return {
		base: sample(bases),
		n1: getRandomInt(2, 5),
		isFraction,
		isSquareRoot,
	};
}

function generateBoolean(): [boolean, boolean] {
	const [a, b] = [heads(), heads()];
	while (!a && !b) {
		return generateBoolean();
	}
	return [a, b];
}

interface Variables {
	base: number;
	n1: number;
	isFraction?: boolean;
	isSquareRoot?: boolean;
}
