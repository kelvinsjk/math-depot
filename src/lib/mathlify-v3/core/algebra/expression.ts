import { Term } from './term';
import type { Fraction } from '../fraction';
import type { MathSymbol } from './mathSymbol';

export class Expression {
	terms: Term[];
	kind: string;

	constructor(
		...args: (
			| number
			| Fraction
			| MathSymbol
			| string
			| [string | MathSymbol, number | Fraction]
			| Term
			| ExpressionOptions
		)[]
	) {
		let terms: Term[] = [];
		let kind = 'expression';
		args.forEach((x) => {
			if (typeof x === 'object' && 'expressionKind' in x) {
				kind = x.expressionKind;
			} else {
				const xTerm = x instanceof Term ? x : new Term(x);
				const i = terms.findIndex((y) => y.isLike(xTerm));
				if (i === -1) {
					terms.push(xTerm);
				} else {
					terms = [...terms.slice(0, i), terms[i].plus(xTerm), ...terms.slice(i + 1)];
				}
			}
		});
		this.terms = terms.filter((x) => !x.coeff.isEqualTo(0));
		this.kind = kind;
	}

	plus(
		x:
			| number
			| Fraction
			| MathSymbol
			| string
			| [string | MathSymbol, number | Fraction]
			| Term
			| Expression,
	): Expression {
		if (x instanceof Expression) {
			return new Expression(...this.terms, ...x.terms);
		}
		return new Expression(...this.terms, x);
	}

	negative(): Expression {
		return new Expression(...this.terms.map((x) => x.negative()));
	}

	minus(
		x:
			| number
			| Fraction
			| MathSymbol
			| string
			| [string | MathSymbol, number | Fraction]
			| Term
			| Expression,
	): Expression {
		if (x instanceof Expression || x instanceof Term) {
			return this.plus(x.negative());
		}
		return this.plus(new Term(x, -1));
	}

	times(x: number | Fraction | MathSymbol | string | Term): Expression {
		return new Expression(...this.terms.map((y) => y.times(x)));
	}

	divide(x: number | Fraction | MathSymbol | string | Term): Expression {
		return new Expression(...this.terms.map((y) => y.divide(x)));
	}

	toString(): string {
		if (this.terms.length === 0) {
			return `0`;
		}
		let string = this.terms[0].toString();
		this.terms.slice(1).forEach((term) => {
			string += term.coeff.isGreaterThan(0) ? ` + ${term}` : ` ${term}`;
		});
		return string;
	}
}

interface ExpressionOptions {
	expressionKind: string;
}
