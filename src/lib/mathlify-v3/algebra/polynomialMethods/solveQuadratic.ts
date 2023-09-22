import { Polynomial, Fraction } from '../../core';

/**
 * solves a quadratic equation
 *
 * @returns [Fraction, Fraction, 'fraction'] | [number, number, 'float'] | [NaN, NaN, 'NaN']
 * Consider using complex solver for complex roots
 *
 */
export function solveQuadratic(
	poly: Polynomial | (number | Fraction)[],
	rhs: number | Fraction = 0,
):
	| [Fraction, Fraction, 'fraction']
	| [number, number, 'float']
	| [number, number, 'NaN'] {
	if (!(poly instanceof Polynomial)) {
		poly = new Polynomial(poly);
	}
	if (poly.degree() !== 2) {
		throw new Error(`${poly} is not a quadratic polynomial`);
	}
	const polySolve = poly.minus(rhs);
	let [c, b, a] = polySolve.coeffs;
	if (a.isLessThan(0)) {
		a = a.negative();
		b = b.negative();
		c = c.negative();
	}
	const discriminant = b.square().minus(a.times(c).times(4));
	if (discriminant.valueOf() < 0) {
		return [NaN, NaN, 'NaN'];
	}
	// const sqrt = new SquareRoot(discriminant);
	const sqrtNum = Math.sqrt(discriminant.num);
	const sqrtDen = Math.sqrt(discriminant.den);
	// if (sqrt.isRational()) {
	if (Number.isInteger(sqrtNum) && Number.isInteger(sqrtDen)) {
		const sqrtValue = new Fraction(sqrtNum, sqrtDen);
		//const sqrtValue = sqrt.coeff;
		const root1 = b.negative().minus(sqrtValue).divide(2).divide(a);
		const root2 = b.negative().plus(sqrtValue).divide(2).divide(a);
		return [root1, root2, 'fraction'];
	}
	// irrational answers
	//const sqrtValue = sqrt.valueOf();
	const sqrtValue = sqrtNum / sqrtDen;
	const root1 = (-b.valueOf() - sqrtValue) / 2 / a.valueOf();
	const root2 = (-b.valueOf() + sqrtValue) / 2 / a.valueOf();
	return [root1, root2, 'float'];
}
