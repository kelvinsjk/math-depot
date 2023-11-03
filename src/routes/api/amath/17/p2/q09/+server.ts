import {
	EquationWorking,
	Expression,
	Fraction,
	Point,
	RationalTerm,
	areaWorking,
	lineWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const A = new Point(-2, 1);
const C = new Point(1, 3);
const xB = 0;
let p: Fraction;
let mABExp: RationalTerm;
// part a
{
	mABExp = new RationalTerm(new Expression('p', A.y.negative()), A.x.negative().plus(xB));
	const mCB = new RationalTerm(
		new Expression('p', C.y.negative()),
		C.x.negative().plus(xB),
	);
	const working = new EquationWorking(mABExp, mCB.negative(), { aligned: true });
	working.crossMultiply();
	p = working.solveLinear();
	const soln = mathlify`
		~${'align*'}
		& \\text{Gradient of } AB	\\\\
		& = \\frac{p-1}{0-({-2})} \\\\
		& = ${mABExp} ${qed}
		
		~${'align*'}
		& \\text{Gradient of } CB	\\\\
		& = \\frac{p-3}{0-1} \\\\
		& = ${mCB} ${qed}

		Since ${'\\angle ABO = \\angle CBO'},
		~${'align*'}
		m_{AB} &= - m_{CB} \\\\
		${working} ${qed}
	`;
	const ans = mathlify`
		Gradient of ${'AB = '} ${mABExp}.
		@${'@br'}
		Gradient of ${'CB = '} ${mCB}.
		@${'@br'}
		${`p=${p}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
let D: Point;
{
	const mAB = mABExp.subIn({ p }).cast.toFraction();
	const lDcWorking = lineWorking({ m: mAB, pt: C });
	const mAD = mAB.negativeReciprocal();
	const lADWorking = lineWorking({ m: mAD, pt: A });
	const AD = lADWorking.eqn;
	const DC = lDcWorking.eqn;
	const working = new EquationWorking(AD, DC);
	working.setAligned();
	const xD = working.solveLinear();
	const yD = DC.subIn(xD);
	D = new Point(xD, yD);
	const soln = mathlify`
		Substituting ${`p=${p}`},
		~${'align*'}
		&\\text{Gradient of AB} \\\\
		&= \\frac{${p}-1}{2} \\\\
		&= ${mAB}

		Since ${'AB \\parallel DC'},
		equation of DC:
		~${'gather*'}
		${lDcWorking.working} \\\\
		y = ${DC} 
		
		Since ${'AB \\perp AD'},
		equation of AD:
		~${'gather*'}
		${lADWorking.working} \\\\
		y = ${AD}
		
		Equating the equations of lines ${'AD'}
		and ${'DC'},
		~${'align*'}
		${working} \\\\
		y &= ${AD.replaceXWith(`\\left( {${xD}} \\right)`)} \\\\
		&= ${yD}

		$${''} \\text{Coordinates of } \\text{D} = ${D} ${qed}
	`;
	const ans = mathlify`
		${'D'} ${D}.
	`;
	answer.addPart(ans, soln);
}

// part c
const B = new Point(0, p);
{
	const { matrix, working, area } = areaWorking(A, D, C, B);
	const soln = mathlify`
		~${'align*'}
		& \\text{Area of } ABCD \\\\
		&= ${matrix} \\\\
		&= ${working} \\\\
		&= ${area} \\text{ units}^2 ${qed}
	`;
	const ans = mathlify`
	${area} \\text{ units}^2
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.coordinate,
		}),
	);
}
