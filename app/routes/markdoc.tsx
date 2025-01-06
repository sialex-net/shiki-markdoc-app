import type { RenderableTreeNodes } from '@markdoc/markdoc';
import { MarkdocRenderer } from '#app/components/markdoc/renderer';
import type { Route } from './+types/markdoc';

// biome-ignore lint/correctness/noEmptyPattern:
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Shiki and Markdoc Example' },
		{
			content: 'Syntax highlighting inside a Markdoc document',
			name: 'description',
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	// any valid hostname can be used,
	// worker called through service binding
	const url = 'https://hostname/markdoc';
	const authKey = context.cloudflare.env.AUTH_KEY;
	const res = await context.cloudflare.env.SHIKI_MARKDOC_SERVICE.fetch(url, {
		body: markdoc,
		headers: {
			'X-Custom-Auth-Key': authKey,
		},
		method: 'POST',
	});

	const data: RenderableTreeNodes = await res.json();

	return data;
}

export default function Component({ loaderData }: Route.ComponentProps) {
	return (
		<article className='prose prose-invert p-4'>
			<header>
				<h1>Markdoc</h1>
			</header>
			<MarkdocRenderer content={loaderData} />
		</article>
	);
}

const markdoc = `## Heading 2

Content...

{% aside type="note" %}
Something important:

* First item
* Second item
* Third item
* Fourth item
{% /aside %}

Content...

\`\`\`ts {\% path="example-1.ts" %}
// from typescript docs
interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(\`Happy birthday \${home.resident.name}!\`);
  home.resident.age++;
}
 
function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
Cannot assign to 'resident' because it is a read-only property. // [!code highlight]
    name: "Victor the Evictor",
    age: 42, // [!code --]
    age: 22, // [!code ++]
  };
}
\`\`\`

Content...


\`\`\`ts {\% path="example-2.ts" %}
// from typescript docs
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d; // [!code highlight]
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LogMethod(target, propertyKey, descriptor) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
class Demo {
    foo(bar) { // [!code --]
    foo(baz) { // [!code ++]

        // do nothing // [!code highlight]
    }
}
__decorate([
    LogMethod
], Demo.prototype, "foo", null);
const demo = new Demo();
\`\`\`
`;
