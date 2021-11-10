import React from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';

const DynamicCodeBlock = dynamic(() => import('./CodeBlock.jsx'), {
	ssr: false,
});
const PostDetail = ({ post }) => {
	const getContentFragment = (index, text, obj, type) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch (type) {
			// code component 👀 let's try to style it :))
			case 'code-block':
				return <DynamicCodeBlock key={index} index={index} text={text} />;

			case 'paragraph':
				return (
					<p key={index} className='mb-8'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</p>
				);
			case 'heading-one':
				return (
					<h2 key={index} className='text-3xl font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h2>
				);
			case 'heading-two':
				return (
					<h3 key={index} className='text-2xl font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				);
			case 'heading-three':
				return (
					<h3 key={index} className='text-xl font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				);
			case 'heading-four':
				return (
					<h4 key={index} className='text-lg font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h4>
				);
			case 'heading-five':
				return (
					<h5 key={index} className='text-base font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h5>
				);
			case 'image':
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
						className='rounded-lg'
					/>
				);
			default:
				return modifiedText;
		}
	};
	return (
		<div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
			<div className='relative overflow-hidden shadow-md mb-6'>
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className='object-top h-full rounded-t-lg'
				/>
			</div>
			<div className='px-4 lg:px-0'>
				<div className='flex items-center mb-8 w-full'>
					<div className='flex items-center justify-center lg:mb-0 lg:w-auto mr-8'>
						<img
							src={post.author.photo.url}
							alt={post.author.name}
							height='30px'
							width='30px'
							className='align-middle rounded-full'
						/>
						<p className='inline align-middle text-gray-700 ml-2 text-lg'>
							{post.author.name}
						</p>
					</div>
					<div className='font-medium text-gray-700'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 inline mr-2 text-pink-500'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
							/>
						</svg>
						<span>{moment(post.createdAt).format('MMM DD, YYYY')} </span>
					</div>
				</div>
				<h1 className='text-center mb-8 text-3xl font-semibold'>
					{post.title}
				</h1>
				{post.content.raw.children.map((typeObj, index) => {
					const children = typeObj.children.map((item, itemindex) =>
						getContentFragment(itemindex, item.text, item)
					);

					return getContentFragment(index, children, typeObj, typeObj.type);
				})}
			</div>
		</div>
	);
};

export default PostDetail;
