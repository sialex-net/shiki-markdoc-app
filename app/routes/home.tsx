import type { Route } from './+types/home';

// biome-ignore lint/correctness/noEmptyPattern:
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ content: 'Welcome to React Router!', name: 'description' },
	];
}

export function loader() {
	return { message: 'Hello world' };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <p>{loaderData.message}</p>;
}
