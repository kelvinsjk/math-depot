import { mathlifyGen } from '../core/';

const modules = {
	math,
	display,
	em,
	b,
	br,
	hr,
};

/**
 * math: starts with ${}, terminates with \n,
 * display: starts with $${}, terminates with \n\n,
 * text: starts with @${}, terminates with \n
 */
export function mathlifyTex(strings: TemplateStringsArray, ...values: unknown[]): string {
	return mathlifyGen(modules)(strings, ...values);
}

function math(x: string): string {
	return `$${x}$`;
}
function display(x: string): string {
	return `$$ ${x} $$`;
}
function em(x: string): string {
	return `\\emph{${x}}`;
}
function b(x: string): string {
	return `\\textbf{${x}}`;
}
function br(): string {
	return `\\newline `;
}
function hr(): string {
	return `\\hrule `;
}
