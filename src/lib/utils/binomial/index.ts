import { nCr, Polynomial, type Fraction, solveLinear, numberToFraction } from 'mathlify';

/**
 * power, [term1Coeff, term1Power], [term2Coeff, term2Power]
 * @returns [coeff, r]
 */
export function coeffAt(
	power: number,
	term1: number | Fraction | [number | Fraction, number],
	term2: [number | Fraction, number],
	n: number,
): [Fraction, number] {
	if (!Array.isArray(term1)) {
		term1 = [term1, 0];
	}
	const [coeff1Num, power1] = term1;
	const [coeff2Num, power2] = term2;
	const rFrac = solveLinear(generalTermPower(power1, power2, n).minus(power));
	if (!rFrac.isInteger()) {
		throw new Error(`Non-integer r found`);
	}
	const r = rFrac.num;
	const coeff1 = numberToFraction(coeff1Num);
	const coeff2 = numberToFraction(coeff2Num);
	return [
		coeff1
			.pow(n - r)
			.times(coeff2.pow(r))
			.times(nCr(n, r)),
		r,
	];
}

// (ax^{n1} + bx^{n2})^n
// power is r(n1-n2) + n2*n
export function generalTermPower(power1: number, power2: number, n: number): Polynomial {
	return new Polynomial([power2 - power1, power1 * n], { variable: 'r' });
}
