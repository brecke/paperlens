/* eslint-disable unicorn/filename-case */
import { useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

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
				<Link to="/">Home</Link>
				<Link to="/settings">Settings</Link>
				<button className="btn">Button</button>

				<div className="card w-96 bg-base-100 shadow-xl">
					<figure>
						<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">Shoes!</h2>
						<p>If a dog chews shoes whose shoes does he choose?</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">Buy Now</button>
						</div>
					</div>
				</div>

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
		<div>
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
	const style = { padding: '8px' };
	return (
		<div style={style}>
			<h1 className="text-3xl font-bold underline">React TS home</h1>
			<p>Welcome to the homepage</p>
		</div>
	);
}

export default App;
