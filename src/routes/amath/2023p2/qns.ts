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
	Expression,
	SquareRoot,
	SLE,
	cramersRule,
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
		~${'align*'}
		\\angle BAD &= \\angle BAF \\text{ (common angle)} \\\\
		\\angle BDA &= \\angle FBA \\text{ (alternate segment theorem)}

		Hence by the AA similarity test,
		${`\\triangle ABD`}
		is similar to  
		${`\\triangle ABD`} ${qed}
	`;

	// b
	const partB = mathlify`
		Let ${`\\angle BXE = x`}

		~${'align*'}
		\\angle FED &= 90 \\degree \\text{ (right angle in semicircle with diameter } FD \\text{)} \\\\
		\\angle CXB &= 90 \\degree \\text{ (right angle in semicircle with diameter } BC \\text{)} \\\\
		\\angle BXE &= 180 \\degree - 90 \\degree \\text{ (adjacent angles on a straight line)} \\\\
		&= 90 \\degree \\\\
		\\angle BEC &= 180 \\degree - 90 \\degree - x \\text{ (angle sum in triangle)} \\\\
		&= 90 \\degree - x
		
		~${'align*'}
		& \\angle BEC + \\angle FBE \\\\
		& = 90 \\degree - x + (90 \\degree + x) \\\\
		&= 180 \\degree

		Hence by the converse of interior angles, ${`BF \\parallel EC`}

		Hence ${`EBFC`}
		is a trapezium ${qed}

`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	// a
	const initial = 86;
	const k = -0.06;
	const body = mathlify`
		~${'align*'}
		& \\text{ Initial temperature} \\\\
		& = ${initial} \\mathrm{e}^{${k}(0)} \\\\
		&= ${initial} \\degree \\text{C} ${qed}
	`;

	// b
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
		t = ${t.toPrecision(3)} \\text{ min} ${qed}
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
		t = ${t2.toPrecision(3)} \\text{ min} ${qed}
	`;

	return {
		parts: [{ body }, { body: partB }, { parts: [{ body: partCI }, { body: partC2 }] }],
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	// a
	const sqrt3 = new SquareRoot(3);
	const b = sqrt3.times(2);
	const d = sqrt3.times(2).square().valueOf() + 4;
	const t15 = new Expression(4, sqrt3.times(-2)).times(sqrt3).divide(6);
	const body = mathlify`
		$${''} \\tan 2A = \\frac{2 \\tan A}{1 - \\tan^2 A}

		Let ${'A = 15 \\degree'}
		$${''} \\tan 30 \\degree = \\frac{2 \\tan 15 \\degree}{1 - \\tan^2 15 \\degree}

		Let ${'\\tan 15 \\degree = x'}
		~${'gather*'}
		\\frac{1}{\\sqrt{3}} = \\frac{2x}{1-x^2} \\\\
		1 - x^2 = 2 \\sqrt{3}x \\\\
		x^2 + 2 \\sqrt{3}x - 1 = 0

		~${'align*'}
		x &= \\frac{-${b} \\pm \\sqrt{(${b})^2 - 4(1)({-1})}}{2(1)} \\\\
		&= \\frac{-${b} \\pm \\sqrt{${d}}}{2} \\\\
		&= \\frac{4 - ${b}}{2} \\text{ or } \\frac{{-4}-${b}}{2}

		Since ${'15 \\degree'}
		is acute, ${'x = \\tan 15 \\degree > 0'}

		Hence we have
		~${'align*'}
		\\tan 15 \\degree &= \\frac{4-${b}}{2}
		\\\\ &= 2 - ${b.divide(2)} ${qed}
	`;

	// b
	const conjugate = new Expression(1, sqrt3);
	const num = new Expression(sqrt3, 1).times(conjugate);
	const partB = mathlify`
		~${'align*'}
		& \\tan 15 \\degree - \\tan 105 \\degree \\\\
		&= 2 - \\sqrt{3} - \\tan (60\\degree + 45 \\degree) \\\\
		&= 2 - \\sqrt{3} - \\frac{\\tan 60 \\degree + \\tan 45 \\degree}{1 - \\tan 60 \\degree \\tan 45 \\degree} \\\\
		&= 2 - \\sqrt{3} - \\frac{${sqrt3} + 1}{1 - ${sqrt3}} \\\\
		&= 2 - \\sqrt{3} - \\frac{${sqrt3} + 1}{1 - ${sqrt3}} \\times \\frac{${conjugate}}{${conjugate}} \\\\
		&= 2 - \\sqrt{3} - \\frac{${num}}{1 - 3} \\\\
		&= 2 - \\sqrt{3} + \\sqrt{3} + 2 \\\\
		& = 4 ${qed}

	`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	const body = mathlify`
		~${'align*'}
		y &= 3 \\cos 3x - 5 \\sin 3x \\\\
		${dydx()} &= {-9} \\sin 3x - 15 \\cos 3x \\\\
		${d2ydx2()} &= {-27} \\cos 3x + 45 \\sin 3x

		~${'align*'}
		& p ${d2ydx2()} + q ${dydx()} + 14y + 34 \\sin 3x \\\\
		&= ({-27}p -15q + ${14 * 3} ) \\cos 3x + (45p - 9q - ${5 * 14} + 34 )\\sin 3x \\\\
		&= (42 - 27p - 15q) \\cos 3x + (45p-9q ${-5 * 14 + 34}) \\sin 3x

		~${'align*'}
		A &= 42 - 27p - 15q ${qed} \\\\
		B &= 45p - 9q - 36 ${qed}
	`;

	const [p, q] = cramersRule([27, 15], 42, [45, -9], 36);

	const partB = mathlify`
	~${'align'}
	27p + 15q &= 42  \\\\
	45p - 9q &= 36 \\tag{(2)}

	Solving simultaneously,
	$${`p= ${p}, \\; q = ${q} ${qed}`}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// a
	const fx = new oPolynomial([6, -7, -1, 2]);
	const fx2 = new Polynomial([6, -7, -1, 2]);
	const root = new Fraction(-1, 2);
	const factor = new oPolynomial([2, 1]);
	const { quotient, remainder } = longDivide(fx, factor);
	const [f2, f3] = fQ(quotient);
	const body = mathlify`
		~${'align*'}
		f\\left({${root}}\\right) &= ${fx2.replaceXWith(`\\left({${root}}\\right)`)} \\\\
		&= ${fx2.subIn(root)}

		By the Factor Theorem, ${factor}
		is a factor of ${fx} ${qed}

		$${`(${factor})`}(${f2})(${f3}) ${qed} 
	`;

	// b
	const x1Val = Math.log(2 / 3) / Math.log(2);
	const partB = mathlify`
		Let ${`x = 2^y`}
		~${'gather*'}
		6 \\left( 4^y \\right) + 2 \\left( 2^{-y} \\right) = 7 \\left( 2^y \\right) + 1 \\\\
		6 \\left( 2^y \\right)^2 + \\frac{2}{2^{y}} = 7 \\left( 2^y \\right) + 1 \\\\
		6x^2 + \\frac{2}{x} = 7x + 1 \\\\
		6x^3 + 2 = 7x^2 + x \\\\
		6x^3 - 7x^2 - x - 2 = 0 \\\\
		(${factor})(${f2})(${f3})

		~${'alignat*{3}'}
		x &= {- \\frac{1}{2}} & \\quad \\text{or} \\quad x &= \\frac{2}{3} & \\quad \\text{or} \\quad x &= 1 \\\\
		2^y &= {- \\frac{1}{2}} \\text{ (NA)} &  2^y &= \\frac{2}{3} & 2^y &= 1 \\\\
		&& \\ln 2^y &= \\ln \\frac{2}{3} & 2^y &= 2^0 \\\\
		&& y &= \\frac{\\ln \\frac{2}{3}}{\\ln 2} & y &= 1 ${qed} \\\\
		&&&= ${x1Val.toPrecision(3)} ${qed}
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
		~${'gather*'}
		\\text{Period} = \\frac{9\\pi}{2} - \\frac{7\\pi}{2} = \\pi \\\\
		\\frac{2 \\pi}{b} = \\pi \\\\
		b = 2 ${qed}

		Amplitude ${'=10'}
		@${'@br'}
		Since the point at ${'x=\\frac{7\\pi}{2}'}
		is a maximum rather than
		a minimum, 
		$${`a = -10`} ${qed}
	`;

	const partBI = mathlify`
		Amplitude ${'=5'}

		Hence if ${'c \\geq 5'},
		${'v \\geq 0'}
		for all ${'t'}
		cos the particle will never change direction.

		$${'\\text{Smallest }'} c = 5 ${qed}
	`;

	const s2 = -25 * Math.cos(0.2 * 2) + 8 * 2 + 25;
	const s3 = -25 * Math.cos(0.2 * 3) + 8 * 3 + 25;
	const partBII = mathlify`
		~${'align*'}
		v &= 5 \\sin 0.2 t + 8 \\\\
		s &= \\frac{-5 \\cos 0.2t}{0.2} + 8t + D \\\\
		&= -25 \\cos 0.2t + 8t + D

		When ${'t=0'},
		${'s=0'}

		~${'gather*'}
		-25 \\cos 0 + 8(0) + D = 0 \\\\
		D = 25

		$${'s = -25 \\cos 0.2t + 8t + 25'}

		When ${'t=2'}
		~${'align*'}
		s &= -25 \\cos 0.2(2) + 8(2) + 25' \\\\
			&= ${s2.toPrecision(5)}

		When ${'t=3'}
		~${'align*'}
		s &= -25 \\cos 0.2(3) + 8(3) + 25' \\\\
			&= ${s3.toPrecision(5)}

		~${'align*'}
		& \\text{Total distance travelled in third second} \\\\
		& = ${s3.toPrecision(5)} - ${s2.toPrecision(5)} \\\\
		&= ${(s3 - s2).toPrecision(3)} \\text{ m} ${qed}

	`;

	return {
		parts: [{ body }, { parts: [{ body: partBI }, { body: partBII }] }],
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	const alpha = (Math.atan(3 / 4) / Math.PI) * 180;

	const partA = mathlify`
		~${'align*'}
		& \\text{Area} \\\\
		& = 3 \\left( \\frac{1}{2} \\right) r^2 \\sin (180 \\degree - 2 \\theta) \\\\
		& = \\frac{3}{2} r^2 \\sin 2 \\theta ${qed}
	`;

	const partB = mathlify`
		~${'gather*'}
		\\text{Maximum area} = \\frac{3}{2} r^2 ${qed} \\\\
		2 \\theta = 90 \\degree \\\\
		\\theta = 45 \\degree ${qed} 
	`;

	const partC = mathlify`
		To be updated
	`;

	const theta = (Math.asin(2 / 5) / Math.PI) * 180 + alpha;

	const body = mathlify`
		~${'align*'}
		R &= \\sqrt{4^2 + 3^2} \\\\
		&= 5 ${qed} \\\\
		\\alpha &= \\tan^{-1} \\frac{3}{4} \\\\
		&= ${alpha.toPrecision(3)} \\degree ${qed}

		~${'align*'}
		5 \\sin(\\theta - \\alpha) &= 2 \\\\
		\\theta - \\alpha &= \\sin^{-1} \\frac{2}{5} \\\\
		&= ${theta.toFixed(1)} \\degree ${qed}



	`;
	return {
		parts: [{ body: partA }, { body: partB }, { body: partC }, { body }],
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	// a
	const xMinus15 = new Polynomial([1, -15]);
	const inner = new Polynomial([-1, 15]).square().plus(64);
	const body = mathlify`
		~${'align*'}
		CX &= \\sqrt{8^2 + (15-x)^2} \\\\
		&= \\sqrt{${inner}}

		$${''} T = \\frac{x}{5} + \\frac{\\sqrt{${inner}}}{3} ${qed}
	`;

	// b
	const working = new EquationWorking(xMinus15.times(-5).square(), inner.times(9));
	working.rhsZero();
	working.divide(16);

	const partB = mathlify`
	~${'align*'}
		${dydx(
			'T',
		)} &= \\frac{1}{5} + \\frac{1}{2} \\frac{${inner.differentiate()}}{3 \\sqrt{${inner}}} \\\\
		&= \\frac{1}{5} + \\frac{${inner.differentiate().divide(2)}}{3 \\sqrt{${inner}}} ${qed}

		At minimum,
		~${'gather*'}
		${dydx('T')} = 0 \\\\
		\\frac{1}{5} + \\frac{${inner.differentiate().divide(2)}}{3 \\sqrt{${inner}}}  = 0 \\\\
		\\frac{${inner.differentiate().divide(2)}}{3 \\sqrt{${inner}}}  = -\\frac{1}{5} \\\\
		${xMinus15.times(-5)} = 3 \\sqrt{${inner}} \\\\
		${xMinus15.times(-5).square()} = 9 (${inner}) \\\\
		${working} ${qed}
	`;

	working.clear();
	const [x1, x2] = working.factorizeQuadratic();
	const T = x1.divide(5).valueOf() + Math.sqrt(inner.subIn(x1).valueOf()) / 3;
	const part = T - Math.floor(T);
	const min = part * 60;
	const partC = mathlify`
		~${'gather*'}
		${working} \\\\
		x = ${x1} \\text{ or } x = ${x2}

		Since ${'x < 15,'}
		${`x = ${x1}`}

		~${'align*'}
		& \\text{Minimum time} \\\\
		&= \\frac{${x1}}{5} + \\frac{\\sqrt{${inner.replaceXWith(`(${x1})`)}}}{3} \\\\
		&= ${T.toPrecision(3)} \\text{ hours} \\\\
		&= ${Math.floor(T)} \\text{ hours } ${Math.round(min)} \\text{ minutes} ${qed}

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
