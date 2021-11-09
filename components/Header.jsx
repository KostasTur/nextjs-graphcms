import React, { useContext, useState, useEffect } from 'react';
import { getCategories } from '../services';
import { useRouter } from 'next/router';

import Link from 'next/link';

const Header = ({ children, href }) => {
	const [categories, setCategories] = useState([]);
	const router = useRouter();

	useEffect(() => {
		getCategories().then((newCategories) => setCategories(newCategories));

		return () => {};
	}, []);
	return (
		<div className='container mx-auto px-10 mb-8'>
			<div className='border-b w-full inline-block border-blue-400 py-8'>
				<div className='md:float-left block'>
					<Link href='/'>
						<span className='cursor-pointer font-bold text-4xl text-white'>
							Demo Blog
						</span>
					</Link>
				</div>
				<div className='hidden md:float-left md:contents'>
					{categories.map((category) => (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<span
								className={`md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer ${
									router.asPath.includes(category.slug)
										? 'text-black border-b-2 border-white'
										: 'text-white'
								}  `}
							>
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Header;
