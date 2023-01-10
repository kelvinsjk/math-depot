import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction, PowerFn } from 'mathlify';
import { line } from '$lib/utils/coordinate';

const k = 8;
const coeff = 3;
const den = new Polynomial([coeff, 2]);
const curve = new PowerFn(-1, { fx: den, coeff: k });
const { power } = curve.differentiate();
const m = power.subIn(2);
const x = 2,
	y = 1;
const l = line(m, x, y);
const yB = l.subIn(0);

// curve
const logTerm = den.subIn(x).divide(den.subIn(0));
const trapezium = new Fraction(x).times(yB.plus(y)).divide(2);
const logCoeff = new Fraction(k, coeff);

// typeset
const body = `${math(`\\left( ${logCoeff} \\ln ${logTerm} - ${trapezium} \\right)
	\\textrm{ units}^2.
`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Integration',
		}),
	);
}
