import Markdoc, { type RenderableTreeNodes } from '@markdoc/markdoc';
import * as React from 'react';
import { Codeblock } from '../codeblock';
import { Aside } from './aside';

type Props = { content: RenderableTreeNodes };

export function MarkdocRenderer({ content }: Props) {
	return (
		<>
			{Markdoc.renderers.react(content, React, {
				components: { Aside, Codeblock },
			})}
		</>
	);
}
