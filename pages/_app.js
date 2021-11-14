import React from 'react';
import { Layout } from '../components';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';
import '../styles/prism-themes/atomDark.scss';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
