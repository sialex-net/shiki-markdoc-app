import { Codeblock } from '#app/components/codeblock';
import type { Route } from './+types/shiki';

// biome-ignore lint/correctness/noEmptyPattern:
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Pure Shiki Example' },
		{ content: 'Syntax highlighting', name: 'description' },
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	// any valid hostname can be used,
	// worker called through service binding
	const url = 'https://hostname/shiki';
	const authKey = context.cloudflare.env.AUTH_KEY;
	const res = await context.cloudflare.env.SHIKI_MARKDOC_SERVICE.fetch(url, {
		body: code,
		headers: {
			'Shiki-Language': 'tsx',
			'X-Custom-Auth-Key': authKey,
		},
		method: 'POST',
	});
	const html = await res.text();
	return { html };
}

export default function Component({ loaderData }: Route.ComponentProps) {
	return (
		<div className='prose prose-invert p-4'>
			<Codeblock
				innerHtml={loaderData.html}
				// lineNumbers={false}
				path='example.tsx'
			/>
		</div>
	);
}

const code = `// from react docs
import {useReducer} from 'react';

interface State {
   count: number 
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
`;
