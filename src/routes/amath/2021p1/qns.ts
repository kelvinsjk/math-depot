import {
	align,
	alignStar,
	gatherStar,
	linebreak,
	math,
	gather,
	display,
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import {
	Fraction,
	Polynomial,
	SquareRoot,
	Expression,
	solveLinear,
	factorizeQuadratic,
	completeSquare,
	PowerFn,
	xPolynomial,
	Angle,
} from 'mathlify';
import { dydx as dydxString, dTwo as dTwoString } from '$lib/utils/calculus';
import { gradient, line } from '$lib/utils/coordinate';

// Question 1
export const qn1: () => AnswerObject = () => {
	const length = new Expression(3, new SquareRoot(3, 2));
	const area = new Expression(6, new SquareRoot(3, 5));
	const conjugate = length.conjugate();
	const den = length.times(conjugate);
	const num = area.times(conjugate);
	const width = num.times(den.terms[0].coeff.reciprocal());
	// const ans = `${math(`\\left(${width}\\right) \\textrm{ cm}.`)}`
	const body = `${alignStar(`& \\textrm{Width}
		\\\\ &= \\frac{${area}}{${length}}
		\\\\ &= \\frac{${area}}{${length}} \\times \\frac{${conjugate}}{${conjugate}}
		\\\\ &= \\frac{18-12\\sqrt{3}+15\\sqrt{3}-10(3)}{3^2-4(3)}
		\\\\ &= \\frac{${num}}{${den}}
		\\\\ &= \\left(${width}\\right) \\textrm{ cm}. \\; \\blacksquare
	`)}`;
	return {
		body,
	};
};

// Question 2
export const qn2: () => AnswerObject = () => {
	const x = new Polynomial([-1, -2], { variable: 'y', ascending: true });
	const eqn = x.times('x').plus(10);
	const [factor1, factor2, [y1, y2]] = factorizeQuadratic(eqn);
	const x1 = x.subIn(y1);
	const x2 = x.subIn(y2);
	const ans = `${math(`x_P = ${x1}`)} and ${math(`x_Q = ${x2}. \\; \\blacksquare`)}`;
	const body = `${align(`
			xy + 10 &= 0 \\\\
			x + ${x.negative()} &= 0 
		`)}
		From ${math(`(2),`)}
		${gather(`
			x = ${x} \\tag{3}
		`)}
		Substituting ${math(`(3)`)} into ${math(`(1),`)}
		${alignStar(`
			(${x})y + 10 &= 0
			\\\\ ${eqn} &= 0
			\\\\ ${eqn.changeAscending().negative()} &= 0
			\\\\ (${factor1})(${factor2}) &= 0
		`)}
		${display(`
			y = ${y1} \\textrm{ or } y = ${y2}
		`)}
		Substituting back into ${math(`(3),`)}
		${linebreak}${ans}
	`;
	return {
		body,
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	const poly = new Polynomial([3, -12, -2], { ascending: true });
	const completedSquare = completeSquare(poly);
	const coordinates = `\\left( -3, 21 \\right)`;
	//const ans = `${math(`${completedSquare}.`)}
	//	${linebreak}${math(`${coordinates}.`)}
	//`;
	const body = `${alignStar(`& ${poly}
			\\\\ &= -2 \\left( ${poly.divide(-2).changeAscending()} \\right)
			\\\\ &= -2 \\left( (x+3)^2 -3^2 - \\frac{3}{2} \\right)
			\\\\ &= ${completedSquare}. \\; \\blacksquare
		`)}
		Coordinates of turning point ${math(`= ${coordinates}. \\; \\blacksquare`)}
	`;
	return {
		body,
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	const y1 = new PowerFn(-2, { coeff: 3 });
	const y2 = new PowerFn(-1, { fx: new Polynomial([3, -5]), coeff: 4 });
	//const int1 = y1.integrate();
	const int2 = y2.integrate({ modulus: false });
	//const ans = `${math(`- \\frac{3}{x} + ${int2} + c.`)}`;
	const body = alignStar(`& \\int \\frac{3}{x^{-2}} + \\frac{4}{3x-5} \\; \\mathrm{d}x
		\\\\ &= \\int ${y1} + \\frac{4}{3x-5} \\; \\mathrm{d}x
		\\\\ &= \\frac{3x^{-1}}{-1} + ${int2} + c
		\\\\ &= - \\frac{3}{x} + ${int2} + c. \\; \\blacksquare
	`);
	return {
		body,
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	const a = 13,
		b = -6;
	const num = new Polynomial([a, b]);
	const x2 = new Polynomial([1, 0, 0]);
	const den2 = new Polynomial([2, -3]);
	const root2 = solveLinear(den2);
	const B = num.subIn(0).divide(den2.subIn(0));
	const C = num.subIn(root2).divide(x2.subIn(root2));
	// compare x^2
	// 0 = 2A + C
	const A = C.negative().divide(2);
	// typesetting
	const signA = A.isGreaterThan(0) ? '' : '-';
	const signB = B.isGreaterThan(0) ? '+' : '-';
	const signC = C.isGreaterThan(0) ? '+' : '-';
	const partial = `${signA} \\frac{${A.abs()}}{x} 
		${signB} \\frac{${B.abs()}}{x^2}
		${signC} \\frac{${C.abs()}}{${den2}}
	`;
	//const ans = math(`${partial}.`, { wrap: true });
	const body = `${gatherStar(`\\frac{${num}}{${x2}(${den2})}
			= \\frac{A}{x} + \\frac{B}{${x2}} + \\frac{C}{${den2}}
			\\\\ ${num} = Ax(${den2}) + B(${den2}) + C${x2}
		`)}
		Substituting ${math(`x=0,`)}
		${alignStar(`-6 &= B(-3)
			\\\\ B &= ${B}
		`)}
		Substituting ${math(`x=${root2},`)}
		${alignStar(`13\\left(${root2}\\right) ${b} &= C \\left( ${root2} \\right)^2
			\\\\ C &= ${C}
		`)}
		Comparing coefficients of ${math(`x^2,`)}
		${alignStar(`0 &= 2A + C
			\\\\ A &= ${A}
		`)}
		Hence
		${display(`\\frac{${num}}{${x2}(${den2})}
			= ${partial}. \\; \\blacksquare
		`)}
	`;
	return {
		body,
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// part a
	const p3 = 2,
		p2 = -1,
		p1 = -13;
	const sign2 = p2 > 0 ? '+' : '';
	const sign3 = p3 > 0 ? '+' : '';
	const PMinusK = new Polynomial([p3, p2, p1, 0]);
	const remainder = 6,
		subIn = 2;
	const kA = new Fraction(remainder).minus(PMinusK.subIn(subIn));

	// part b
	const kB = -6;
	const P = PMinusK.plus(kB);
	const c2 = 2,
		c0 = -3;
	const factor = new xPolynomial([c2, 'a', c0]);
	// P = (c2 x^2 + ax + c0)(bx+c)
	// x3: c2 b
	const b = new Fraction(p3).divide(c2);
	// x0: c0 c
	const p0 = P.coeffs[0];
	const c = p0.divide(c0);
	// x^2: c2 c + a b
	const a = new Fraction(p2).minus(c.times(c2)).divide(b);

	//const ansA = math(`k=${kA}.`);
	//const ansB = math(`a=${a}.`);
	const body = `${alignStar(`P(x) &= ${PMinusK} + k
		\\\\ P(${subIn}) &= ${remainder}
		\\\\ 6 &= ${p3}(${subIn})^3 ${sign2} ${p2}(${subIn})^2 ${sign3} (${subIn}) + k
		\\\\ k &= ${kA}. \\; \\blacksquare
	`)}`;
	const partB = `Since ${math(`${factor}`)} is a factor of ${math(`P,`)}
		${display(`${P} = (${factor})(bx+c)`)}
		where ${math(`b`)} and ${math(`c`)} are constants.
		Comparing coefficients,
		${alignStar(`x^3: \\quad ${p3} &= ${c2}b
			\\\\ b &= ${b}
			\\\\ x^0: \\quad ${p0} &= ${c0}c
			\\\\ c &= ${c}
			\\\\ x^2: \\quad ${p2} &= ${c2}c + ab
			\\\\ a &= ${a}. \\; \\blacksquare		
		`)}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 7
export const qn7: () => AnswerObject = () => {
	const max = 2,
		min = -8;
	const xMax = new Angle(new Fraction(1, 8));
	const xMin = xMax.times(3);
	const c = new Fraction(max + min, 2);
	const period = xMin.minus(xMax).times(2);
	const b = new Fraction(2).divide(period.coeff);
	const a = new Fraction(max - min, 2);
	const eqn = new Polynomial([a, c], { variable: `\\sin ${new Polynomial(b)}` });
	// typeset
	const ans = `The maximum ${math(`y\\textrm{-value}`)} is ${math(`${max}`)}
		and the minimum ${math(`y\\textrm{-value}`)} is ${math(`${min}.`)}
		${linebreak}${math(`c`)} is the average of the two, so
		${alignStar(` c &= \\frac{${max}+(${min})}{2}
			\\\\ &= ${c}. \\; \\blacksquare
		`)}
	`;
	const ansB = `The maximum occurs at ${math(`x = ${xMax}`)}
		and the minimum occurs at ${math(`x=${xMin}.`)} Hence
		${alignStar(`\\textrm{Period} &= 2 \\times \\left( ${xMin} - ${xMax} \\right)
			\\\\ &= ${period}
			\\\\ \\frac{2\\pi}{b} &= ${period}
			\\\\ b &= ${b}. \\; \\blacksquare
		`)}
	`;
	const ansC = math(`y = ${eqn}.`);
	const body = ans;
	const partB = ansB;
	const partC = `${alignStar(`a &= \\textrm{Amplitude}
			\\\\ &= \\frac{${max}-(${min})}{2}
			\\\\ &= ${a}
		`)}
		Hence the equation of the curve is ${ansC} ${math(`\\blacksquare`)}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	const AB = 80,
		BC = 50;
	const AP = new Polynomial(1);
	const QD = AP.times(2).changeAscending();
	const ABP = AP.times(AB).divide(2);
	const rectangle = AB * BC;
	const PD = AP.negative().plus(BC).changeAscending();
	const PDQ = QD.times(PD).divide(2);
	const CQ = QD.negative().plus(AB);
	const BCQ = CQ.times(BC).divide(2);
	const half = new Fraction(1, 2);
	const A = new Polynomial([rectangle]).minus(ABP).minus(PDQ).minus(BCQ);

	// part b
	const dAdx = A.differentiate();
	const x = solveLinear(dAdx);
	const AStationary = A.subIn(x);
	const dTwo = dAdx.differentiate();
	const dTwoIsPositive = dTwo.subIn(x).isGreaterThan(0);
	const nature = dTwoIsPositive ? 'Minimum' : 'Maximum';
	const sign = dTwoIsPositive ? '>' : '<';
	const [c, b] = A.coeffs;
	const bSign = b.isGreaterThan(0) ? '+' : '';
	const cSign = c.isGreaterThan(0) ? '+' : '';

	// typeset
	const ans = `${alignStar(`PD &= ${BC} - ${AP}
			\\\\ CQ &= ${AB} - ${QD}
		`)}
		${alignStar(`\\textrm{Area of } \\triangle ABP &= ${half} (${AB})${AP}
			\\\\ &= ${ABP}
			\\\\ \\textrm{Area of } \\triangle PDQ &= ${half} (${QD}) ( ${PD} )
			\\\\ &= ${PDQ}
			\\\\ \\textrm{Area of } \\triangle BCQ &= ${half} (${BC}) ( ${CQ} )
			\\\\ &= ${BCQ}
			\\\\ \\textrm{Area of rectangle }  &= ${AB} \\times ${BC}
			\\\\ &= ${rectangle}
		`)}
		${alignStar(` A &= ${rectangle} - ${ABP} - (${PDQ}) - (${BCQ})
			\\\\ &= ${A}. \\; \\blacksquare
		`)}
	`;
	const body = ans;
	//const ansB = `${nature} A = ${AStationary}.`
	const partB = `${display(`${dydxString('A')} = ${dAdx}`)}
		At stationary value of ${math(`A,`)} ${math(`${dydxString('A')} = 0.`)}
		${gatherStar(`${dAdx} = 0
			\\\\ x = ${x}
		`)}
		${alignStar(`A &= (${x})^2 ${bSign} ${b} (${x}) ${cSign} ${c}
			\\\\ &= ${AStationary}
		`)}
		${alignStar(`${dTwoString('A')} &= ${dTwo}
			\\\\ & ${sign} 0		
		`)}
		Hence the stationary value of ${math(`A=${AStationary}`)} and it is a
		${nature.toLowerCase()}. ${math(`\\blacksquare`)}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	// part a
	const mx1 = '\\frac{h}{2}',
		my1 = `\\frac{k}{2}`;
	const cx = 6,
		cy = 6;
	const ans = `Let ${math(`M`)} denote the mid-point of ${math(`BD`)}.
		${linebreak}${math(`M\\left(${mx1}, ${my1} \\right).`)}
		Since ${math(`ABCD`)} is a kite, ${math(`BD \\perp MC.`)}
		${alignStar(`m_{BD} \\cdot m_{MC} &= -1
			\\\\ \\frac{0-k}{h-0} \\cdot \\frac{${my1}-${cy}}{${mx1}-${cx}} &= -1
			\\\\ \\frac{-k}{h} \\cdot \\frac{k-12}{h-12} &= -1
			\\\\ \\frac{k}{h} \\cdot \\frac{k-12}{h-12} &= 1
		`)}
		${gatherStar(`
			k(k-12) = h(h-12)
			\\\\ k^2 - 12 k - h^2 + 12 h = 0
			\\\\ k^2 - h^2 - 12k + 12 h = 0
			\\\\ (k+h)(k-h) - 12 (k-h) = 0
			\\\\ (k+h-12)(k-h) = 0
			\\\\ k+h-12 = 0 \\quad \\textrm{ or } \\quad k - h = 0
		`)}
		Since ${math(`k \\neq k,`)}
		${gatherStar(`
			k+h-12 = 0
			\\\\ k+h = 12. \\; \\blacksquare
		`)}
	`;
	const body = ans;

	// part b
	const rhs = 12;
	const h = 4;
	const k = rhs - h;
	const mx = new Fraction(h, 2),
		my = new Fraction(k, 2);
	const m = gradient(mx, my, cx, cy);
	const AC = line(m, cx, cy);
	const ax = solveLinear(AC);
	const coordinates = `A\\left( ${ax}, 0 \\right)`;
	//const ansB = `${math(`${coordinates}.`)}`;
	const partB = `Given ${math(`h=${h},`)} ${math(`k=${rhs}-${h}=${k}.`)}
		${linebreak}Hence coordinates of ${math(`M = (${mx},${my}).`)}
		${linebreak}Gradient of ${math(`AC,`)}
		${alignStar(`m_{AC} &= m_{MC}
			\\\\ &= \\frac{${cy}-${my}}{${cx}-${mx}}
			\\\\ &= ${m}		
		`)}
		Hence equation of ${math(`AC:`)}
		${gatherStar(`y-${cy} = ${m} ( x - ${cx} )
			\\\\ y = ${AC}		
		`)}
		At ${math(`A, y=0.`)}
		${gatherStar(` ${AC} = 0
			\\\\ x = ${ax}
		`)}
		Hence coordinates of ${math(`${coordinates}. \\; \\blacksquare`)}
	`;

	// part c
	const area = new Fraction(h).minus(ax).times(cy);
	//const ans = `${math(`${area} \\textrm{ units}^2.`)}`
	const partC = `${alignStar(`& \\textrm{Area of kite}
			\\\\ &= 2 \\times \\textrm{ area of } \\triangle ADC
			\\\\ &= 2 \\times \\frac{1}{2} \\times AD \\times \\textrm{ height }
			\\\\ &= \\big(${h} - (${ax}) \\big) \\times ${cy}
			\\\\ &= ${area} \\textrm{ units}^2. \\; \\blacksquare
		`)}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 10
export const qn10: () => AnswerObject = () => {
	const ans = alignStar(`& \\textrm{LHS}
		\\\\ &= \\frac{\\sin \\theta}{1 - \\cos \\theta} - \\frac{1}{\\sin \\theta}
		\\\\ &= \\frac{\\sin^2 \\theta - (1 - \\cos \\theta)}{(1 - \\cos \\theta)\\sin \\theta}
		\\\\ &= \\frac{\\sin^2 \\theta + \\cos \\theta - 1}{(1 - \\cos \\theta)\\sin \\theta}
		\\\\ &= \\frac{(1-\\cos^2 \\theta) + \\cos \\theta - 1}{(1 - \\cos \\theta)\\sin \\theta}
		\\\\ &= \\frac{-\\cos^2 \\theta + \\cos \\theta}{(1 - \\cos \\theta)\\sin \\theta}
		\\\\ &= \\frac{\\cos \\theta ( -\\cos \\theta + 1)}{(1 - \\cos \\theta)\\sin \\theta}
		\\\\ &= \\frac{\\cos \\theta}{\\sin \\theta}
		\\\\ &= \\cot \\theta
		\\\\ &= \\textrm{RHS}. \\; \\blacksquare
	`);
	const body = ans;

	// part b
	const rhs = -2;
	const alpha = (Math.atan(1 / Math.abs(rhs)) / Math.PI) * 180;
	const theta1 = (180 - alpha) / 2;
	const theta2 = (360 - alpha) / 2;
	//const ansB = `${math(`\\theta = ${theta1.toFixed(1)}^\\circ`)} or
	//	${math(`\\theta = ${theta2.toFixed(1)}^\\circ.`)}
	//`;
	const partB = `${math(
		`0^\\circ \\leq \\theta \\leq 180^\\circ \\Rightarrow 0^\\circ \\leq 2 \\theta \\leq 360^\\circ.`,
		{ wrap: true },
	)}
		Using part (a), the given equation simplifies to
		${alignStar(
			`\\cot 2 \\theta &= -2
			\\\\ \\tan 2 \\theta &= - \\frac{1}{2}
		`,
		)}
		${alignStar(
			`\\textrm{Basic angle, } \\alpha &= \\tan^{-1} \\frac{1}{2}
				\\\\ &= ${alpha.toFixed(3)}^\\circ
		`,
		)}
		${alignStar(
			`2\\theta &= 180^\\circ - ${alpha.toFixed(
				3,
			)}^\\circ &\\textrm{ or } \\quad 2 \\theta &= 360^\\circ - ${alpha.toFixed(
				3,
			)}^\\circ
			\\\\ \\theta &= ${theta1.toFixed(1)}^\\circ \\;\\blacksquare &  \\theta &=
				${theta2.toFixed(1)}^\\circ. \\;\\blacksquare
		`,
		)}
	`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 11
export const qn11: () => AnswerObject = () => {
	const ans = `Let ${math(`\\angle ABC = \\alpha.`)}
		${linebreak}By the alternate segment theorem,
		${alignStar(`\\angle CAT &= \\angle ABC
			\\\\ &= \\alpha.`)}
		By the tangents from external point property,
		${alignStar(`\\angle ACT &= \\angle CAT
			\\\\ &= \\alpha.`)}
		Since ${math(`BA \\parallel CT,`)} by alternate angles,
		${alignStar(`\\angle BAC &= \\angle ACT
			\\\\ &= \\alpha.`)}
		Hence ${math(`\\angle ABC = \\angle BAC`)}
		so ${math(`\\triangle ABC`)} is isosceles. ${math(`\\blacksquare`)}
	`;
	const body = ans;

	// part b
	const ansB = `Since ${math(`\\angle ABC = \\alpha`)} and
		${math(`\\triangle ABC`)} is isosceles, by the angle sum of triangles property,
		${display(`\\angle BCA = 180^\\circ - 2 \\alpha.`)}
		By the tangents from external point property, ${math(`\\triangle CTA`)} is
		also isosceles. From the working in part (a), we have also shown that ${math(
			`\\angle CAT = \\alpha.`,
		)}
		Hence, by the angle sum of triangles property,
		${display(`\\angle CTA = 180^\\circ - 2\\alpha.`)}
		Hence ${math(`\\angle BCA = \\angle CTA. \\; \\blacksquare`)}
	`;
	const partB = ansB;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 12
export const qn12: () => AnswerObject = () => {
	const ans = alignStar(
		`6^x &= 5 \\times 3^{x+1}
		\\\\ 2^x \\cdot 3^x &= 5 \\cdot 3^x \\cdot 3
		\\\\ 2^x &= 15
		\\\\ \\lg 2^x &= \\lg 15
		\\\\ x \\lg 2 &= \\lg 15
		\\\\ x &= \\frac{\\lg 15}{\\lg 2}. \\; \\blacksquare
	`,
	);
	const body = ans;

	// part b
	const x2 = new Polynomial([1, 0, 0]);
	const linear = new Polynomial([1, 2]);
	const cubic1 = linear.times(x2);
	const cubic = cubic1.minus(Math.pow(3, 4));
	//const ansB = `${math(`${cubic}=0.`)}`;
	const partB = `${gatherStar(
		`\\log_3 x + \\log_9 (x+2) = 2
		\\\\ \\log_3 x + \\frac{\\log_3 (${linear})}{\\log_3 9} = 2
		\\\\ \\log_3 x + \\frac{\\log_3 (${linear})}{\\log_3 3^2} = 2
		\\\\ \\log_3 x + \\frac{\\log_3 (${linear})}{2} = 2
		\\\\ 2 \\log_3 x + \\log_3 (${linear}) = 4
		\\\\ \\log_3 x^2 + \\log_3 (${linear}) = 4
		\\\\ \\log_3 \\big(${x2}(${linear})\\big) = 4
		\\\\ \\log_3 (${cubic1}) = 4
		\\\\ ${cubic1} = 3^4
		\\\\ ${cubic} = 0. \\; \\blacksquare
		`,
	)}
	`;

	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 13
export const qn13: () => AnswerObject = () => {
	const dVdt = 500;
	const time = 1 * 60;
	const V1 = dVdt * time;
	const fourThird = new Fraction(4, 3);
	const r = Math.pow((V1 * 3) / 4 / Math.PI, 1 / 3);
	//const ans = `${math(`${r.toPrecision(3)} \\textrm{ cm}.`)}`;
	const body = `After 1 minute,
		${alignStar(
			`\\textrm{Volume} &= ${dVdt} \\times ${time}
			\\\\ &= ${V1}
			\\\\ ${fourThird} \\pi r^3 &= ${V1}
			\\\\ r &= ${r.toPrecision(5)}
			\\\\ &= ${r.toPrecision(3)} \\textrm{ cm (3 sf). } \\blacksquare
		`,
		)}
	`;
	// part a ii
	const vPoly = new Polynomial([fourThird, 0, 0, 0], { variable: '\\pi r' });
	const dVdr = vPoly.differentiate();
	// dVdt = dVdr * drdt
	const drdt = dVdt / dVdr.subInNumber(r) / Math.PI;
	//const ansAII = `${math(`${drdt.toPrecision(3)} \\textrm{ cm/s}.`)}`
	const partAII = `${alignStar(
		`V &= ${vPoly}
		\\\\ ${dydxString('V', 'r')} &= ${dVdr}
		\\\\ ${dydxString('V', 't')} &= ${dydxString('V', 'r')} \\times ${dydxString('r', 't')}
		\\\\ ${dydxString('r', 't')} &= ${dydxString('V', 't')} \\div ${dydxString('V', 'r')}
		\\\\ &= \\frac{${dVdt}}{4 \\pi (${r.toPrecision(5)})^2}
		\\\\ &= ${drdt.toPrecision(3)} \\textrm{ cm/s (3 sf). } \\blacksquare
	`,
	)}`;
	// part b
	const Pb = new Fraction(6, 5),
		Vb = new Fraction(2);
	const k = Pb.times(Vb);
	const dVdP = k.negative().divide(Pb.pow(2));
	const partB = `${alignStar(
		`PV &= k
			\\\\ k &= ${Pb.valueOf()}(${Vb.valueOf()})
			\\\\ &= ${k.valueOf()}
			\\\\ V & = \\frac{${k.valueOf()}}{P}
			\\\\ ${dydxString('V', 'P')} &= - \\frac{${k.valueOf()}}{P^2}
			\\\\ &=  \\frac{${k.valueOf()}}{${Pb.valueOf()}^2}
			\\\\ &= ${dVdP} \\textrm{ litres/atmospheres } \\blacksquare
		`,
	)}
	`;

	return {
		parts: [{ parts: [{ body }, { body: partAII }] }, { body: partB }],
	};
};

// Question 12
export const qn14: () => AnswerObject = () => {
	const fx = new Polynomial([4, 3], { ascending: true });
	const y = new PowerFn(new Fraction(1, 2), { fx });
	const { power: dydx } = y.differentiate();
	const xP = 4,
		yP = 4;
	const m1 = dydx.subIn(xP);
	const m2 = m1.negative().reciprocal();
	const normal = line(m2, xP, yP);
	const xQ = solveLinear(normal);
	const ans = `${math(`Q\\left( ${xQ}, 0 \\right).`)}`;
	const body = `${alignStar(
		` y &= ${y}
			\\\\ ${dydxString()} &= \\frac{1}{2} (3) (${fx})^{-\\frac{1}{2}}
			\\\\ &= \\frac{3}{2 \\sqrt{${fx}}}
		`,
	)}
		At ${math(`P,`)} when ${math(`x=${xP},`)}
		${alignStar(
			`${dydxString()} &= \\frac{3}{2\\sqrt{4+3(${xP})}}
			\\\\ &= ${m1}
			`,
		)}
		Hence the gradient of the normal at ${math(`P = ${m2}.`)}
		${linebreak}Equation of normal at ${math(`P:`)}
		${alignStar(
			`y - ${yP} &= ${m2} ( x - ${xP} )
			\\\\ y &= ${normal}
			`,
		)}
		At ${math(`Q, y=0.`)}
		${alignStar(
			`${normal} &= 0
			\\\\ x &= ${xQ}
			`,
		)}
		Hence the coordinates of ${ans} ${math(`\\blacksquare`)}
	`;

	// part b
	const triangle = xQ.minus(xP).times(yP).divide(2);
	const integral = y.definiteIntegral(0, xP);
	const area = triangle.plus(integral);
	const int = y.integrate() as PowerFn;
	//const ansB = `${math(`${area} \\textrm{ units}^2.`)}`;
	const partB = `${alignStar(
		`&\\textrm{Area under curve}
			\\\\ &= \\int_0^{${xP}} ${y} \\; \\mathrm{d}x
			\\\\ &= \\left[ \\frac{(${fx})^{\\frac{3}{2}}}{\\frac{3}{2}(3)}  \\right]_0^{${xP}}
			\\\\ &= \\left[ ${int}  \\right]_0^{${xP}}
			\\\\ &= ${int.subIn(xP)} - ${int.subIn(0)}
			\\\\ &= ${integral}
		`,
	)}
		${alignStar(
			`&\\textrm{Area of triangle}
				\\\\ &= \\frac{1}{2} \\times \\left( ${xQ} - ${xP} \\right) \\times ${yP}
				\\\\ &= ${triangle}
			`,
		)}
		${alignStar(
			`& \\textrm{Area of shaded region}
			\\\\ &= ${integral} + ${triangle}
			\\\\ &= ${area} \\textrm{ units}^2. \\; \\blacksquare
			`,
		)}
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
	qn14(),
];
