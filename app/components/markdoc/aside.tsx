import type { ReactNode } from 'react';

type Props = { children: ReactNode; type?: Types };

type Types = 'caution' | 'note';

export function Aside({ children, type }: Props) {
	return (
		<aside className='mt-4 rounded-lg border-blue-500/65 border-l-4 bg-blue-500/25 p-4 [&>*:last-child]:mb-0 [&>p:first-child]:mt-0 [&>p]:my-2'>
			{type && (
				<header>
					<p className='m-0 font-bold'>
						{type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase()}
					</p>
				</header>
			)}
			{children}
		</aside>
	);
}
