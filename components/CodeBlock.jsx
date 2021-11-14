import React, { useEffect } from 'react';
import Prism from 'prismjs';

const CodeBlock = ({ text }) => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	console.log(text);
	return (
		<pre className='language-javascript mb-8 w-full overflow-x-auto rounded-lg'>
			<code dangerouslySetInnerHTML={{ __html: text }}></code>
		</pre>
	);
};
export default CodeBlock;
