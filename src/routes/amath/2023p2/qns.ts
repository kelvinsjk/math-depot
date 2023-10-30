import type { AnswerObject } from '$lib/interfaces';

import {
	Polynomial,
	Fraction,
	solveLinear,
	solveQuadraticNumerical,
	EquationWorking,
	xPolynomial,
	ExpressionProduct,
	RationalTerm,
	ExpFn,
	InequalityWorking,
	d2ydx2,
	longDivision,
} from '../../emath/2023p2/mathlify-v3b';

import { mathlify } from '$lib/temml';
import {
	longDivide,
	Fraction as oFrac,
	Polynomial as oPolynomial,
	factorizeQuadratic as fQ,
} from 'mathlify';
import { dydx } from '$lib/utils/calculus';
const qed = `\\; \\blacksquare`;
const dx = `\\; \\mathrm{d}x`;

// Question 1
export const qn1: () => AnswerObject = () => {
	const factor = new xPolynomial(['k', 2], { ascending: true });
	const poly2 = new Polynomial([2, new Fraction(-1, 2)], { ascending: true });
	const n = 6;
	const expansion = poly2.pow(6).slice(4);
	const terms = factor.times(expansion).slice(4);
	const coeff = terms.coeffs[3];
	const working = new EquationWorking(coeff);
	working.setAligned(true);
	working.solveLinear();

	const body = mathlify`
		~${`align*`}
		& \\left( ${factor} \\right) \\left( ${poly2} \\right)^${n} \\\\
		& = \\left( ${factor} \\right) \\left( ${expansion} + \\dotsb \\right) \\\\
		&=  ${terms} + \\dotsb

		Since the coefficient of ${'x^3'}
		is zero,
		~${'align*'}
		${working} ${qed}
	`;
	return {
		body,
	};
};

// Question 2
export const qn2: () => AnswerObject = () => {
	const body = mathlify`
		To be updated
	`;
	return {
		body,
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	// a
	const initial = 86;
	const body = mathlify`
		$${initial} ${qed}
	`;

	// b
	const k = -0.06;
	const T = 37;
	const t = Math.log(T / initial) / k;
	// T = initial exp(k t)
	const partB = mathlify`
		~${'gather*'}
		${initial} \\mathrm{e}^{${k}t} = ${T} \\\\
		\\mathrm{e}^{${k}t} = \\frac{${T}}{${initial}} \\\\
		\\ln \\mathrm{e}^{${k}t} = \\ln \\frac{${T}}{${initial}} \\\\
		${k}t \\ln \\mathrm{e} = \\ln \\frac{${T}}{${initial}} \\\\
		t = \\frac{\\ln \\frac{${T}}{${initial}}}{${k}} \\\\
		t = ${t.toPrecision(3)} ${qed}
	`;

	// c
	const T2 = 82;
	const lambda = (Math.log(T2 / initial) * -1) / 60;
	const partCI = mathlify`
		~${'gather*'}
		${initial} \\mathrm{e}^{-\\lambda (60)} = ${T2} \\\\
		\\mathrm{e}^{-60\\lambda} = \\frac{${T2}}{${initial}} \\\\
		\\ln \\mathrm{e}^{-60\\lambda} = \\ln \\frac{${T2}}{${initial}} \\\\
		- 60\\lambda = \\ln \\frac{${T2}}{${initial}} \\\\
		\\lambda = ${lambda.toPrecision(3)} ${qed}
	`;

	//c ii
	const t2 = Math.log(0.5) / (k - lambda);
	const partC2 = mathlify`
		~${'gather*'}
		${initial} \\mathrm{e}^{${k}t} = \\frac{1}{2} (${initial}) \\mathrm{e}^{-\\lambda t} \\\\
		\\frac{\\mathrm{e}^{${k}t}}{\\mathrm{e}^{-\\lambda t}} = \\frac{1}{2}  \\\\
		\\mathrm{e}^{-0.06t - \\lambda t} = \\frac{1}{2} \\\\
		(-0.06 - \\lambda) t = \\ln \\frac{1}{2} \\\\
		t = ${t2.toPrecision(3)} ${qed}
	`;

	return {
		parts: [{ body }, { body: partB }, { parts: [{ body: partCI }, { body: partC2 }] }],
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	// a
	const exp = new ExpFn(new Polynomial([-2, 0]));
	const ddx = dydx('', 'x');

	const body = mathlify`
		To be updated
	`;

	// b
	const partB = mathlify`
		To be updated
	`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	const alpha = Math.acos(Math.sqrt(2 / 3));

	const body = mathlify`
		To be updated

	`;
	return {
		body,
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// a
	const fx = new oPolynomial([6, -7, -1, 2]);
	const factor = new oPolynomial([2, 1]);
	const { quotient, remainder } = longDivide(fx, factor);
	const [f2, f3] = fQ(quotient);
	const body = mathlify`
		$${`(${factor})`}(${f2})(${f3}) ${qed} 
	`;

	// b
	const x1Val = Math.log(2 / 3) / Math.log(2);
	const y2 = 0;
	const partB = mathlify`
		$${`y=${x1Val.toPrecision(3)}`} \\textrm{ or } y = 0 ${qed}
	`;

	const partC = mathlify`
		~${'align*'}
		2^y &= \\frac{2}{3} \\\\
		\\log_2 2^y &= \\log_2 \\frac{2}{3} \\\\
		y \\log_2 2 &= \\log_2 2 - \\log_2 3 \\\\
		y &= 1 - \\log_2 3

		$${`a= 2, b = 3`} ${qed}
	`;

	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 7
export const qn7: () => AnswerObject = () => {
	const body = mathlify`
		$${`a=-10, b = 2`} ${qed}
	`;
	return {
		body,
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	const alpha = (Math.atan(3 / 4) / Math.PI) * 180;
	const body = mathlify`
		$${`R=5, \\alpha = ${alpha.toPrecision(3)} \\degree`} ${qed}
	`;
	return {
		body,
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	// a
	const body = mathlify`
		To be updated
	`;

	// b
	const partB = mathlify`
		To be updated
	`;

	const partC = mathlify`
		$${5.13} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

export const answers: AnswerObject[] = [
	qn1(),
	qn2(),
	qn3(),
	qn4(),
	qn5(),
	qn6(),
	qn7(),
	qn8(),
	qn9(),
];
