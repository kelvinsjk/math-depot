import { type Fraction, Polynomial, Term } from '../core';
import { LnTerm } from '../precalculus/lnTerm';
import { numberToFraction } from '../utils';

export class LnFn extends Term {
	kind: 'lnFunction';
	coeff: Fraction;
	fx: Polynomial;
	hasBrackets: boolean;

	constructor(options?: {
		coeff?: number | Fraction;
		fx?: number | Fraction | string | (number | Fraction)[] | Polynomial;
		hasBrackets?: boolean;
	}) {
		let { coeff, fx } = {
			coeff: 1,
			fx: 'x',
			...options,
		};
		const hasBrackets = options?.hasBrackets ?? false;
		coeff = numberToFraction(coeff);
		if (!(fx instanceof Polynomial)) {
			fx = new Polynomial(fx);
		}
		const fxString = hasBrackets ? `\\ln ( ${fx} )` : `\\ln ${fx}`;
		super(coeff, fxString);
		this.coeff = coeff;
		this.fx = fx;
		this.kind = 'lnFunction';
		this.hasBrackets = hasBrackets;
	}

	subIn(x: number | Fraction): LnTerm {
		return new LnTerm(this.fx.subIn(x), this.coeff);
	}

	differentiate(): Term {
		return new Term(`${this.fx.differentiate().times(this.coeff)}`, [`${this.fx}`, -1]);
	}
}
