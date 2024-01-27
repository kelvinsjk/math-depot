import { mathlifyGen, type Modules } from '../core/mathlifyGen';
import temml from 'temml';
import type { Options } from 'temml';

const modules: Modules = {
	math: (x: string, options?: Options) => temml.renderToString(`{${x}}`, options),
	display,
	em: (x: string) => `<em>${x}</em>`,
	b: (x: string) => `<strong>${x}</strong>`,
	postProcess: (x: string) => {
		// br, hr
		x = x.replaceAll('--newline--', '<br />');
		x = x.replaceAll('--hrule--', '<hr />');
		// paragraphing
		let pTagged = x.replace(/\r?\n[ \t\r\n]*\r?\n[ \t]*(?![ \t]*<(p|div))/g, '<p>');
		if (!pTagged.trim().startsWith('<')) {
			pTagged = `<p>${pTagged}`;
		}
		return pTagged;
	},
	mathEnvs: {
		equation: (x: string, options?: Options) =>
			display(insertEnv('equation', x), options),
		align: (x: string, options?: Options) => display(insertEnv('align', x), options),
		gather: (x: string, options?: Options) => display(insertEnv('gather', x), options),
		alignat: (eqnColumns: number, x: string, options?: Options) =>
			display(insertEnv('alignat', x, `{${eqnColumns}}`), options),
		equationStar: (x: string, options?: Options) =>
			display(insertEnv('equation*', x), options),
		alignStar: (x: string, options?: Options) => display(insertEnv('align*', x), options),
		gatherStar: (x: string, options?: Options) =>
			display(insertEnv('gather*', x), options),
		alignatStar: (eqnColumns: number, x: string, options?: Options) =>
			display(insertEnv('alignat*', x, `{${eqnColumns}}`), options),
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

function insertEnv(env: string, content: string, args = ''): string {
	return `\\begin{${env}}${args}${content}\n\\end{${env}}`;
}

function display(x: string, options?: Options): string {
	return (
		'<div style="overflow-x:auto;" class="mathlifier-display">\n\t' +
		temml.renderToString(`${x}`, { ...options, displayMode: true }) +
		'\n</div>'
	);
}
