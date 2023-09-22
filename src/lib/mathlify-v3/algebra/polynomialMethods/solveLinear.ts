import { Polynomial, Fraction } from '../../core';

/**
 * solves a quadratic equation
 *
 * @returns [Fraction, Fraction, 'fraction'] | [number, number, 'float'] | [NaN, NaN, 'NaN']
 * Consider using complex solver for complex roots
 *
 */
export function solveLinear(
	poly: Polynomial | (number | Fraction)[],
	rhs: number | Fraction | Polynomial = 0,
): Fraction {
	if (!(poly instanceof Polynomial)) {
		poly = new Polynomial(poly);
	}
	if (poly.degree() !== 1) {
		throw new Error(`${poly} is not a linear polynomial`);
	}
	const polySolve = poly.minus(rhs);
	// a + bx = 0
	const [a, b] = polySolve.coeffs;
	return a.negative().divide(b);
}
