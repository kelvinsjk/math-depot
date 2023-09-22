import { Fraction, Term } from '../core';
import { numberToFraction } from '../utils';

export class LnTerm extends Term {
	kind: 'lnTerm';
	coeff: Fraction;
	lnArg: Fraction;

	constructor(lnArg: number | Fraction, coeff: number | Fraction = 1) {
		// TODO: add expTerm as lnArg
		lnArg = numberToFraction(lnArg);
		if (lnArg.isAtMost(0)) {
			throw new Error(`lnTerm must take positive argument, ${lnArg} received`);
		}
		if (lnArg.isEqualTo(1)) {
			coeff = 0;
		}
		const lnString = `\\ln ${lnArg}`;
		super(coeff, lnString);
		this.kind = 'lnTerm';
		this.coeff = numberToFraction(coeff);
		this.lnArg = lnArg;
	}

	plus(x: LnTerm): LnTerm {
		// k1 ln x1 + k2 ln x2 = coeff( power1 ln x1 + power2 ln x2 )
		const [[power1, power2], coeff] = Fraction.factorize(this.coeff, x.coeff);
		return new LnTerm(this.lnArg.pow(power1).times(x.lnArg.pow(power2)), coeff);
	}

	negative(): LnTerm {
		return new LnTerm(this.lnArg, this.coeff.negative());
	}

	changeSign(): LnTerm {
		return new LnTerm(this.lnArg.reciprocal(), this.coeff.negative());
	}

	makeCoeffPositive(): LnTerm {
		return this.coeff.isGreaterThan(0)
			? new LnTerm(this.lnArg, this.coeff)
			: this.changeSign();
	}

	minus(x: LnTerm): LnTerm {
		return this.plus(x.negative());
	}
}
