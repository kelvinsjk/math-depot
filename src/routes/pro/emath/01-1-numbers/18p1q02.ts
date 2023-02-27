import type {
	AnswerObject,
	//QuestionVariables
} from '$lib/interfaces';
import { Fraction, getRandomInt, sample, sampleN, shuffle } from 'mathlify';
import { math } from 'mathlifier';

/**
 * N18/I/2
 * Simplify ( x^n1 / y^n2 )^n3
 */
export function qn(variables?: Partial<Variables>): [
	AnswerObject,
	AnswerObject,
	// QuestionVariables
] {
	const { n1, n2, n3 } = {
		...variablesGen(),
		...variables,
	};

	// question
	const body = `Simplify ${math(`
		\\displaystyle
		\\left( \\frac{x^{${n1}}}{y^{${n2}}} \\right)^{${n3}}
	`)}`;

	// answer
	const xPower = n1.times(n3);
	const yPower = n2.times(n3).negative();
	let ans: string;
	const xString = `x^{${xPower.abs()}}`;
	const yString = `y^{${yPower.abs()}}`;
	if (xPower.isGreaterThan(0) && yPower.isGreaterThan(0)) {
		ans = `${xString} ${yString}.`;
	} else if (xPower.isGreaterThan(0) && yPower.isLessThan(0)) {
		ans = `\\frac{${xString}}{${yString}}.`;
	} else if (xPower.isLessThan(0) && yPower.isGreaterThan(0)) {
		ans = `\\frac{${yString}}{${xString}}.`;
	} else {
		ans = `\\frac{1}{${xString} ${yString}}.`;
	}

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
	const den = getRandomInt(2, 3);
	const nums: { [key: number]: number[] } = {
		2: [1, 3, 5, 7],
		3: [1, 2, 4, 5],
	};
	const num = sample(nums[den]);
	const frac = new Fraction(num, den);
	const [multiple1, multiple2] = sampleN(2, [2, 3, 4, 5]);
	const int1 = new Fraction(multiple1 * den);
	const int2 = new Fraction(multiple2 * den);
	const negatives = shuffle([1, 1, -1]);
	const [n1, n2, n3] = shuffle([int1, int2, frac]).map((x, i) => x.times(negatives[i]));
	return {
		n1,
		n2,
		n3,
	};
}

interface Variables {
	n1: Fraction;
	n2: Fraction;
	n3: Fraction;
}
