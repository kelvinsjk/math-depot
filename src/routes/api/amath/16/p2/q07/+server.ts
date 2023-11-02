import { EquationWorking, Fraction, Polynomial, xPolynomial } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { or, qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
// part a
const polyGeneral = new xPolynomial([new Fraction(1, 2), -4, 'k'], { variable: 'u' });
const k = 6;
const poly = polyGeneral.subIntoCoeffs({ k }) as Polynomial;

{
	// part a i
	const soln = mathlify`
		~${'gather*'}
		2^{2x} \\cdot 2^{-1} = 2^{x} \\cdot 2^{2} - 6 \\\\
		\\frac{1}{2} \\cdot 2^{2x} - 4 \\cdot 2^{x} + 6 = 0 \\\\
		${poly} = 0 ${qed}
	`;
	const ans = mathlify`
		${poly} = 0.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const working = new EquationWorking(poly);
	working.times(2);
	const [u1, u2] = working.factorizeQuadratic();
	const x1 = Math.log(u1.valueOf()) / Math.log(2);
	const x2 = Math.log(u2.valueOf()) / Math.log(2);
	const soln = mathlify`
		~${'gather*'}
		${working} \\\\
		\\begin{aligned}
			u &= ${u1} & ${or} && u &= ${u2} \\\\
			2^{x} &= ${u1} &&& 2^{x} &= ${u2} \\\\
			x &= ${x1} ${qed} &&& \\ln 2^{x} &= \\ln ${u2} \\\\
			&&&& x \\ln 2 &= \\ln ${u2} \\\\
			&&&& x &= \\frac{\\ln ${u2}}{\\ln 2} \\\\
			&&&&&= ${x2.toFixed(1)} ${qed}
		\\end{aligned}
	`;
	const ans = mathlify`
		${`x=${x1}`}
		or ${`x=${x2.toFixed(1)}`}.
	`;
	answer.addPart(ans, soln);
}

// c
{
	const [c, b, a] = polyGeneral.coeffs;
	const d = b.square().minus(a.times(c).times(4));
	const soln = mathlify`
		The equation
		$${`2^{2x-1} = 2^{x+2} - k`}

		can be expressed as
		~${'align*'}
		${polyGeneral} &= 0 \\\\
		${polyGeneral.times(2)} &= 0 

		~${'align*'}
		& \\text{Discriminant} \\\\
		&= ({${b}})^2 - 4\\left(${a}\\right)(${c}) \\\\
		&= ${d}

		If ${`k > 8,`}
		~${'align*'}
		2k &> 16 \\\\
		-2k &< {-16} \\\\
		16 - 2k &< 0

		Since ${`\\text{discriminant} < 0,`}
		the equation has no solution if
		${`k > 8`} ${qed}
	`;
	const ans = mathlify`
		Discriminant = ${`${d} < 0`}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.exp,
		}),
	);
}
