import { Fraction, numberToFraction, Polynomial, SquareRoot } from 'mathlify';

/**
 * takes circle in standard form
 * x^2 + y^2 + ax + by + c = 0
 * and
 * @returns [[x, y], r^2]
 */
export function circlePropsFromStandard(
	a: number | Fraction,
	b: number | Fraction,
	c: number | Fraction,
): [[Fraction, Fraction], Fraction] {
	a = numberToFraction(a);
	b = numberToFraction(b);
	c = numberToFraction(c);
	const x = a.divide(-2);
	const y = b.divide(-2);
	const r = x.square().plus(y.square()).minus(c);
	return [[x, y], r];
}

/**
 * gives the circle eqn
 */
export function circleEqn(
	x: number | Fraction,
	y: number | Fraction,
	r: number | Fraction | SquareRoot,
): string {
	[x, y] = [x, y].map((x) => numberToFraction(x));
	if (!(r instanceof SquareRoot)) {
		r = numberToFraction(r);
	}
	const xPoly = new Polynomial([1, x.negative()]);
	const yPoly = new Polynomial([1, y.negative()], { variable: 'y' });
	return `\\left(${xPoly}\\right)^2 + \\left(${yPoly}\\right)^2 = ${r.square()}`;
}

/**
 * gives gradient or line/perpendicular line
 */
export function gradient(
	x1: number | Fraction,
	y1: number | Fraction,
	x2: number | Fraction,
	y2: number | Fraction,
	perpendicular = false,
): Fraction {
	[x1, y1, x2, y2] = [x1, y1, x2, y2].map((x) => numberToFraction(x));
	const num = y2.minus(y1);
	const den = x2.minus(x1);
	if (perpendicular) {
		if (num.isEqualTo(0)) {
			throw new Error(`horizontal line: perpendicular line has infinite gradient`);
		}
		return den.negative().divide(num);
	} else {
		if (den.isEqualTo(0)) {
			throw new Error(`vertical line has infinite gradient`);
		}
		return num.divide(den);
	}
}

/**
 * gives equation of line y = mx + c (just the mx + c portion)
 * given gradient and a point
 */
export function line(
	m: number | Fraction,
	x: number | Fraction,
	y: number | Fraction,
): Polynomial {
	// y - y1 = mx - mx1
	[m, x, y] = [m, x, y].map((x) => numberToFraction(x));
	return new Polynomial([m, y.minus(m.times(x))]);
}

export function distance(
	x1: number | Fraction,
	y1: number | Fraction,
	x2: number | Fraction,
	y2: number | Fraction,
): SquareRoot {
	[x1, y1, x2, y2] = [x1, y1, x2, y2].map((x) => numberToFraction(x));
	return new SquareRoot(x1.minus(x2).square().plus(y1.minus(y2).square()));
}

export function area(points: [number | Fraction, number | Fraction][]): Fraction {
	// convert all to Fraction, then append first point behind
	const newPoints: [Fraction, Fraction][] = [];
	points.forEach((point) => {
		newPoints.push([numberToFraction(point[0]), numberToFraction(point[1])]);
	});
	newPoints.push([newPoints[0][0], newPoints[0][1]]);
	// 'shoelace' method
	let area = Fraction.ZERO;
	const length = newPoints.length;
	newPoints.slice(0, length - 1).forEach(([x, y], i) => {
		area = area.plus(x.times(newPoints[i + 1][1]));
		area = area.minus(y.times(newPoints[i + 1][0]));
	});
	return area.abs().divide(2);
}
