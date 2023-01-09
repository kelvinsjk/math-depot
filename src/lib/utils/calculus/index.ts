import {
	Expression,
	numberToFraction,
	Polynomial,
	SquareRoot,
	Term,
	type Fraction,
} from 'mathlify';

/**
 * applies quotient rule, and
 * @returns [numerator, denominator] of dydx.
 */
export function quotientRule(num: Polynomial, den: Polynomial): [Polynomial, Polynomial] {
	return [
		num.differentiate().times(den).minus(den.differentiate().times(num)),
		den.square(),
	];
}

/**
 * representation of a series including negative exponents
 *
 * a_{-m} x^{-m} + ... + a0 + a1 x + ... + a_n x^n
 *
 * we store them as `negCoeffs: [a_{-1}, a_{-2}, ..., a_{-m}]`
 * and `a0 + ... + a_n x^n` as poly
 */
export class Laurent extends Expression {
	poly: Polynomial;
	negCoeffs: Fraction[];

	/**
	 * @param negCoeffs [a_{-1}, ... a_{-m}]
	 */
	constructor(
		poly: Polynomial | (number | Fraction)[],
		negCoeffs: (number | Fraction)[],
	) {
		if (Array.isArray(poly)) {
			poly = new Polynomial(poly);
		}
		const x = poly.variable;
		const negCoeffsFrac = negCoeffs.map((x) => numberToFraction(x));
		while (negCoeffsFrac.at(-1)?.isEqualTo(0)) {
			negCoeffsFrac.pop();
		}
		const negativeTerms: Term[] = [];
		negCoeffsFrac.forEach((coeff, i) => {
			const sign = coeff.sign();
			const xPower = i === 0 ? x : `x^{${i + 1}}`;
			negativeTerms.push(new Term(sign, `\\frac{${coeff.abs()}}{${xPower}}`));
		});
		super(...poly.terms, ...negativeTerms);
		this.poly = poly;
		this.negCoeffs = negCoeffsFrac;
	}

	differentiate(): Laurent {
		const newNegCoeffs = this.negCoeffs.map((a, i) => a.times(-i - 1));
		return new Laurent(this.poly.differentiate(), [0, ...newNegCoeffs]);
	}

	multiplyDenom(): Polynomial {
		const powerDen = this.negCoeffs.length;
		const poly = this.poly.times(new Polynomial([1], { degree: powerDen }));
		const poly2 = new Polynomial(this.negCoeffs);
		return poly.plus(poly2);
	}

	subIn(x: number | Fraction): Fraction {
		let result = this.poly.subIn(x);
		const xFrac = numberToFraction(x);
		this.negCoeffs.forEach((a, i) => {
			result = result.plus(a.divide(xFrac.pow(i + 1)));
		});
		return result;
	}
	subInSurd(x: SquareRoot): Expression {
		const surds: SquareRoot[] = [];
		const polyTerms = this.poly.subInSurd(x).terms;
		//this.poly.coeffs.forEach((a, i) => {
		//	surds.push(x.pow(i).times(a));
		//});
		this.negCoeffs.forEach((a, i) => {
			surds.push(new SquareRoot(1, a).divide(x.pow(i + 1)));
		});
		return new Expression(...polyTerms, ...surds);
	}
}

export function dydx(y = 'y', x = 'x'): string {
	return `\\frac{\\mathrm{d}${y}}{\\mathrm{d}${x}}`;
}
export function dTwo(y = 'y', x = 'x'): string {
	return `\\frac{\\mathrm{d}^2${y}}{\\mathrm{d}${x}^2}`;
}
