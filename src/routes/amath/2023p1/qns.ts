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
} from '../../emath/2023p2/mathlify-v3b';

import { mathlify } from '$lib/temml';
import { Fraction as oFrac } from 'mathlify';
import { dydx } from '$lib/utils/calculus';
const qed = `\\; \\blacksquare`;
const dx = `\\; \\mathrm{d}x`;

// Question 1
export const qn1: () => AnswerObject = () => {
	const line = new xPolynomial([2, 'c']);
	const curve = new xPolynomial([1, 3, 1]);
	const working = new EquationWorking(curve, line);
	working.rhsZero();
	const eqn = curve.minus(line);
	const [c, b, a] = eqn.coeffs;
	const d = eqn.quadraticDiscriminant();
	const working2 = new EquationWorking(d);
	working2.setAligned();
	working2.solveLinear();

	const body = mathlify`
		~${`gather*`}
		${working}

		Since the line is a tangent to the curve,
		~${'align*'}
		\\text{Discriminant} &= 0 \\\\
		${b}^2 - 4(${a})(${c}) &= 0 \\\\
		${working2} ${qed}
	`;
	return {
		body,
	};
};

// Question 2
export const qn2: () => AnswerObject = () => {
	const c = 18,
		b = 11,
		a = -2;
	const num = new Polynomial([c, b, a], { ascending: true });
	const d1 = new Polynomial([1, -1]);
	const d2 = new Polynomial([1, 2]);
	const den = new ExpressionProduct(d1, [d2, 2]);
	const exp = new RationalTerm(num, den);

	const x1 = solveLinear(d1);
	const x2 = solveLinear(d2);
	const A = num.subIn(x1).divide(d2.subIn(x1).square());
	const C = num.subIn(x2).divide(d1.subIn(x2));
	const B = num
		.subIn(0)
		.minus(d2.subIn(0).square().times(A))
		.minus(d1.subIn(0).times(C))
		.divide(d1.subIn(0))
		.divide(d2.subIn(0));

	const body = mathlify`
		~${`align*`}
		${exp} &= \\frac{A}{${d1}} + \\frac{B}{${d2}} + \\frac{C}{(${d2})^2} \\\\
		${num} &= A(${d2})^2 + B(${d1})(${d2}) + C(${d1})

		When ${`x = ${x1},`}
		~${'align*'}
		${`${num.subIn(x1)} &= A(${d2.subIn(x1)})^2`} \\\\
		A &= ${A}

		When ${`x = ${x2},`}
		~${'align*'}
		${`${num.subIn(x2)} &= C(${d1.subIn(x2)})`} \\\\
		C &= ${C}

		Comparing coefficients of ${`x^2`},
		~${'align*'}
		A + B &= ${a} \\\\
		B &= ${B}

		$${`${exp} = \\frac{${A}}{${d1}} - \\frac{${B.abs()}}{${d2}} + \\frac{${C}}{(${d2})^2}`} ${qed}

	`;
	return {
		body,
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	const body = mathlify`
		~${`align*`}
		& \\text{LHS} \\\\
		& = \\frac{\\cos^2 \\theta}{\\cosec^2 \\theta - 1} + \\frac{\\sin^2}{\\sec^2 \\theta + 1} \\\\
		& = \\frac{\\cos^2 \\theta}{\\cot^2 \\theta} + \\frac{\\sin^2}{\\tan^2 \\theta} \\\\
		& = \\cos^2 \\theta \\div \\frac{\\cos^2 \\theta}{\\sin^2 \\theta} + \\sin^2 \\theta \\div \\frac{\\sin^2 \\theta}{\\cos^2 \\theta} \\\\
		& = \\cos^2 \\theta \\times \\frac{\\sin^2 \\theta}{\\cos^2 \\theta} + \\sin^2 \\theta \\times \\frac{\\cos^2 \\theta}{\\sin^2 \\theta} \\\\
		& = \\sin^2 \\theta + \\cos^2 \\theta \\\\
		& = 1 \\\\
		& = \\text{RHS} ${qed}
	`;
	return {
		body,
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	// a
	const exp = new ExpFn(new Polynomial([-2, 0]));
	const ddx = dydx('', 'x');

	const body = mathlify`
		~${'align*'}
		& ${ddx} \\left( x ${exp} \\right) \\\\
		&= (1) ${exp} + x ${exp} ({-2}) \\\\
		&= ${exp} - 2x ${exp} ${qed}
	`;

	// b
	const partB = mathlify`
		From answer to part (a),
		~${'gather*'}
		\\int \\left( ${exp} - 2x ${exp} \\right) ${dx} = x ${exp} + C' \\\\
		\\int ${exp} ${dx} - 2 \\int x ${exp}  ${dx} = x ${exp} + C' \\\\
		2 \\int x ${exp} ${dx} = \\int ${exp} ${dx} - x ${exp} - C' \\\\
		2 \\int x ${exp} ${dx} = \\frac{${exp}}{{-2}} - x ${exp} - C' \\\\
		\\int x ${exp} ${dx} = {-\\frac{1}{4} ${exp}} - \\frac{1}{2} x ${exp} + C ${qed}
	`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	const alpha = Math.acos(Math.sqrt(2 / 3));

	const body = mathlify`
		~${`align*`}
		\\frac{\\cos \\theta + 4 \\sin \\theta}{2 \\cos \\theta + \\sin \\theta} &= \\frac{\\cos \\theta}{\\sin \\theta} \\\\
		\\cos \\theta \\sin \\theta + 4 \\sin^2 \\theta &= 2 \\cos^2 \\theta + \\sin \\theta \\cos \\theta \\\\
		4 \\sin^2 \\theta &= 2 \\cos^2 \\theta \\\\
		2 \\left( 1 - \\cos^2 \\theta \\right) &= \\cos^2 \\theta \\\\
		\\cos^2 \\theta &= \\frac{2}{3} \\\\
		\\cos \\theta &= \\pm \\sqrt{\\frac{2}{3}}

		~${'align*'}
		& \\text{Basic angle} \\\\
		\\alpha & = ${alpha.toPrecision(5)}

		Since ${`-\\frac{\\pi}{2} \\leq \\theta \\leq \\frac{\\pi}{2}`},
		$${`\\theta = {-${alpha.toPrecision(3)}} \\text{ or } \\theta = ${alpha.toPrecision(
			3,
		)}`} ${qed}

	`;
	return {
		body,
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// a
	const body = mathlify`
		~${'align*'}
		& f'(x) \\\\
		& = \\frac{2ax(x-a) - ax^2(1)}{(x-a)^2} \\\\
		& = \\frac{ax(2x-2a-x)}{(x-a)^2} \\\\
		& = \\frac{ax(x-2a)}{(x-a)^2} ${qed}
	`;

	// b
	const partB = mathlify`
		When ${`g`}
		decreases,

		~${'align*'}
		g'(x) &< 0 \\\\
		(x-a)^2 \\cdot \\frac{ax(x-2a)}{(x-a)^2} &< 0 \\\\
		ax(x-2a) &< 0 

		Since ${`a > 0`},
		$${`0 < x < 2a`}

		Since ${`x > a`},
		$${`a < x < 2a`}

		Hence ${`a=4`} ${qed}
	`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 7
export const qn7: () => AnswerObject = () => {
	const poly = new xPolynomial(['k', 4, ['k', -3]]);
	const d = poly.quadraticDiscriminant();
	const [c, b, a] = poly.coeffs;
	const working = new InequalityWorking(d, 0, { sign: '<' });
	working.divide(4);
	working.changeOrder([1, 2, 0]);
	working.times(-1);
	const roots = working.factorizeQuadratic();

	const body = mathlify`
		For the curve to be entirely below the ${'x'}\\text{-axis},
		$${'k < 0'} \\quad \\text{ and } \\quad \\text{discriminant} < 0

		~${`gather*`}
		${b}^2 - 4${a}(${c}) \\\\
		${working} \\\\
		${roots[0]} \\quad \\text{ or } \\quad ${roots[1]}

		Since ${`k < 0`},
		$${roots[0]} ${qed}
	`;
	return {
		body,
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	const line = new Polynomial([2, 12]);
	const x = Polynomial.ofDegree(1);
	const poly = x.square().minus(line.times(x)).plus(line.square().minus(63));
	const working = new EquationWorking(poly, 0);
	working.divide(3);
	const [x1, x2] = working.factorizeQuadratic();
	const [y1, y2] = [x1, x2].map((x) => line.subIn(x));
	const body = mathlify`
		Solving the two equations simultaneously,
		~${'gather*'}
		x^2 - x (${line}) + (${line})^2 = 63 \\\\
		x^2 - 2x^2 - 12x + ${line.square()} = 63 \\\\
		${working} \\\\

		~${'alignat*{3}'}
		x &= {${x1}} \\quad &\\text{ or }&& \\quad x &= {${x2}} \\\\
		y &= ${line.replaceXWith(`({${x1}})`)} \\quad &&& \\quad  y &= ${line.replaceXWith(
		`({${x2}})`,
	)} \\\\
		&= {${y1}} &&& &= ${y2}

		Hence the coordinates of the points are ${`({${x1}}, {${y1}})`} ${qed}
		and ${`({${x2}}, ${y2})`} ${qed}
	`;
	return {
		body,
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	// a
	const y = new Polynomial([1, 1, new Fraction(-1, 2), -2], { ascending: true });
	const fPrime = y.differentiate();
	const dTwo = fPrime.differentiate();
	const working = new EquationWorking(fPrime, 0);
	working.setAligned();
	working.times(-1, { hide: true });
	working.changeOrder([2, 1, 0]);
	const [x1, x2] = working.factorizeQuadratic();

	const body = mathlify`
		$${dydx()} = ${fPrime}

		At stationary points,
		~${'align*'}
		${dydx()} &= 0 \\\\
		${working}

		$${`x = {${x1}}`} ${qed} \\quad \\text{ or } \\quad ${`x = ${x2}`} ${qed}
	`;

	// b
	const working2 = new EquationWorking(dTwo, 0);
	working2.setAligned();
	const xP = working2.solveLinear();
	const mid = x1.plus(x2).divide(2);
	const partB = mathlify`
		$${d2ydx2()} = ${dTwo}

		At point of maximum gradient,
		~${'align*'}
		${d2ydx2()} &= 0 \\\\
		${working2}

		Hence the ${'x'}\\text{-coordinate}
		of ${'P'}
		is ${`{${xP}}`}

		~${'align*'}
		\\frac{\\mathrm{d}^3 y}{\\mathrm{d}x^3}	& = {${dTwo.differentiate()}} \\\\
		& < 0

		so the gradient is a maximum

		${'x'}\\text{-coordinate}
		of midpoint of ${'AB'}
		is ${''}\\frac{{${x1}} + ${x2}}{2} = {${mid}} 

		Hence ${'P'}
		and the midpoint of ${'AB'}
		have the same ${'x'}\\text{-coordinate} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 10
export const qn10: () => AnswerObject = () => {
	// a
	const xC = -5,
		yC = 12,
		r = 13;
	const body = mathlify`
		~${'gather*'}
		x^2 + y^2 + 10x - 24y = 0 \\\\
		(x+5)^2 - 5^2 + (y-12)^2 - 12^2 = 0 \\\\
		(x+5)^2 + (y-12)^2 = 169

		Hence the coordinates of ${'C'}
		are ${`({${xC}}, {${yC}})`} ${qed}
		and the radius is ${`{${r}}`} ${qed}
	`;

	// b
	const partB = mathlify`
		When ${'x = 0'},
		~${'gather*'}
		y^2 - 24y = 0 \\\\
		y(y-24) = 0 \\\\
		y = 0 \\quad \\text{ or } \\quad y = 24

		Coordinates of points at which the circle cuts the ${'y'}\\text{-axis}
		are ${`({${0}}, {${0}})`} ${qed}
		and ${`({${0}}, {${24}})`} ${qed}
	`;

	const m = new oFrac(yC, xC);
	const poly1 = new Polynomial([1, 5]);
	const poly2 = new Polynomial([new Fraction(-12, 5), -12]);
	const working = new EquationWorking(poly1.square().plus(poly2.square()), 9 * 169);
	working.setAligned();
	working.rhsZero();
	working.times(25).divide(169);
	const [x1, x2] = working.factorizeQuadratic();
	const [y1, y2] = [x1, x2].map((x) => x.times(new Fraction(-12, 5)));
	const partC = mathlify`
		~${'align*'}
		& \\text{Gradient of } OC \\\\
		& = \\frac{${yC}-0}{${xC}-0} \\\\
		& = ${m}

		Hence the equation of line ${'OC'}
		is ${'y = '}${m}x

		Since ${'X'}
		lies on ${'OC'},
		let the coordinates of ${'X'}
		be ${`\\left( {x}, {${m}x} \\right)`}

		~${'align*'}
		\\text{Distance } CX &= 3 \\times \\text{Distance } OC \\\\
		\\sqrt{(x+5)^2 + \\left(${m}x-12 \\right)^2} &= 3(13) \\\\
		${poly1.square()} + ${poly2.square()} &= 39^2 \\\\
		${working}

		~${'alignat*{3}'}
		x &= {${x1}} \\quad &\\text{ or }&& \\quad x &= {${x2}} \\\\
		y &= {${m}}\\left({${x1}}\\right) \\quad &&& \\quad y &= {${m}}\\left({${x2}}\\right) \\\\
		&= ${y1} \\quad &&& \\quad &= ${y2}

		Hence the possible coordinates of ${'X'}
		are ${`\\left( {${x1}}, {${y1}} \\right)`} ${qed}
		and ${`\\left( {${x2}}, {${y2}} \\right)`} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 11
export const qn11: () => AnswerObject = () => {
	// a
	const drdt = dydx('r', 't');
	const r0 = 1;
	const drdt0 = 0.5;
	const k = drdt0;

	const body = mathlify`
		When ${`t=0,`}
		${`${drdt}=${drdt0}`}

		~${'align*'}
		${drdt0} &= \\frac{k}{2(0)+1} \\\\
		k &= ${k} ${qed}
	`;

	// b
	const dt = `\\; \\mathrm{d}t`;
	const C = r0;
	const partB = mathlify`
		~${'align*'}
		r &= \\int \\frac{${k}}{2t+1} ${dt} \\\\
		&= \\frac{${k} \\ln (2t+1)}{2} + C \\\\
		&= \\frac{\\ln (2t+1)}{4} + C

		When ${`t=0, r=${r0}`},
		~${'align*'}
		${r0} &= \\frac{\\ln (2(0)+1)}{4} + C \\\\
		C &= ${C}

		Hence
		$${`r = \\frac{\\ln (2t+1)}{4} + ${C}`} ${qed}
	`;

	// c
	const dAdr = dydx('A', 'r');
	const t = 3;
	const dAdt = dydx('A', 't');
	const rate = (Math.PI * 2 * (Math.log(7) / 4 + C) * k) / (2 * t + 1);

	const partC = mathlify`
		After expanding for ${t}
		seconds,

		~${'align*'}
		r &= \\frac{\\ln (2(3)+1)}{4} + ${C} \\\\
		&= \\frac{\\ln 7}{4} + ${C} \\\\

		~${'align*'}
		A &= \\pi r^2 \\\\
		${dAdr} &= 2 \\pi r

		~${'align*'}
		${dAdt} &= ${dAdr} \\times ${drdt} \\\\
		&= 2 \\pi r \\times \\frac{${k}}{2t+1} \\\\
		&= 2 \\pi \\left( \\frac{\\ln 7}{4} + ${C} \\right) \\times \\frac{${k}}{2(3)+1} \\\\
		&= ${rate.toPrecision(3)} \\text{ cm}^2\\text{/s} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 12
export const qn12: () => AnswerObject = () => {
	// a
	const body = mathlify`
	When ${`t = 0`},
		$${'h = 1.75'} ${qed}
	`;

	// b
	const a = new Fraction(-1, 2).square().times(5).plus(new Fraction(7, 4));
	const partB = mathlify`
		~${'align*'}
		h &= 1.75 + 5t - 5t^2 \\\\
		&= -5 (t^2 - t) + 1.75 \\\\
		&= -5 \\Big( (t - 0.5)^2 - 0.5^2 \\Big) + 1.75 \\\\
		&= ${a} - 5 (t - 0.5)^2

		~${'align*'}
		a &= ${a} ${qed} \\\\
		b &= {-5} ${qed} \\\\
		c &= {-0.5} ${qed}
	`;

	// c
	const partC = mathlify`
		Hence the maximum height attained by the ball is ${a} \\text{m} ${qed}
		and this occurs at ${`t = -0.5 \\text{s}`} ${qed}
	`;

	const partD = mathlify`
		Since the ball did not start from ${'h = 0'},
		it will take longer than twice the time taken in part (c) to reach the ground ${qed}
	`;

	const poly = new Polynomial([new Fraction(7, 4), 5, -5], {
		variable: 't',
		ascending: true,
	});
	const rhs = 2;
	const working = new EquationWorking(poly, rhs, { aligned: true });
	working.rhsZero();
	working.times(-4);
	const [t1, t2] = solveQuadraticNumerical(working.lhs);
	const partE = mathlify`
		When ${`h = ${rhs}`},
		~${'align*'}
		${working}

		~${'align*'}
		t &= \\frac{20 \\pm \\sqrt{20^2 - 4(20)}}{2(1)} \\\\
		&= {${t1.toPrecision(5)}} \\text{ or } {${t2.toPrecision(5)}}

		~${'align*'}
		& \\text{Length of time ball is at least 2m } \\\\
		&= ${t2.toPrecision(5)} - ${t1.toPrecision(5)} \\\\
		&= ${(t2 - t1).toPrecision(3)} \\text{s} ${qed} 
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }, { body: partD }, { body: partE }],
	};
};

// Question 13
export const qn13: () => AnswerObject = () => {
	// a
	const xA = 2;
	const xB = -8;
	const yB = -7;
	const yX = new Fraction(-13, 2);
	const body = mathlify`
		~${'align*'}
		& \\text{Gradient of } AB \\\\
		& = \\frac{{${yB}} - h}{${xB} - {${xA}}} \\\\
		& = \\frac{7+h}{10}

		~${'align*'}
		& \\text{Gradient of perpendicular bisector} \\\\
		&= {-\\frac{10}{7+h}} ${qed}
	`;

	// b
	const lhs = new Polynomial([-6, -1], { variable: 'h', ascending: true });
	const den = new Polynomial([7, 1], { variable: 'h', ascending: true });
	const num = new Polynomial([1, 3], { variable: 'h' }).times(20).negative();
	const lhs2 = lhs.times(den);
	const working = new EquationWorking(lhs2, num);
	working.swap({ hide: true });
	working.rhsZero();
	const [h1, h2] = working.factorizeQuadratic();

	const partB = mathlify`
		~${'align*'}
		& \\text{Midpoint of } AB \\\\
		& = \\left( \\frac{${xA} + ({${xB}})}{2}, \\frac{{${yB}} + h}{2} \\right) \\\\
		& = \\left( {-3}, \\frac{h-7}{2} \\right)

		Equation of perpendicular bisector of ${'AB'}
		~${'gather*'}
		y - \\left( \\frac{h-7}{2} \\right) = {-\\frac{10}{7+h}} \\left( x + 3 \\right) \\\\

		Substituting ${`\\left( h, {${yX}} \\right)`}
		into the equation of the perpendicular bisector,
		~${'gather*'}
		{${yX}} - \\left( \\frac{h-7}{2} \\right) = {-\\frac{10}{7+h}} \\left( h + 3 \\right) \\\\
		-13 - h + 7 = - \\frac{20(h+3)}{7+h} \\\\
		(${lhs})(${den}) = ${num} \\\\
		${working} \\\\
		h = {${h1}} ${qed} \\quad \\text{ or } \\quad h = {${h2}} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }],
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
	qn11(),
	qn12(),
	qn13(),
];
