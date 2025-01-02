import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from 'react-router';

import type { Route } from './+types/root';
import stylesheet from './app.css?url';

export const links: Route.LinksFunction = () => [
	{ href: stylesheet, rel: 'stylesheet' },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					content='width=device-width, initial-scale=1'
					name='viewport'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const navLinks = [
		{ name: 'Shiki and Markdoc', to: '/markdoc' },
		{ name: 'Pure Shiki', to: '/shiki' },
	];

	return (
		<>
			<header className='mx-auto flex justify-center py-8'>
				<nav>
					{
						<ul className='flex gap-x-16'>
							{navLinks.map((nL) => (
								<li key={nL.name}>
									<Link
										className='underline hover:no-underline'
										to={nL.to}
									>
										{nL.name}
									</Link>
								</li>
							))}
						</ul>
					}
				</nav>
			</header>
			<main className='mx-auto max-w-screen-sm'>
				<Outlet />
			</main>
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className='container mx-auto p-4 pt-16'>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className='w-full overflow-x-auto p-4'>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
