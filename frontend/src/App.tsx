/* eslint-disable unicorn/filename-case */
import { useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import PaperForm from './dashboard/paperform';

const style = { display: 'flex', gap: '8px', padding: '8px' };

function App() {
	/**
	 * During development we can still access the base path at `/`
	 * And this hook will make sure that we land on the base `/app`
	 * path which will mount our App as usual.
	 * In production, Phoenix makes sure that the `/app` route is
	 * always mounted within the first request.
	 */
	useEffect(() => {
		if (window.location.pathname === '/') {
			window.location.replace('/app');
		}
	}, []);

	return (
		<BrowserRouter basename="app">
			<nav style={style}>
				<Link to="/">Dashboard</Link>
				<Link to="/settings">Settings</Link>
				<br />
			</nav>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Routes>
		</BrowserRouter>
	);
}

function SettingsPage() {
	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold underline">Settings</h1>
			<ul>
				<li>My profile</li>
				<li>Music</li>
				<li>About</li>
			</ul>
		</div>
	);
}

function HomePage() {
	const style = { class: 'container mx-auto', padding: '8px' };
	return (
		<div style={style}>
			<h1 className="text-3xl font-bold underline">Dashboard</h1>
			<PaperForm />
		</div>
	);
}

export default App;
