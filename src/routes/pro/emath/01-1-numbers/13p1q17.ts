import type {
	AnswerObject,
	//QuestionVariables
} from '$lib/interfaces';
import { Fraction, getRandomInt, sampleN, VariableTerm } from 'mathlify';
import { math } from 'mathlifier';

/**
 * N13/I/17(a)
 * Simplify k1 x^n1 y^n2 / k2 x^n3 y^n4
 */
export function qn(variables?: Partial<Variables>): [
	AnswerObject,
	AnswerObject,
	// QuestionVariables
] {
	const { k1, k2, n1, n2, n3, n4 } = {
		...variablesGen(),
		...variables,
	};

	// question
	const x1 = new VariableTerm(k1, { n: n1 });
	const y1 = new VariableTerm(1, { variable: 'y', n: n2 });
	const x2 = new VariableTerm(k2, { n: n3 });
	const y2 = new VariableTerm(1, { variable: 'y', n: n4 });
	const body = `Simplify ${math(`${x1}${y1} \\div ${x2}${y2}.`)}`;

	// answer
	const k3 = new Fraction(k1, k2);
	const nX = n1 - n3;
	const nY = n2 - n4;
	let ans: string;
	if (nX > 0 && nY > 0) {
		const x3 = new VariableTerm(k3, { n: nX });
		const y3 = new VariableTerm(1, { n: nY, variable: 'y' });
		ans = `${x3}${y3}`;
	} else if (nX > 0 && nY < 0) {
		const x3 = new VariableTerm(k3.num, { n: nX });
		const y3 = new VariableTerm(k3.den, { n: -nY, variable: 'y' });
		ans = `\\frac{${x3}}{${y3}}`;
	} else if (nX < 0 && nY > 0) {
		const x3 = new VariableTerm(k3.den, { n: -nX });
		const y3 = new VariableTerm(k3.num, { n: nY, variable: 'y' });
		ans = `\\frac{${y3}}{${x3}}`;
	} else {
		const x3 = new VariableTerm(k3.den, { n: -nX });
		const y3 = new VariableTerm(1, { n: -nY, variable: 'y' });
		ans = `\\frac{${k3.num}}{${x3}${y3}}`;
	}

	const question: AnswerObject = {
		body,
	};
	const answer: AnswerObject = {
		body: `${math(`${ans}.`)}`,
	};

	return [
		question,
		answer,
		//qnVariables
	];
}

export function variablesGen(): Variables {
	const base = getRandomInt(3, 12);
	const nArray = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6];
	const [k1, k2] = sampleN(2, [1, 2, 3, 4, 5]).map((x) => x * base);
	const [n1, n3] = sampleN(2, nArray);
	const [n2, n4] = sampleN(2, nArray);
	return {
		k1,
		k2,
		n1,
		n2,
		n3,
		n4,
	};
}

interface Variables {
	n1: number;
	n2: number;
	n3: number;
	n4: number;
	k1: number;
	k2: number;
}
