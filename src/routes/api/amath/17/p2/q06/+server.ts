import { EquationWorking, xPolynomial, Expression, type Fraction } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const b = new Expression([2, 'm'], 1);
const y = new xPolynomial([9, b, [1, 'c']]);
const line = new xPolynomial(['m', 'c']);
let m: Fraction;
let eqn: xPolynomial;

// part a
{
	const working = new EquationWorking(y, line);
	working.rhsZero();
	const lhs = working.lhs as xPolynomial;
	eqn = lhs;
	const [c, b, a] = lhs.coeffs;
	const d = lhs.quadraticDiscriminant();

	const working2 = new EquationWorking(d, 0, { aligned: true });
	const [m1, m2] = working2.factorizeQuadratic();
	m = m2;

	const soln = mathlify`
		Equating the curve and the line,
		~${'gather*'}
		${working}

		Since the line is a tangent to the curve,
		~${'align*'}
		\\text{discriminant} &= 0 \\\\
		(${b})^2 - 4(${a})(${c}) &= 0 \\\\
		${working2}

		$${`m=${m1}`} ${or} ${`m=${m2}`}

		Hence the positive value of ${`m=${m2} ${qed}`}
	`;

	const ans = mathlify`
		${`m=${m2}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const x0 = -2;
	const y0 = 19;

	const xPoly = y.subIntoCoeffs({ m }) as xPolynomial;
	const rhs = xPoly.subIntoVariable(x0);

	const working = new EquationWorking(y0, rhs, { aligned: true });
	const c = working.solveLinear();

	const pEqn = eqn.subIntoCoeffs({ m });
	const working2 = new EquationWorking(pEqn, 0);
	const [xP] = working2.factorizeQuadratic();
	const yP = y.subIntoCoeffs({ m, c }).subIn(xP);

	const soln = mathlify`
		Substituting ${`m=${m}`} 
		into the equation of the curve,
		$${`y= ${y.subIntoCoeffs({ m })}`}

		When ${`x={${x0}}`},
		${`y = ${y0}`}
		~${'align*'}
		${y0} &= ${y.subIntoCoeffs({ m }).replaceXWith(`({${x0}})`)} \\\\
		${working}

		At point ${'P,'}
		$${eqn}=0

		Substituting ${`m=${m}`},
		~${'gather*'}
		${working2} \\\\
		x = {${xP}}

		When ${`x={${xP}}`},
		~${'align*'}
		y &= mx + c \\\\
		&= ${m} \\left({${xP}}\\right) + ${c} \\\\
		&= ${yP}

	Hence the coordinates of of ${'P'}
	are
	${`\\displaystyle \\left( {${xP}}, {${yP}} \\right) ${qed}`}
	`;

	const ans = mathlify`
		${`\\left( {${xP}}, {${yP}} \\right)`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const soln = mathlify`
		${'L'}
		is a vertical line parallel to the
		${'x'}\\text{-axis} ${qed}
	`;

	const ans = mathlify`
		${'L'}
		is a vertical line parallel to the
		${'x'}\\text{-axis}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.quadratics,
		}),
	);
}
