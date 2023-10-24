import { mathlifyGen, type Modules } from '../core';
import temml from 'temml';
import type { Options } from 'temml';

const modules: Modules = {
	math: (x: string, options?: Options) => temml.renderToString(`{${x}}`, options),
	display: (x: string, options?: Options) => {
		return (
			'<div style="overflow-x:auto;" class="mathlifier-display">\n\t' +
			temml.renderToString(`${x}`, { ...options, displayMode: true }) +
			'\n</div>'
		);
	},
	em: (x: string) => `<em>${x}</em>`,
	b: (x: string) => `<strong>${x}</strong>`,
	br: () => `<br />`,
	hr: () => `<hr />`,
	postProcess: (x: string) => {
		// paragraphing
		let pTagged = x.replace(/\r?\n[ \t]*\r?\n[ \t]*(?![ \t]*<(p|div))/g, '<p>');
		if (!pTagged.trim().startsWith('<p') && !pTagged.trim().startsWith('<div')) {
			pTagged = `<p>${pTagged}`;
		}
		return pTagged;
	},
};

/**
 * generates MathML string via temml
 *
 * math: starts with ${}, terminates with \n,
 * display: starts with $${}, terminates with \n\n,
 * text: starts with @${}, terminates with \n
 */
export function mathlify(strings: TemplateStringsArray, ...values: unknown[]): string {
	return mathlifyGen(modules)(strings, ...values);
}
