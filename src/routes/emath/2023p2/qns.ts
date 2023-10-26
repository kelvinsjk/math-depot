import type { AnswerObject } from '$lib/interfaces';

import {
	Polynomial,
	Expression,
	Fraction,
	solveLinear,
	solveQuadraticNumerical,
	SLE,
	EquationWorking,
} from './mathlify-v3b';

import { mathlify } from '$lib/temml';
import { Fraction as oFrac } from 'mathlify';
import { line } from '$lib/utils/coordinate';
const qed = `\\; \\blacksquare`;

// Question 1
export const qn1: () => AnswerObject = () => {
	// ai
	const body = mathlify`
		$${`3.77 \\times 10^{6}`} ${qed}
	`;
	// aii
	const twenty = 4044210;
	const naught = 3273363;
	const percentage = ((twenty - naught) / naught) * 100;
	const partAII = mathlify`
		~${`align*`}
		& \\text{Percentage increase} \\\\
		& = \\frac{${twenty}-${naught}}{${naught}} \\times 100\\% \\\\
		&= ${percentage.toPrecision(3)}\\% ${qed}
	`;
	// aiii
	const nonResident = 18.7;
	const resident = 100 - nonResident;
	const total = (naught / resident) * 100;
	const partAIII = mathlify`
		$${``}\\text{Resident percentage} = 100\\% - ${nonResident}\\% = ${resident}\\%

		~${'align*'}
		& \\text{Total population} \\\\
		& = \\frac{${naught}}{${resident}} \\times 100 \\\\
		&= ${Number(total.toPrecision(3)).toLocaleString()} ${qed}
	`;

	// b
	const pop = 5.69;
	const density = 7810;
	const area = (pop * 10 ** 6) / density;
	const partB = mathlify`
		~${'align*'}
			& \\text{Area} \\\\
			&= \\frac{${pop} \\times 10^6}{${density}} \\\\
			&= ${area.toPrecision(3)} \\textrm{ km}^2 ${qed}
	`;

	// c
	const mini = 3.9;
	const actual = 7.8;
	const scale = (3.9 * 10 ** -2) / (actual * 10 ** -6);
	const partCI = mathlify`
		~${'align*'}
		${mini} \\text{ cm} &: ${actual} \\times 10^{-6} \\text{ m} \\\\
		${mini} \\times 10^{-2} \\text{ m} &: ${actual} \\times 10^{-6} \\text{ m} \\\\
		${scale} &: 1 ${qed}
	`;

	// cii

	const mm = 8;
	const final = 8 / scale;
	const partCII = mathlify`
		~${'align*'}
		& \\text{Actual diameter} \\\\
		&= \\frac{${mm}}{${scale}} \\\\
		&= ${final * 10 ** 3}\\times 10^{-3} \\text{ mm} ${qed}
	`;
	return {
		parts: [
			{ parts: [{ body }, { body: partAII }, { body: partAIII }] },
			{ body: partB },
			{ parts: [{ body: partCI }, { body: partCII }] },
		],
	};
};

// Question 2
export const qn2: () => AnswerObject = () => {
	// a
	const lhs = new Polynomial([-7, 6]);
	const rhs = new Polynomial([-2, 1]).times(5);
	const x = solveLinear(lhs, rhs);
	const body = mathlify`
		$${`x= {${x}}`} ${qed}
	`;

	// b
	const partB = mathlify`
		$${'y < {-2}'} ${qed}
	`;

	// ci
	const a = 2,
		b = 4;
	const c1 = new Fraction(1, b).plus(new Fraction(a, 3 - a));
	const partCI = mathlify`
		$${`c = ${c1}`} ${qed}
	`;

	// cii
	const num1 = new Expression(['b', 'c'], -1);
	const den1 = new Expression(3, [-1, 'a']);
	const lhs2 = num1.times(den1);
	const partCII = mathlify`
		~${'align*'}
		c - \\frac{1}{b} &= \\frac{a}{3-a} \\\\
		\\frac{bc-1}{b} &= \\frac{a}{3-a} \\\\
		${lhs2} &= ab \\\\
		ab + bca - a &= 3bc - 3 \\\\
		a(b+bc-1) &= 3(bc-1) \\\\
		a &= \\frac{3(bc-1)}{b+bc-1} ${qed}
	`;

	// d
	const denA = new Polynomial([2, -1]);
	const denB = new Polynomial([4, -1], { ascending: true });
	const numA = new Polynomial([1, 0]).times(denB).minus(denA.times(6));
	const poly = numA.minus(denA.times(denB).times(3));
	const [x1, x2] = solveQuadraticNumerical(poly);
	const partD = mathlify`
		~${'align*'}
		\\frac{x}{${denA}} - \\frac{6}{${denB}} &= 3 \\\\
		\\frac{x(${denB}) - 6(${denA})}{(${denA})(${denB})} &= 3 \\\\
		${numA} &= 3(${denA.times(denB)}) \\\\
		${poly} &= 0

		$${`x = ${x1.toFixed(2)} \\textrm{ or } ${x2.toFixed(2)}`} ${qed}
	`;
	return {
		parts: [
			{ body },
			{ body: partB },
			{ parts: [{ body: partCI }, { body: partCII }] },
			{ body: partD },
		],
	};
};

// Question 3
export const qn3: () => AnswerObject = () => {
	// a
	const body = mathlify`
		~${'align*'}
		& \\text{Total surface area of hemisphere} \\\\
		& = 2 \\pi r^2 + \\pi r^2 \\\\
		& = 3 \\pi r^2 \\\\
		& = 3 \\pi (3y)^2 \\\\
		& = 27 \\pi y^2 ${qed}
	`;
	// b
	const partB = mathlify`
			~${'gather*'}
				2 \\pi (2y) h + 2 \\pi (2y)^2 = 27 \\pi y^2 \\\\
				4 \\pi h y + 8 \\pi y^2 = 27 \\pi y^2 \\\\
				4 h y = 19 y62 \\\\
				h = \\frac{19}{4} y ${qed}
		`;
	// c
	const vol = 500;
	const coeff = new Fraction(2, 3).times(3 ** 3);
	const y3 = new Fraction(vol).divide(coeff);
	const y = Math.pow(y3.valueOf() / Math.PI, 1 / 3);
	const h = (y * 19) / 4;
	const vol2 = Math.PI * (2 * y) ** 2 * h;
	const partC = mathlify`
		~${'gather*'}
		\\frac{2}{3} \\pi \\left( 3y \\right)^3 = 500 \\\\
		${coeff} \\pi y^3 = 500 \\\\
		y^3 = \\frac{250}{9\\pi} \\\\
		y = ${y.toPrecision(5)}

		$${`h = ${h.toPrecision(5)}`}

		~${'align*'}
		& \\text{Volume of cylinder} \\\\
		&= \\pi (2y)^2 h \\\\
		&= ${Number(vol2.toPrecision(3))} ${qed}
	`;
	return {
		parts: [{ body }, { body: partB }, { body: partC }],
	};
};

// Question 4
export const qn4: () => AnswerObject = () => {
	// a
	const x = -3;
	const y1 = 2 / x ** 2 + 3 * x - 1;
	const body = mathlify`
		$${`y = ${y1.toFixed(1)}`} ${qed}
	`;

	// b
	const partB = mathlify`
	<div><img style="display:block;margin:auto;max-width:65vw;max-height:40vh"  alt="q4-graph1" src="/2023p2graph1.png" loading="lazy" /></div>
	`;

	// ci
	const partCI = mathlify`
	<div><img style="display:block;margin:auto;max-width:65vw;max-height:40vh"  alt="q4-graph2" src="/2023p2graph2.png" loading="lazy" /></div>

	`;

	// cii
	const partCII = mathlify`
		$${`x = {-0.6} \\text{ or } 0.7`}
	`;

	// ciii
	const partCIII = mathlify`
		Substituting,
		~${'gather*'}
		2 \\left( \\frac{2}{x^2} + 3x - 1 \\right) - 5x = 7 \\\\
		4 + 6x^3 - 2x^2 - 5x^3 = 7x^2 \\\\
		x^3 - 9x^2 + 4 = 0

		$${`A = {-9}, B = 4`} ${qed}
	`;

	return {
		parts: [
			{ body },
			{ body: partB },
			{ parts: [{ body: partCI }, { body: partCII }, { body: partCIII }] },
		],
	};
};

// Question 5
export const qn5: () => AnswerObject = () => {
	// a
	const BOC = 180 - 36 - 90;
	const BCO = (180 - BOC) / 2;
	const BAD = 180 - BCO - 43;
	const r = 8;
	const arc = ((360 - BOC) / 360) * 2 * Math.PI * r;
	const BE = r * Math.tan((BOC / 180) * Math.PI);
	const CE = Math.sqrt(r ** 2 + BE ** 2) - r;
	const body = mathlify`
				~${'align*'}
				\\angle OBE &= 90^\\circ \\text{ (tangent} \\perp \\text{radius)} \\\\
				\\angle BOC &= 180^\\circ - 36^\\circ - 90^\\circ \\\\
				&= ${BOC}^\\circ \\text{ (angle sum in triangle)}\\\\
				\\angle BCO &= \\frac{180^\\circ - ${BOC}^\\circ}{2} \\text{ (base angles of isos. triangle)} \\\\
				&= ${BCO}^\\circ
				\\angle BAD = 180^\\circ - ${BCO}^\\circ - 43^\\circ \\text{ (angles in opp. segments)} \\\\
				&= ${BAD}^\\circ ${qed}
			`;
	// b

	const partB = mathlify`
				~${'align*'}
				&\\text{Major arc } BADC \\\\
				&= \\frac{360 - ${BOC}}{360} \\times 2 \\pi (${r}) \\\\
				&= ${arc.toPrecision(5)}

				~${'align*'}
				\\tan ${BOC}^\\circ &= \\frac{BE}{${r}} \\\\
				BE &= ${BE.toPrecision(5)}
				
				~${'align*'}
				& CE \\\\
				& = \\sqrt{${r}^2 + ${BE.toPrecision(5)}^2} - ${r} \\\\
				& = ${CE.toPrecision(5)} 

				~${'align*'}
				& \\text{Perimeter} \\\\
				&= ${arc.toPrecision(5)} + ${BE.toPrecision(5)} + ${CE.toPrecision(5)} \\\\
				&= ${(arc + BE + CE).toPrecision(3)} ${qed}



			`;
	return {
		parts: [{ body }, { body: partB }],
	};
};

// Question 6
export const qn6: () => AnswerObject = () => {
	// a
	const [m, n] = new SLE(
		[
			[-4, 2],
			[5, -3],
		],
		[-4, 1],
		{ variables: ['m', 'n'] },
	).solve();
	const body = mathlify`
		~${'align*'}
		\\overrightarrow{XY} &= \\overrightarrow{OY} - \\overrightarrow{OX} \\\\
		&= \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} 7 \\\\ 3 \\end{pmatrix} \\\\
		&= \\begin{pmatrix} -4 \\\\ 1 \\end{pmatrix} ${qed}

		~${'align*'}
		& m${'\\mathbf{p}'} + n\\mathbf{q}  \\\\
		&= \\begin{pmatrix} -4m + 2n \\\\ 5m -3n \\end{pmatrix} 

		~${'align'}
		-4m + 2n &= -4 \\\\
		5m - 3n &= 1 \\tag{(2)}
		
		Solving simultaneously,
		$${`${m}, ${n}`} ${qed}
	`;
	// b
	const xA = 4,
		yA = 6,
		xB = -5,
		yB = -3,
		xC = 8,
		yC = -4;
	const xD = -1;
	const gradient_AB = new Fraction(yB - yA, xB - xA);
	const yD = gradient_AB.times(xD - xA).plus(yA);
	const partB = mathlify`
		Since ${'D'}
		lies on ${'AB'},
		the gradient of ${'AD'}
		and ${'AB'}
		are the same.

		~${'align*'}
		\\frac{y - ${yA}}{{${xD}} - ${xA}} &= \\frac{{${yB}} - ${yA}}{{${xB}} - ${xA}} \\\\
		y &= ${yD} ${qed}
	`;

	const length_DC = Math.sqrt((xC - xD) ** 2 + (yC - yD.valueOf()) ** 2);
	const partBII = mathlify`
		~${'align*'}
		& \\text{Length of } ${'DC'} \\\\
		&= \\sqrt{(${xC} - ({${xD}}))^2 + (${yC} - ${yD})^2} \\\\
		&= ${length_DC.toPrecision(3)} ${qed}
	`;

	// c
	const lhsX = (3 * (8 - 4)) / 2;
	const lhsY = (3 * (-4 - 6)) / 2;
	const xE = lhsX + xA;
	const yE = lhsY + yA;
	const gradient = new oFrac(yE - yB, xE - xB);
	const BE = line(gradient, xE, yE);
	const partC = mathlify`
		~${'gather*'}
		\\overrightarrow{AC} = \\frac{2}{3} \\overrightarrow{AE} \\\\
		3\\overrightarrow{AC}  = 2(\\overrightarrow{OE} - \\overrightarrow{OA}) \\\\
		3 \\begin{pmatrix} ${xC} - ${xA} \\\\ {${yC}} - ${yA}  \\end{pmatrix} = 2\\left(\\overrightarrow{OE} - \\begin{pmatrix} ${xA} \\\\ ${yA} \\end{pmatrix}\\right) \\\\
		\\overrightarrow{OE} = \\begin{pmatrix} ${lhsX} \\\\ ${lhsY} \\end{pmatrix} + \\begin{pmatrix} ${xA} \\\\ ${yA} \\end{pmatrix} \\\\
		\\overrightarrow{OE} = \\begin{pmatrix} ${xE} \\\\ ${yE} \\end{pmatrix}

		~${'align*'}
		& \\textrm{Gradient of } BE \\\\
		&= \\frac{${yE} - ({${yB}})}{${xE} - ({${xB}})} \\\\

		$${`y - ({${yB}})`} = ${gradient} (${`x - ({${xB}})`})

		Equation of line ${'BE'}:
		$${`y=${BE}`} ${qed}
	`;
	return {
		parts: [{ body }, { parts: [{ body: partB }, { body: partBII }] }, { body: partC }],
	};
};

// Question 7
export const qn7: () => AnswerObject = () => {
	// a
	const body = mathlify`
			$${`4\\times 18 = ${4 * 18}`} ${qed}
		`;
	// b
	const partAII = mathlify`
		<ul>
			<li>
				The teachers take a longer time to travel to school on average because
				they have a higher median of 36 minutes compared to the students'
				median time of 28 minutes. ${qed}
			</li>
			<li>
				The distributions of times teachers and teachers take to travel to school 
				are similar in consistency as they have the same 
				interquartile range of 18 minutes. ${qed}
			</li>
		</ul>
	`;
	// b
	const walk = 8,
		cycle = 6,
		total = 24,
		bus = total - walk - cycle;
	const pI = new Fraction(bus, total);
	const pII = pI
		.times(new Fraction(bus - 1, total - 1))
		.plus(
			new Fraction(walk, total)
				.times(new Fraction(walk - 1, total - 1))
				.plus(new Fraction(cycle, total).times(new Fraction(cycle - 1, total - 1))),
		);
	const noWalk = total - walk;
	const pIII = new Fraction(walk, total)
		.times(new Fraction(walk - 1, total - 1))
		.times(new Fraction(noWalk, total - 2).times(3));
	const partBI = mathlify`
		$${`\\frac{${total}-${walk}-${cycle}}{${total}} = ${pI} ${qed}`}
	`;
	const partBII = mathlify`
		~${'align*'}
		& \\left( \\frac{${bus}}{${total}} \\right)
		\\left( \\frac{${bus - 1}}{${total - 1}} \\right) +
		\\left( \\frac{${walk}}{${total}} \\right)
		\\left( \\frac{${walk - 1}}{${total - 1}} \\right) +
		\\left( \\frac{${cycle}}{${total}} \\right)
		\\left( \\frac{${cycle - 1}}{${total - 1}} \\right) \\\\
		&= ${pII} ${qed}
	`;
	const partBIII = mathlify`
		~${'align*'}
		& \\left( \\frac{${walk}}{${total}} \\right)
		\\left( \\frac{${walk - 1}}{${total - 1}} \\right)
		\\left( \\frac{${noWalk}}{${total - 2}} \\right)
		\\times 3 \\\\
		&= ${pIII} ${qed}
	`;
	return {
		parts: [
			{ parts: [{ body }, { body: partAII }] },
			{ parts: [{ body: partBI }, { body: partBII }, { body: partBIII }] },
		],
	};
};

// Question 8
export const qn8: () => AnswerObject = () => {
	// a
	const top = Polynomial.ofDegree(1);
	const bottom = new Polynomial([1, 16]);
	const rhs = 204;
	const working = new EquationWorking(top.plus(bottom), rhs);
	working.setAligned();
	const x = working.solveLinear();
	const left = new Polynomial([1, 7]);
	const right = new Polynomial([1, 9]);
	const center = new Polynomial([1, 8]);
	const body = mathlify`
			Let the top number be ${'x'}.
			@${'@br'}
			The left number will be ${'x + 7,'}
			the center number will be ${'x + 8,'}
			the right number will be ${'x + 9,'}
			and the bottom number will be ${'x + 16.'}

			~${'align*'}
			${top} + ${bottom} &= ${rhs} \\\\
			${working}

			$${''}\\boxed{\\begin{matrix} & ${x} & \\\\ ${left.subIn(x)} & ${center.subIn(
		x,
	)} & ${right.subIn(x)} \\\\ 
				& ${bottom.subIn(x)} & 
			\\end{matrix}} ${qed} 
		`;
	const partAII = mathlify`
		~${'align*'}
		& \\text{Difference between products } \\\\
		& =  (${left}) (${right}) - ${top} (${bottom})\\\\
		&= ${left.times(right)} - (${top.times(bottom)}) \\\\
		&= 63 ${qed}
	`;
	// b
	const num = new Polynomial([1, 0, -1], { variable: 'k' });
	const den = new Polynomial([3, -1], { variable: 'k' });
	const tk = new Fraction(15, 4);
	const lhsB = num.times(tk.den);
	const rhsB = den.times(tk.num);
	const workingB = new EquationWorking(lhsB, rhsB);
	workingB.setAligned();
	workingB.rhsZero();
	const [k1, k2] = workingB.factorizeQuadratic();
	const partB = mathlify`
		~${'align*'}
		\\frac{${num}}{${den}} &= ${tk} \\\\
		${tk.den}(${num}) &= ${tk.num}(${den}) \\\\
		${workingB}

		$${`k = ${k1} \\text{ (NA)} \\text{ or } k=${k2}`}

		~${'align*'}
		T_{k+1} &= T_{${k2.plus(1)}} \\\\
		&= ${num.subIn(k2.plus(1)).divide(den.subIn(k2.plus(1)))} ${qed}
	`;
	return {
		parts: [{ parts: [{ body }, { body: partAII }] }, { body: partB }],
	};
};

// Question 9
export const qn9: () => AnswerObject = () => {
	// a
	const body = mathlify`
			~${'align*'}
			& \\text{Energy} \\\\
			&= 165 \\times 5 \\text{ Wh} \\\\
			&= ${165 * 5} \\text{ Wh} \\\\
			&= ${(165 * 5) / 1000} \\text{ kWh} ${qed}
		`;
	// b
	const peaks = [4.7, 4.9, 5, 4.7, 4.3, 4.2, 4.3, 4.4, 4.5, 4.4, 3.9, 4];
	const mean = peaks.reduce((a, b) => a + b, 0) / peaks.length;
	const partB = mathlify`
			~${'align*'}
			& \\text{Average} \\\\
			&= \\frac{${peaks.join('+')}}{${peaks.length}} \\\\
			&= ${mean.toPrecision(3)} ${qed}
		`;
	const daily = 3050 / 365;
	const wattA = 300,
		wattB = 370,
		wattC = 390,
		wattD = 400;
	const lengthA = 1.46,
		widthA = 1.05,
		lengthB = 1.96,
		widthB = 1,
		lengthC = 1.98,
		widthC = 1,
		lengthD = 1.69,
		widthD = 1.05;
	const areas = [
		Math.ceil((daily * 1000) / (wattA * mean * 0.75)) * lengthA * widthA,
		Math.ceil((daily * 1000) / (wattB * mean * 0.75)) * lengthB * widthB,
		Math.ceil((daily * 1000) / (wattC * mean * 0.75)) * lengthC * widthC,
		Math.ceil((daily * 1000) / (wattD * mean * 0.75)) * lengthD * widthD,
	];
	const meanAreas = areas.reduce((a, b) => a + b, 0) / areas.length;
	const partC = mathlify`
		We will use the highest cumulative usage of the 4 years to calculate a
		conservative estimate. That is the usage of 3050 kWh in Year 4.

		~${'align*'}
		& \\text{Average amount of electricity in one day} \\\\
		& = \\frac{${3050}}{365} \\text{ kWh} \\\\
		& = ${daily.toPrecision(5)} \\text{ kWh}

		For type A,
		~${'align*'}
		& \\text{Daily watt hours output} \\\\
		&= ${wattA} \\times ${mean.toPrecision(5)} \\times 75\\% \\\\
		&= ${wattA * mean * 0.75} \\text{ Wh} \\\\
		& \\text{Panels needed} \\\\
		&= \\frac{${daily.toPrecision(5)} \\times 1000}{${wattA * mean * 0.75}} \\\\
		&= ${((daily * 1000) / (wattA * mean * 0.75)).toPrecision(3)} \\text{ panels} \\\\
		&= ${Math.ceil((daily * 1000) / (wattA * mean * 0.75))} \\text{ panels (rounded up)} \\\\
		& \\text{Area needed} \\\\
		&= ${Math.ceil(
			(daily * 1000) / (wattA * mean * 0.75),
		)} \\times ${lengthA} \\times ${widthA} \\\\
		&= ${Math.ceil((daily * 1000) / (wattA * mean * 0.75)) * lengthA * widthA} \\text{ m}^2

		For type B,
		~${'align*'}
		& \\textrm{Daily watt hours output} \\\\
		&= ${wattB} \\times ${mean.toPrecision(5)} \\times 75\\% \\\\
		&= ${wattB * mean * 0.75} \\text{ Wh} \\\\
		& \\text{Panels needed} \\\\
		&= \\frac{${daily.toPrecision(5)} \\times 1000}{${wattB * mean * 0.75}} \\\\
		&= ${((daily * 1000) / (wattB * mean * 0.75)).toPrecision(3)} \\text{ panels} \\\\
		&= ${Math.ceil((daily * 1000) / (wattB * mean * 0.75))} \\text{ panels (rounded up)} \\\\
		& \\text{Area needed} \\\\
		&= ${Math.ceil(
			(daily * 1000) / (wattB * mean * 0.75),
		)} \\times ${lengthB} \\times ${widthB} \\\\
		&= ${(Math.ceil((daily * 1000) / (wattB * mean * 0.75)) * lengthB * widthB).toPrecision(
			5,
		)} \\text{ m}^2


		For type C,
		~${'align*'}
		& \\textrm{Daily watt hours output} \\\\
		&= ${wattC} \\times ${mean.toPrecision(5)} \\times 75\\% \\\\
		&= ${wattC * mean * 0.75} \\text{ Wh} \\\\
		& \\text{Panels needed} \\\\
		&= \\frac{${daily.toPrecision(5)} \\times 1000}{${wattC * mean * 0.75}} \\\\
		&= ${((daily * 1000) / (wattC * mean * 0.75)).toPrecision(3)} \\text{ panels} \\\\
		&= ${Math.ceil((daily * 1000) / (wattC * mean * 0.75))} \\text{ panels (rounded up)} \\\\
		& \\text{Area needed} \\\\
		&= ${Math.ceil(
			(daily * 1000) / (wattC * mean * 0.75),
		)} \\times ${lengthC} \\times ${widthC} \\\\
		&= ${(Math.ceil((daily * 1000) / (wattC * mean * 0.75)) * lengthC * widthC).toPrecision(
			5,
		)} \\text{ m}^2

		For type D,
		~${'align*'}
		& \\textrm{Daily watt hours output} \\\\
		&= ${wattD} \\times ${mean.toPrecision(5)} \\times 75\\% \\\\
		&= ${wattD * mean * 0.75} \\text{ Wh} \\\\
		& \\text{Panels needed} \\\\
		&= \\frac{${daily.toPrecision(5)} \\times 1000}{${wattD * mean * 0.75}} \\\\
		&= ${((daily * 1000) / (wattD * mean * 0.75)).toPrecision(3)} \\text{ panels} \\\\
		&= ${Math.ceil((daily * 1000) / (wattD * mean * 0.75))} \\text{ panels (rounded up)} \\\\
		& \\text{Area needed} \\\\
		&= ${Math.ceil(
			(daily * 1000) / (wattD * mean * 0.75),
		)} \\times ${lengthD} \\times ${widthD} \\\\
		&= ${(Math.ceil((daily * 1000) / (wattD * mean * 0.75)) * lengthD * widthD).toPrecision(
			5,
		)} \\text{ m}^2
		
		We will take an average of the 4 calculated areas to give an estimate of
		the area Chen will need
		~${'align*'}
		& \\text{Estimated total area needed} \\\\
		&= \\frac{${areas.map((x) => x.toPrecision(5)).join('+')}}{${areas.length}} \\\\
		&= ${meanAreas.toPrecision(3)} \\text{ m}^2 ${qed}
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
