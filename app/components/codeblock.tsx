import { clsx } from 'clsx';

type Props = {
	innerHtml: string;
	lineNumbers?: boolean;
	path?: string;
};

export function Codeblock({ innerHtml, lineNumbers = true, path }: Props) {
	return (
		<div className='mt-8 flex flex-col overflow-auto rounded-lg border border-gray-50/20'>
			<header className='flex border-gray-50/20 border-b'>
				{path && (
					<span className='p-3 font-light font-mono text-sm'>{path}</span>
				)}
			</header>
			<div
				className={clsx({
					'[&>pre]:my-0 [&>pre]:rounded-none [&>pre]:pb-0': lineNumbers,
					'[&>pre]:my-0 [&>pre]:rounded-none [&>pre]:pb-0 [&_.line::before]:content-none':
						!lineNumbers,
				})}
				// biome-ignore lint/security/noDangerouslySetInnerHtml:
				dangerouslySetInnerHTML={{ __html: innerHtml }}
			/>
		</div>
	);
}
