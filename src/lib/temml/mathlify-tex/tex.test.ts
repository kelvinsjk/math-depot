import { mathlifyTex } from './index';
import { expect, test } from 'vitest';

const tex = mathlifyTex`
hello @${'world'}

$${'display'}

${'math1'}+${'math2'}${'math3'}x
${'\\frac'}{${'num'}}{den}
this paragraph started with math

this paragraph starts with text ${'math4'}+${'math5'}${'math6'}x

$${'display'}

Emphasis: @${'em{emphasized text}'}
`;

test('mathlifyTex', () => {
	expect(tex).toBe(`
hello world

$$ display $$

$math1+math2math3x$
$\\frac{num}{den}$
this paragraph started with math

this paragraph starts with text $math4+math5math6x$

$$ display $$

Emphasis: \\emph{emphasized text}
`);
});
