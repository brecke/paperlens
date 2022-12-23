/* eslint-disable unicorn/filename-case */
import {useEffect} from 'react';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';

import SkillForm from './wizard/skill-view';
import SearchForm from './wizard/search-view';
import Wizard from './wizard';
import PreviewForm from './wizard/preview-view';
import Dashboard from './dashboard-view';

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
		<BrowserRouter basename='app'>
			<div className=''>
				<div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content'>
					<div className='flex-none hidden lg:flex'>
						<button className='btn btn-square btn-ghost'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 stroke-current'>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'></path>
							</svg>
						</button>
					</div>
					<div className='flex-1 hidden px-2 mx-2 lg:flex'>
						<span className='text-lg font-bold'>
							<Link to='/dashboard'>Dashboard</Link>
						</span>
					</div>
					<div className='flex-1 lg:flex-none'>
					</div>
					<div className='flex-none'>
						<Link to='/search'>
							<button className='btn btn-square btn-ghost'>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 stroke-current'>
									<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
								</svg>
							</button>
						</Link>
					</div>
					<div className='flex-none'>
						<button className='btn btn-square btn-ghost'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 stroke-current'>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
							</svg>
						</button>
					</div>
					<div className='flex-none'>
						<div className='avatar'>
							<div className='rounded-full w-10 h-10 m-1'>
								<Link to='/settings'>
									<img src='https://i.pravatar.cc/500?img=32'/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=''>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/dashboard' element={<DashboardView />} />
					<Route path='/search' element={<SearchView />} />
					<Route path='/publication/:id' element={<PublicationView />} />
					<Route path='settings' element={<SettingsView />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

function SettingsView() {
	return (
		<div className=''>
			<h1>Settings page</h1>
		</div>
	);
}

function HomePage() {
	const style = {class: '', padding: '8px'};
	return (
		<div style={style}>
			<h1>Homepage</h1>
		</div>
	);
}

function DashboardView() {
	const style = {class: '', padding: '8px'};
	return (
		<div style={style}>
			<Dashboard />
		</div>
	);
}

function SearchView() {
	const style = {class: '', padding: '8px'};
	return (
		<div style={style}>
			<Wizard />
		</div>
	);
}

function PublicationView() {
	const style = {class: '', padding: '8px'};
	return (
		<div style={style}>
			<SkillForm />
		</div>
	);
}

export default App;
