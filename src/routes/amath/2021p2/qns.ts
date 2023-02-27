import { alignStar, gatherStar, linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import {
	factorizeCubic,
	Fraction,
	Polynomial,
	solveQuadratic,
	SquareRoot,
	Expression,
	solveLinear,
	nCr,
	Regression,
	Term,
	SinFn,
	acos,
} from 'mathlify';
import { dydx as dydxString } from '$lib/utils/calculus';
import { line } from '$lib/utils/coordinate';

// Question 1
export const qn1: () => AnswerObject = () => {
	const [u1, u2] = solveQuadratic(new Polynomial([3, 5, -2])) as [Fraction, Fraction];
	const x = Math.log(u2.valueOf());
	const body = `${math(`\\mathrm{e}^x = ${u1}`)} is rejected as ${math(
		`\\mathrm{e}^x > 0`,
	)} for all ${math(`x.`)}
		${linebreak}Hence there is only one solution ${math(`x=${x.toPrecision(2)}.`)}
	`;
	return {
		body,
	};
};

// Question 2
export const qn2: () => AnswerObject = () => {
	const fx = new Polynomial([3, 4, -1, -2]);
	// eslint-disable-next-line
	const root3 = factorizeCubic(fx, -1)[1]![1]; // x = -1 repeated as root 2
	const body = `Let ${math(`f(x) = ${fx}.`)}
		${alignStar(`f(-1) &= 3(-1)^3 + 4(-1)^2 - (-1) - 2
			\\\\ &= 0
		`)}
		so ${math(`x=-1`)} is a solution of ${math(`f(x)=0.`)}
		${linebreak}${math(`x=-1 \\textrm{ (repeated)}`)} or ${math(`x=${root3}.`)}
	`;
	return {
		body,
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	// x / (2x+1)^1/2
	// ( ()^1/2 - x(2x+1)^-1/2 ) / ()^1
	// ( () - x ) / ()^3/2
	const poly = new Polynomial([2, 1]);
	const num = poly.minus(new Polynomial([1, 0]));
	const n = new Fraction(3, 2);

	// part b
	// dydx = x/() + 1/()^3/2
	// int x/() = x/()^1/2 - int 1/()^3/2
	// int x/() = x/()^1/2 + /()^1/2
	const x1 = 4,
		x2 = 0;
	const int1a = new SquareRoot(1, x1).divide(new SquareRoot(poly.subIn(x1)));
	const int1b = new SquareRoot(1).divide(new SquareRoot(poly.subIn(x1)));
	const int2a = new SquareRoot(1, x2).divide(new SquareRoot(poly.subIn(x2)));
	const int2b = new SquareRoot(1).divide(new SquareRoot(poly.subIn(x2)));
	const integral = new Expression(int1a, int1b, int2a.negative(), int2b.negative());

	// typeset
	const body = `${math(
		`\\displaystyle ${dydxString()} = \\frac{${num}}{(${poly})^{${n}}}.`,
	)}`;
	const partB = `${math(`${integral}.`)}`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	// part b
	const a = 6,
		b = 4;
	const R2 = Math.pow(a, 2) + Math.pow(b, 2);
	const R = new SquareRoot(R2);
	const alpha = (Math.atan(b / a) / Math.PI) * 180;

	// part c
	const theta = 90 - alpha;

	// typeset
	const body =
		alignStar(`\\sin \\theta &= \\frac{h_1}{6}
		\\\\ h_1 &= 6 \\sin \\theta
		\\\\ \\cos \\theta &= \\frac{h_2}{4}
		\\\\ h_2 &= 4 \\cos \\theta
	`) + `Hence ${math(`h = 6 \\sin \\theta + 4 \\cos \\theta.`)}`;
	const partB = `${math(`${R}\\sin (\\theta + ${alpha.toFixed(1)}^\\circ).`)}`;
	const partC = `${math(`h=${R}.`)}
		${linebreak}Corresponding value of ${math(`\\theta = ${theta.toFixed(1)}^\\circ.`)}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	// part a
	const y = new Polynomial([2, -6, 3]);
	const [x1, x2] = solveQuadratic(y.minus(11));

	// part b
	// 2x^2 - 6x + 3 = 2x + k
	// a = 2, b = -6-2, c = 3-k
	const [c, b, a] = y.minus(new Polynomial([2, 0])).coeffs;
	const poly = new Polynomial([-1, c]);
	const k = solveLinear(poly.times(-4).times(a).plus(b.square()));

	// part c
	const [xP] = solveQuadratic(y.minus(new Polynomial([2, k])));
	const yP = y.subIn(xP);

	// typeset
	const body = `${math(`x<${x1}`)} or ${math(`x>${x2}.`)}`;
	const partB = `${math(`k=${k}.`)}`;
	const partC = `${math(`P\\left(${xP}, ${yP}\\right).`)}`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// part a
	const A = 2,
		B = -3,
		n = 6;
	const c2 = nCr(n, 2) * Math.pow(A, 4) * Math.pow(B, 2);
	const c3 = nCr(n, 3) * Math.pow(A, 3) * Math.pow(B, 3);
	const c3Sign = c3 > 0 ? '' : '-';

	// part b
	// 1 * c3 + a*c2 = 0
	const a = solveLinear(new Polynomial([c2, c3]));

	// part c
	const c1 = nCr(n, 1) * Math.pow(A, 5) * Math.pow(B, 1);
	const c0 = Math.pow(A, 6);
	const coeff = new Fraction(c1).plus(a.times(c0));

	// typeset
	const body = `${math(`\\frac{${c2}}{x^2}`)} and ${math(
		`${c3Sign} \\frac{${Math.abs(c3)}}{x^3}.`,
	)}`;
	const partB = `${math(`a=${a}.`)}`;
	const partC = `${math(`${coeff}.`)}`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 7
export const qn7: () => AnswerObject = () => {
	// part a
	// d = av^2 + bv
	// d/v = av + b

	// part b
	const t = [1, 2, 3, 4];
	const n = [810, 450, 240, 135];
	const lnN = n.map((x) => Math.log(x));
	const reg = new Regression(t, lnN);
	const [lnA, lnB] = reg.yOnX();
	const a = Math.exp(lnA);
	const b = Math.exp(lnB);
	const tigers = a * Math.pow(b, 5);

	// typeset
	const body = `${math(`\\frac{d}{v} = av + b`)} so a straight line graph can
		be obtained by plotting ${math(`\\frac{d}{v}`)} against ${math(`v.`)}
		${linebreak}We can then find the value of ${math(`a`)} by finding the gradient
		of the straight line graph and the value of ${math(`b`)} by finding the
		${math(`\\frac{d}{v}\\textrm{-intercept}.`)}
	`;
	const partB = `${math(`${Math.round(tigers)}.`)}`;
	const partC = `In later decades, the straight line trend observed for ${math(`\\ln n`)}
		against ${math(`t`)} may not hold. This may be due to reasons such as the tigers going
		extinct (${math(`n=0`)}) or the population of tigers may actually increase in later
		decades due to conservation efforts.
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	// part a
	// v = 24 exp(-t/6)
	const negTOver6 = Math.log(1 / 2);
	const t = negTOver6 * -6;

	// part b
	const a = (24 / -6) * Math.exp(-t / 6);

	// part c
	// s = -24*6 exp(-t/6) + c
	// 0 = -24*6 + c
	const c = 24 * 6;
	const distance = -24 * 6 * Math.exp(-t / 6) + c;

	// typeset
	const body = `${math(`${t.toPrecision(3)} \\textrm{ s}`)}`;
	const partB = `${math(`${a} \\textrm{ m/s}^2.`)}`;
	const partC = `${math(`${distance} \\textrm{ m}.`)}`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	// part d
	// P( -4a, 2a )
	const m_OP = new Fraction(2, -4);
	const m = m_OP.reciprocal().negative();
	const l = line(m, -4, 2);
	const x = solveLinear(l);
	const xA = new Term(x, 'a');

	// typeset
	const body = `The circle has center ${math(`(-2a,a)`)} and radius
		${math(`2a.`)} Hence the ${math(`y\\textrm{-axis}`)} is a
		tangent to the circle.
	`;
	const partB = `${math(`(-2a, 3a)`)} and ${math(`(-2a, -a).`)}`;
	const partC = `Substituting ${math(`(0,0)`)} into the equation of the circle,
		${alignStar(`
			\\textrm{LHS} &= (2a)^2 + (-a)^2
			\\\\ &= 5a^2
			\\\\ \\textrm{RHS} &= ka^2
			\\\\ &= 5a^2
		`)}
		Since ${math(`\\textrm{LHS} = \\textrm{RHS},`)} the circle passes through ${math(`O.`)}
	`;
	const partD = `${math(`\\left( ${xA}, 0 \\right).`)}`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }, { body: partD }],
	};
};

// Question 10
export const qn10: () => AnswerObject = () => {
	const y1 = new SinFn({ fx: new Polynomial(1).divide(2), coeff: 4 });
	const y2 = new Polynomial(-1);

	const xM = acos(new Fraction(1, 2)).times(2);
	const yM1 = y1.subIn(xM);

	const int1 = y1.integrate();
	const int2 = y2.integrate();

	const twoNinth = new Fraction(2, 3).square().divide(2);

	const coeffLeft = new Fraction(1, 2).times(2).divide(3);
	const coeff1 = coeffLeft.times(2);
	const coeff2 = coeffLeft.times(-2).divide(3);
	// typeset
	const body = `${alignStar(`y &= ${y1} ${y2}
			\\\\ ${dydxString()} &= ${y1.differentiate()} ${y2.differentiate()}
		`)}
		At ${math(`M, \\displaystyle ${dydxString()}=0,`)}
		${gatherStar(`${y1.differentiate()} ${y2.differentiate()} = 0
			\\\\ ${y1.differentiate().removeCoeff()} = ${new Fraction(1, 2)}
			\\\\ x = ${xM},
			\\\\ y = ${yM1} - ${xM}
		`)}
		${alignStar(`& \\textrm{Area under curve}
			\\\\ &= \\int_0^{${xM}} ${y1} ${y2} \\; \\mathrm{d}x
			\\\\ &= \\left[ ${int1} ${int2} \\right]_0^{${xM}}
			\\\\ &= ${int1.subIn(xM)} - ${twoNinth}\\pi^2 + ${int1.subIn(0).negative()}
			\\\\ &= 4 - ${twoNinth}\\pi^2
		`)}
		${alignStar(`& \\textrm{Area of triangle}
			\\\\ &= \\frac{1}{2} \\left( ${xM} \\right) \\left( ${yM1} - ${xM} \\right)
			\\\\ &= ${coeff1} \\sqrt{3} \\pi ${coeff2} \\pi^2
		`)}
		${alignStar(`& \\textrm{Area of shaded region}
			\\\\ &= \\left( 4 - ${twoNinth}\\pi^2 \\right) - \\left( ${coeff1} \\sqrt{3} \\pi ${coeff2} \\pi^2 \\right)
			\\\\ &= \\left( 4 - \\frac{2 \\pi \\sqrt{3}}{3} \\right) \\textrm{ units}^2
		`)}
	`;

	return {
		body,
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
	qn10(),
];
