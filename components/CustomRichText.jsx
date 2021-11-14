import React, { useEffect } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Image from 'next/image';
import Prism from 'prismjs';

const CustomRichText = ({ content }) => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	console.log(content);

	return (
		<RichText
			content={content}
			renderers={{
				h1: ({ children }) => (
					<h2 className='text-3xl font-semibold mb-4'>{children}</h2>
				),
				h2: ({ children }) => (
					<h2 className='text-2xl font-semibold mb-4'>{children}</h2>
				),
				h3: ({ children }) => (
					<h3 className='text-xl font-semibold mb-4'>{children}</h3>
				),
				h4: ({ children }) => (
					<h4 className='text-lg font-semibold mb-4'>{children}</h4>
				),
				h5: ({ children }) => (
					<h5 className='text-md font-semibold mb-4'>{children}</h5>
				),
				h6: ({ children }) => (
					<h6 className='text-sm font-semibold mb-4'>{children}</h6>
				),

				bold: ({ children }) => <strong className='bold'>{children}</strong>,
				italic: ({ children }) => <i>{children}</i>,
				a: ({ children, openInNewTab, href, rel, ...rest }) => {
					if (href.match(/^https?:\/\/|^\/\//i)) {
						return (
							<a
								className='text-blue-500 hover:border-b-2 border-dotted border-blue-700'
								href={href}
								target={openInNewTab ? '_blank' : '_self'}
								rel={rel || 'noopener noreferrer'}
								{...rest}
							>
								{children}
							</a>
						);
					}
					return (
						<Link href={href}>
							<a
								className='hover:border-b-2 border-dotted border-gray-700'
								{...rest}
							>
								{children}
							</a>
						</Link>
					);
				},
				img: ({ src, altText, height, width }) => (
					<Image
						src={src}
						alt={altText}
						height={height}
						width={width}
						objectFit='cover'
						className='rounded-lg'
					/>
				),
				code: ({ children }) => {
					return (
						<code className='bg-gray-400 p-2 rounded-lg bg-opacity-30 text-sm'>
							{children}
						</code>
					);
				},
				code_block: ({ children }) => {
					return (
						<pre className='line-numbers language-javascript'>
							<code>{children}</code>
						</pre>
					);
				},
			}}
		/>
	);
};

export default CustomRichText;
