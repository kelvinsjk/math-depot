import type { AnswerObject } from '$lib/interfaces';

import {
	Term,
	RationalTerm,
	Polynomial,
	Expression,
	Fraction,
	factorizeQuadratic,
} from './mathlify-v3/src';

import { mathlify } from '$lib/temml';
const qed = `\\; \\blacksquare`;

// Question 1
export const qn1: () => AnswerObject = () => {
	const money = 480;
	const sima = 9;
	const ken = 7;
	const total = sima + ken;
	const simaShare = new Fraction(sima).divide(total);
	const kenShare = new Fraction(ken).divide(total);
	const simaMoney = simaShare.times(money);
	const kenMoney = kenShare.times(money);

	const body = mathlify`
		$${'\\begin{align*}'}
			&\\text{Amount Sima receives} \\\\
			&= ${money} \\times \\frac{${sima}}{${sima} + ${ken}} \\\\
			&= \\$${simaMoney} ${qed}
		\\end{align*}

		$${'\\begin{align*}'}
			&\\text{Amount Ken receives} \\\\
			&= ${money} \\times \\frac{${ken}}{${sima} + ${ken}} \\\\
			&= \\$${kenMoney} ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 2
export const qn2: () => AnswerObject = () => {
	// a
	const ratio = 0.9301;
	const alpha = (Math.asin(ratio) / Math.PI) * 180;
	const x2 = 180 - alpha;
	const body = mathlify`
		$${`\\sin^{-1}(${ratio.toFixed(4)}) = ${alpha.toFixed(3)}^\\circ`}

		$${`x = ${alpha.toFixed(1)}^\\circ`} ${qed}
		\\quad \\textrm{ or } \\quad
		x=${x2.toFixed(1)}^\\circ ${qed}
	`;
	// b
	const radians = 1.36;
	const degrees = (radians / Math.PI) * 180;
	const partB = mathlify`
		$${'\\begin{align*}'}
			& ${radians.toFixed(2)} \\times \\frac{180^\\circ}{\\pi} \\\\
			&= ${degrees.toFixed(1)}^\\circ ${qed}
		\\end{align*}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	// a
	const term = new Term(2, ['c', 3], ['d', 2]);
	const pow = 3;
	const ans = term.pow(pow);
	const body = mathlify`
			$${'\\begin{align*}'}
				& \\left( ${term} \\right)^${pow} \\\\
				&= ${ans} ${qed}
			\\end{align*}
		`;
	// b
	const partB = mathlify`
			$${'\\begin{align*}'}
				& 16 \\times 5^4 + 9 \\times 25^2 \\\\
				& = 16 \\times 5^4 + 9 \\times (5^2)^2 \\\\
				& = 16 \\times 5^4 + 9 \\times 5^4 \\\\
				& = (16 + 9) \\times 5^4 \\\\
				& = 25 \\times 5^4 \\\\
				& = 5^2 \\times 5^4 \\\\
				& = 5^6
			\\end{align*}

			Hence ${`k`} = 6 ${qed}
		`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	// a
	const body = mathlify`
			Since all the powers of ${'p'},
			${'q'}
			and ${'r'}
			are even,
			${'M'}
			is a perfect square. ${qed}
		`;
	// b
	const partBI = mathlify`
				$${''}
					${`k`} = 2 \\times 7^2 ${qed}
			`;
	const partBII = mathlify`
				$${''}
					${`\\text{LCM}`} = 2^{20} \\times 7^{10} \\times 11^{15} ${qed}
			`;
	return {
		parts: [{ body }, { parts: [{ body: partBI }, { body: partBII }] }],
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	// a
	const body = mathlify`
				As the interest is compounded every month, the interest
				earned every month will also earn interest so the first
				year's interest will be higher
				than ${'3\\%'} ${qed}
			`;
	// b
	const money = 4500;
	const rate = 0.25;
	const months = 12;
	const total = money * Math.pow(1 + rate / 100, months);
	const partB = mathlify`
				$${'\\begin{align*}'}
					& ${money} \\left( 1 + \\frac{${rate.toFixed(2)}}{100} \\right)^{${months}} \\\\
					& = \\$${total.toFixed(2)} ${qed}
				\\end{align*}
			`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// a
	const b = -25 + 49;
	const body = mathlify`
		$${'\\begin{align*}'}
			& x^2 - 14x + b \\\\
			& = (x-7)^2 - 7^2 + b \\\\
			& = (x-7)^2 + b - 49 \\\\
		\\end{align*}

		Hence ${`a = -7`} ${qed}

		$${'\\begin{align*}'}
			b - 49 &= -25 \\\\
			b &= -25 + 49 \\\\
			b &= ${b} ${qed}
		\\end{align*}
	`;
	// b
	const partB = mathlify`
		$${`x = 7 ${qed}`}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 7
export const qn7: () => AnswerObject = () => {
	// a
	const stamps = 550;
	const increase = 18;
	const final = (stamps * (100 + increase)) / 100;
	const body = mathlify`
			$${'\\begin{align*}'}
				& ${stamps} \\times \\frac{${100 + increase}}{100} \\\\
				& = ${final} ${qed}
			\\end{align*}
		`;
	// b
	const aus = 28;
	const europe = 55;
	const asia = 100 - europe;
	const asiaAmount = 81;
	const eurAsia = asiaAmount * (100 / asia);
	const total = eurAsia * (100 / (100 - aus));
	const partB = mathlify`
		$${'\\begin{align*}'}
			& \\text{Total from Europe and Asia} \\\\
			&= ${asiaAmount} \\times \\frac{100}{${asia}} \\\\
			& = ${eurAsia}
		\\end{align*}
		
		$${'\\begin{align*}'}
			& \\text{Total postcards} \\\\
			&= ${eurAsia} \\times \\frac{100}{100 - ${aus}} \\\\
			& = ${total} ${qed}
		\\end{align*}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	// b
	const body = mathlify`
		$${'h'} = 121 ${qed}
	`;
	// a
	const partAI = mathlify`
			$${'\\text{Median} = 114'} ${qed}
		`;
	const q3 = 125;
	const q1 = 106;
	const iqr = q3 - q1;
	const partBII = mathlify`
			$${'\\begin{align*}'}
				& \\text{Interquartile range} \\\\
				& = ${q3} - ${q1} \\\\
				& = ${iqr} ${qed}
			\\end{align*}
		`;
	// c
	const heights = [
		[95, 3],
		[105, 13],
		[115, 8],
		[125, 10],
		[135, 6],
	];
	const total = heights.reduce((acc, [, f]) => acc + f, 0);
	const mean = heights.reduce((acc, [h, f]) => acc + h * f, 0) / total;
	const sumSquares = heights.reduce((acc, [h, f]) => acc + Math.pow(h, 2) * f, 0);
	const sd = Math.sqrt(sumSquares / total - Math.pow(mean, 2));
	const partCI = mathlify`
		$${'\\begin{align*}'}
			& \\textrm{Mean} \\\\
			& \\approx \\frac{95\\times 3 + \\dotsb + 135\\times 6}{3 + \\dotsb + 6} \\\\
			& = ${mean.toPrecision(3)} ${qed}
		\\end{align*}
	`;
	const partCII = mathlify`
	$${'\\begin{align*}'}
	& \\textrm{Standard deviation} \\\\
	& \\approx \\sqrt{\\frac{95^2\\times 3 + \\dotsb + 135^2\\times 6}{3 + \\dotsb + 6} - \\left( ${mean.toPrecision(
		5,
	)} \\right)^2 } \\\\
	& = ${sd.toPrecision(3)} ${qed}
\\end{align*}
	`;
	return {
		parts: [
			{ parts: [{ body: partAI }, { body: partBII }] },
			{ body },
			{ parts: [{ body: partCI }, { body: partCII }] },
		],
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	const sgd = 780;
	const rate = 1.5953;
	const euros = sgd / rate;
	const euros2 = euros + 1;
	const rate2 = euros2 / sgd;

	const body = mathlify`
		$${'\\begin{align*}'}
			&\\text{Euros received in France} \\\\
			&= ${sgd} \\div ${rate} \\\\
			&= \\$${euros.toFixed(5)}
		\\end{align*}

		$${'\\begin{align*}'}
			&\\text{Rate in Singapore} \\\\
			&= \\left( ${euros.toFixed(5)} + 1 \\right) \\div ${sgd} \\\\
			&= \\euro ${rate2.toPrecision(3)} ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 10
export const qn10: () => AnswerObject = () => {
	const body = mathlify`
		$${'\\begin{align*}'}
			\\frac{q-3}{p-(-2)} &= \\frac{1}{3} \\\\
			3(q-3) &= p+2 \\\\
			p &= 3q - 11 ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 11
export const qn11: () => AnswerObject = () => {
	const num1 = new Polynomial([3, 0], { variable: 'a' });
	const denom1 = new Polynomial([4, -1], { variable: 'a' });
	const denom2 = new Polynomial([3, 1], { variable: 'a' });
	const term1 = new RationalTerm(num1, denom1);
	const term2 = new RationalTerm(2, denom2);
	const body = mathlify`
		$${'\\begin{align*}'}
			& ${term1} - ${term2} \\\\
			&= \\frac{(${num1})(${denom2})}{(${denom1})(${denom2})} - \\frac{2(${denom1})}{(${denom1})(${denom2})} \\\\
			&= \\frac{${num1.times(denom2)} - (${denom1.times(2)}) }{(${denom1})(${denom2})} \\\\
			&= ${term1.minus(term2)} ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 12
export const qn12: () => AnswerObject = () => {
	// b
	const exp1 = new Expression([2, 'x'], [3, 'a']);
	const exp2 = new Expression([5, 'x'], [-2, 'a']);
	const body = mathlify`
		$${''} ${exp1.times(exp2)} ${qed}
	`;
	// a
	const partAI = mathlify`
			$${'xy(x^2 + y^2)'} ${qed}
		`;
	const partBII = mathlify`
			$${'\\begin{align*}'}
				& 5c (3d - 2e) + 4d (3d-2e) \\\\
				& = (5c + 4d) (3d-2e) ${qed}
			\\end{align*}
		`;
	return {
		parts: [{ parts: [{ body: partAI }, { body: partBII }] }, { body }],
	};
};

// Question 13
export const qn13: () => AnswerObject = () => {
	const red = 12;
	const white = 7;
	const blue = 6;
	const num = new Polynomial([1, white], { variable: 'n' });
	const denom = new Polynomial([1, red + white + blue], { variable: 'n' });
	const term1 = new RationalTerm(num, denom);
	const body = mathlify`
		$${'\\begin{align*}'}
			${term1} &= \\frac{3}{5} \\\\
			${num.times(5)} &= ${denom.times(3)} \\\\
			2n &= 40 \\\\
			n &= 20 ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 14
export const qn14: () => AnswerObject = () => {
	const body = mathlify`
		Since ${'D'}
		is equidistant from ${'A, B'}
		and ${'C'},
		we can draw a circle passing through ${'A, B'}
		and ${'C'}
		with ${'D'}
		as the center.

		Hence, ${'AC'}
		will be the diameter of the circle
		and by the right angle in semicircle property,
		${'\\angle ABC'}
		is a right angle. ${qed}
	`;
	return {
		body,
	};
};

// Question 15
export const qn15: () => AnswerObject = () => {
	const t1 = new Polynomial([2, -1], { variable: 'n' });
	const f1 = new Polynomial([1, -5], { variable: 'n' });
	const f2 = new Polynomial([2, -1], { variable: 'n' });
	const ans = t1.square().minus(f1.times(f2).times(2));
	const body = mathlify`
		$${'\\begin{align*}'}
			& (${t1})^2 - 2(${f1})(${f2}) \\\\
			& = ${t1.square()} - 2 (${f1.times(f2)}) \\\\
			& =  ${t1.square()} -4n^2 + 22n - 10 \\\\
			& =  ${t1.square().minus(f1.times(f2).times(2))} \\\\
			& = 3 (${ans.divide(3)})
		\\end{align*}

		For all integer values of ${'n'},
		${ans.divide(3)}
		is an integer so
		${'3'}(${ans.divide(3)})
		is a multiple of ${'3'}. ${qed}
	`;
	return {
		body,
	};
};

// Question 16
export const qn16: () => AnswerObject = () => {
	const body = mathlify`
		As the solids are geometrically similar, since the dimensions for
		the tin for 2020
		are
		three times larger, the chart implies
		the sales are ${'27'}
		times larger as the
		volume of the tin is ${'3^3 = 27'}
		times larger. ${qed}
	`;
	return {
		body,
	};
};

// Question 17
export const qn17: () => AnswerObject = () => {
	const partA = `<div><img style="display:block;margin:auto;max-width:250px" alt="q1-diagram" src="/Venn_2023p1q17a.png" loading="lazy" /></div>`;
	const body = mathlify`
		$${`(A \\cup B)' \\cup (A \\cap B)`} ${qed}
	`;
	return {
		parts: [{ body: partA }, { body }],
	};
};

// Question 18
export const qn18: () => AnswerObject = () => {
	// a
	const body = mathlify`
		By similar triangles,
			$${'\\begin{align*}'}
				\\frac{h}{20} &= \\frac{r}{10} \\\\
				\\frac{20-d}{2} &= r \\\\
				2r &= 20 - d \\\\
				d &= 20 - 2r ${qed}
			\\end{align*}
		`;
	// b
	const d = 20 - Math.pow(1000 / 2, 1 / 3) * 2;
	const partB = mathlify`
		$${'\\begin{align*}'}
			\\frac{1}{3} \\pi r^2 h &= \\frac{1}{3} \\pi (10^2) (20) - \\frac{1}{3} \\pi r^2 h \\\\
			2 \\pi r^2 h &= 2000 \\pi \\\\
			r^2 (20 - d) &= 1000 \\\\
			r^2 (20 - (20-2r)) &= 1000 \\\\
			2r^3 &= 1000 \\\\
			r &= \\sqrt[3]{\\frac{1000}{2}} \\\\
		\\end{align*}

		$${'\\begin{align*}'}
			d &= 20 - 2r \\\\
			&= ${d.toPrecision(3)} ${qed}
		\\end{align*}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 19
export const qn19: () => AnswerObject = () => {
	const body = `<div><img style="display:block;margin:auto;max-width:250px;max-height:80vh" alt="q1-diagram" src="/Quadratic_2023p1q19.png" loading="lazy" /></div>`;
	return {
		body,
	};
};

// Question 20
export const qn20: () => AnswerObject = () => {
	const num = new Polynomial([3, -8, -16]);
	const d1 = new Polynomial([2, 1]);
	const d2 = new Polynomial([1, 3]);
	const den = d1.square().minus(d2.square());
	const f1 = factorizeQuadratic(num);
	const f2 = factorizeQuadratic(den);
	const body = mathlify`
		$${'\\begin{align*}'}
			& \\frac{${num}}{${d1.square()} - (${d2.square()})} \\\\
			&= \\frac{${num}}{${den}} \\\\
			&= \\frac{${f1}}{${f2}} \\\\
			&= \\frac{x-4}{x-2} ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 21
export const qn21: () => AnswerObject = () => {
	// a
	const row1 = [4, 3];
	const row2 = [5, 2];
	const col2 = [49.2, 68.5];
	const col3 = [16.1, 4.2];
	const A11 = 25.8;
	const t11Partial = row1[0] * A11;
	const t12 = row1.reduce((acc, v, i) => acc + v * col2[i], 0);
	const t13 = row1.reduce((acc, v, i) => acc + v * col3[i], 0);
	const t21Partial = row2[0] * A11;
	const t22 = row2.reduce((acc, v, i) => acc + v * col2[i], 0);
	const t23 = row2.reduce((acc, v, i) => acc + v * col3[i], 0);
	const body = mathlify`
		$${'\\begin{pmatrix}'}
			${t11Partial} + 3x & ${t12} & ${t13} \\\\
			${t21Partial} + 2x & ${t22} & ${t23}
		\\end{pmatrix} ${qed}
		`;
	// b
	const partB = mathlify`
		$${'\\begin{align*}'}
			${t11Partial} + 3x &= ${t21Partial} + 2x + 5.6 \\\\
			x &= ${t21Partial - t11Partial + 5.6} ${qed}
		\\end{align*}
	`;
	// c
	const partC = mathlify`
		$${'\\begin{pmatrix}'}
			1.6 \\\\
			2.8
		\\end{pmatrix} ${qed}
		`;
	// b
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 22
export const qn22: () => AnswerObject = () => {
	// a
	const l1 = new Expression([4, 'x'], [-1, 'y']);
	const b1 = new Expression([3, 'x']);
	const l2 = new Expression([3, 'x'], [2, 'y']);
	const b2 = new Expression([2, 'x']);
	const a1 = l1.times(b1);
	const a2 = l2.times(b2);
	const body = mathlify`
		$${'\\begin{align*}'}
			(${l1})(${b1}) &= (${l2})(${b2}) \\\\
			${a1} &= ${a2} \\\\
			7yx &= 6x^2 \\\\
			y &= \\frac{6x}{7} ${qed}
		\\end{align*}
		`;
	// b

	const partB = mathlify`
		$${'\\begin{align*}'}
			2(${l1}+${b1}) + 16 &= 2(${l2}+${b2}) \\\\
			${l1.plus(b1)} + 8 &= ${l2.plus(b2)} \\\\
			3y &= 2x + 8
		\\end{align*}

		Solving the two equations simultaneously,
		$${`\\begin{align*}`}
			3\\left( \\frac{6x}{7} \\right) &= 2x + 8 \\\\
			18x &= 14x + 56 \\\\
			4x &= 56 \\\\
			x &= 14 ${qed}
		\\end{align*}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 23
export const qn23: () => AnswerObject = () => {
	// a
	const bearing1 = 60;
	const ABC = 64;
	const int = 180 - ABC - bearing1;
	const bearing2 = 360 - int;
	const body = mathlify`
		$${'\\begin{align*}'}
			& \\text{Bearing} \\\\
			& = 360^\\circ - 64^\\circ - 60^\\circ \\\\
			& = ${bearing2}^\\circ ${qed}
		\\end{align*}
		`;
	// b
	const BA = 63;
	const BC = 95;
	const AC = Math.sqrt(BA ** 2 + BC ** 2 - 2 * BA * BC * Math.cos((ABC / 180) * Math.PI));
	const partB = mathlify`
		By the cosine rule,
		$${'\\begin{align*}'}
			AC &= \\sqrt{ ${BA}^2 + ${BC}^2 - 2(${BA})(${BC})\\cos{${ABC}^\\circ} } \\\\
			&= ${AC.toPrecision(3)} ${qed}
		\\end{align*}
	`;
	// c
	const BAC = (Math.asin((BC * Math.sin((ABC / 180) * Math.PI)) / AC) / Math.PI) * 180;
	const bearing3 = 180 - (BAC - 60);
	const partC = mathlify`
		By the sine rule,
		$${'\\begin{align*}'}
			\\frac{\\sin \\angle BAC}{${BC}} &= \\frac{\\sin{${ABC}^\\circ}}{${AC.toPrecision(
		5,
	)}} \\\\
			\\angle BAC &= ${BAC.toPrecision(5)}^\\circ
		\\end{align*}

		$${`\\begin{align*}`}
			& \\textrm{Bearing of C from A} \\\\
			& = 180 - (${BAC.toPrecision(5)} - 60) \\\\
			& = ${bearing3.toFixed(1)}^\\circ ${qed}
		\\end{align*}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 24
export const qn24: () => AnswerObject = () => {
	// a
	const d1 = 228;
	const d2 = 150;
	const I2 = 1370;
	const k = I2 * d2 ** 2;
	const body = mathlify`
		$${'I = \\frac{k}{D^2}'}

		When ${`D=${d2},`}
		${`I = ${I2}`}
		$${`\\begin{align*}`}
			${I2} &= \\frac{k}{${d2}^2} \\\\
			k &= ${I2} \\times ${d2}^2 \\\\
			k &= ${I2 * d2 ** 2} \\\\
			I &= \\frac{${k}}{D^2}
		\\end{align*}

		When ${`D=${d1},`}
		$${`\\begin{align*}`}
			I &= \\frac{${k}}{${d1}^2} \\\\
			&= ${(k / d1 ** 2).toPrecision(3)} ${qed}
		\\end{align*}
		`;
	// b
	const partB = mathlify`
		The intensity will be a quarter of the original intensity ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 25
export const qn25: () => AnswerObject = () => {
	// a
	const sN = new Polynomial([5, 1, 0], { variable: 'n' }).divide(2);
	const u1 = sN.subIn(1);
	const s2 = sN.subIn(2);
	const s3 = sN.subIn(3);
	const u2 = s2.minus(u1);
	const u3 = s3.minus(s2);
	const body = mathlify`
		$${'\\begin{align*}'}
			u_1 &= \\frac{1}{2} (1) (5+1) \\\\
			&= ${u1} ${qed}
		\\end{align*}
		
		$${'\\begin{align*}'}
			S_2 &= \\frac{1}{2} (2) (5(2)+1) \\\\
			&= ${s2} \\\\
			u_2 &= S_2 - u_1 \\\\
			&= ${s2} - ${u1} \\\\
			&= ${u2} ${qed}
		\\end{align*}
		
		$${'\\begin{align*}'}
			S_3 &= \\frac{1}{2} (3) (5(3)+1) \\\\
			&= ${s3} \\\\
			u_3 &= S_3 - S_2 \\\\
			&= ${s3} - ${s2} \\\\
			&= ${u3} ${qed}
		\\end{align*}
	`;
	// b
	const uN = sN.minus(sN.replaceXWith(new Polynomial([1, -1], { variable: 'n' })));
	const partB = mathlify`
		$${uN} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 26
export const qn26: () => AnswerObject = () => {
	const l = 12,
		b = 8,
		h = 6;
	const extra = 7;
	const AH = Math.sqrt(h ** 2 + b ** 2);
	const rod = AH + extra;
	const AF2 = l ** 2 + b ** 2;
	const AG = Math.sqrt(AF2 + h ** 2);
	const shortest = rod - AG;
	const body = mathlify`
		$${'\\begin{align*}'}
			AH &= \\sqrt{${l}^2 + ${b}^2} \\\\
			&= ${AH}
		\\end{align*}

		$${'\\text{Length of rod}'} = ${rod}

		$${'\\begin{align*}'}
			AF^2 &= ${l}^2 + ${b}^2 \\\\
			&= ${AF2} \\\\
			AG &= \\sqrt{${AF2} + ${h}^2} \\\\
			&= ${AG.toFixed(3)}
		\\end{align*}

		$${`\\begin{align*}`}
			& \\text{Shortest length} \\\\
			&= ${rod} - ${AG.toFixed(3)} \\\\
			&= ${shortest.toPrecision(3)} ${qed}
		\\end{align*}
	`;
	return {
		body,
	};
};

// Question 27
export const qn27: () => AnswerObject = () => {
	const a = `\\bm{a}`;
	const b = `\\bm{b}`;
	const body = mathlify`
		$${'\\begin{align*}'}
			\\overrightarrow{MN} &= ${b} - ${a} \\\\
			\\overrightarrow{MP} &= \\frac{3}{5} (${b} - ${a})
		\\end{align*}

		$${'\\begin{align*}'}
			& \\overrightarrow{OP} \\\\
			& = \\overrightarrow{OM} + \\overrightarrow{MP} \\\\
			& = ${a} + \\frac{3}{5} ${b} - \\frac{3}{5} ${a} \\\\
			&= \\frac{2}{5} ${a} + \\frac{3}{5} ${b} \\\\
			&= \\frac{1}{5} (2${a} + 3${b}) ${qed} 
		\\end{align*}
	`;
	// b
	const partB = mathlify`
		$${'\\begin{align*}'}
			& \\overrightarrow{OQ} \\\\
			&= \\overrightarrow{OM} + \\overrightarrow{MQ} \\\\
			&= ${a} + \\frac{1}{5} \\left( ${a} + 9${b} \\right) \\\\
			&= \\frac{6}{5} ${a} + \\frac{9}{5} ${b} \\\\
			&= \\frac{3}{5} (2${a} + 3${b})
		\\end{align*}

		Hence ${`\\overrightarrow{OQ} = 3 \\overrightarrow{OP}`}
		@${'@br'}
		${`\\overrightarrow{OQ} \\parallel \\overrightarrow{OP}`}
		and they share a common point ${'O'}.

		Hence ${'O, P'}
		and ${'Q'}
		lie on a straight line. ${qed}

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
	qn15(),
	qn16(),
	qn17(),
	qn18(),
	qn19(),
	qn20(),
	qn21(),
	qn22(),
	qn23(),
	qn24(),
	qn25(),
	qn26(),
	qn27(),
];
