import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
	const [error, setError] = useState(false);
	// const [localStorage, setLocalStorage] = useState(null);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		comment: '',
		storeData: false,
	});

	useEffect(() => {
		// setLocalStorage(window.localStorage);
		const initalFormData = {
			name: window.localStorage.getItem('name'),
			email: window.localStorage.getItem('email'),
			storeData:
				window.localStorage.getItem('name') ||
				window.localStorage.getItem('email'),
		};
		setFormData(initalFormData);
	}, []);

	const onInputChange = (e) => {
		const { target } = e;
		if (target.type === 'checkbox') {
			setFormData((prevState) => ({
				...prevState,
				[target.name]: target.checked,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[target.name]: target.value,
			}));
		}
	};
	const handleCommentSubmition = () => {
		setError(false);
		const { name, email, comment, storeData } = formData;
		if (!comment || !name || !email) {
			setError('All fields are required');
			return;
		}
		const commentObj = { name, email, comment, slug };

		if (storeData) {
			localStorage.setItem('name', name);
			localStorage.setItem('email', email);
		} else {
			localStorage.removeItem('name');
			localStorage.removeItem('email');
		}

		submitComment(commentObj).then((res) => {
			setShowSuccessMessage(true);
			setTimeout(() => setShowSuccessMessage(false), 3000);
		});
	};
	return (
		<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
				Leave a comment ✍️
			</h3>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea
					value={formData.comment}
					onChange={onInputChange}
					className='p-4 outline-none w-full h-32 rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
					placeholder='Comment'
					name='comment'
				/>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
				<input
					type='text'
					value={formData.name}
					onChange={onInputChange}
					className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
					placeholder='Name'
					name='name'
				/>
				<input
					type='text'
					value={formData.email}
					onChange={onInputChange}
					className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
					placeholder='Email'
					name='email'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<div>
					<input
						type='checkbox'
						checked={formData.storeData}
						onChange={onInputChange}
						id='storeData'
						name='storeData'
						value='true'
					/>
					<label
						className='text-gray-500 cursor-pointer ml-2'
						htmlFor='storeData'
					>
						Remember my name and email for future comments
					</label>
				</div>
			</div>
			{error && <p className='text-xs text-red-500'>{error}</p>}
			<div className='mt-8'>
				<button
					type='button'
					onClick={handleCommentSubmition}
					className='transition duration-500 ease bg-pink-600 hover:bg-indigo-900 hover:opacity-75  focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-full text-white px-8 py-2 cursor-pointer'
				>
					Comment
				</button>
				{showSuccessMessage && (
					<span className='text-lg mt-1 float-right font-semibold text-green-500 border-green-500 rounded-lg'>
						Comment submited for review!
					</span>
				)}
			</div>
		</div>
	);
};

export default CommentsForm;
