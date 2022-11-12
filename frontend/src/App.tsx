/* eslint-disable unicorn/filename-case */
import {useEffect} from 'react';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';

import SearchForm from './search-view';
import SkillForm from './skill-view';
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
			<div className='drawer'>
				<input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col'>
					<div className='w-full navbar bg-base-300'>
						<div className='flex-none lg:hidden'>
							<label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									className='inline-block w-6 h-6 stroke-current'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M4 6h16M4 12h16M4 18h16'
									></path>
								</svg>
							</label>
						</div>
						<div className='flex-1 px-2 mx-2'>
							<Link to='/'>Homepage</Link>
						</div>
						<div className='flex-none hidden lg:block'>
							<ul className='menu menu-horizontal'>
								<li>
									{' '}
									<Link to='/dashboard'>Dashboard</Link>
								</li>
								<li>
									{' '}
									<Link to='/search'>Search</Link>
								</li>
								<li>
									<Link to='/settings'>Settings</Link>
								</li>
							</ul>
						</div>
					</div>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/dashboard' element={<DashboardView />} />
						<Route path='/search' element={<SearchView />} />
						<Route path='/publication/:id' element={<PublicationView />} />
						<Route path='settings' element={<SettingsView />} />
					</Routes>
				</div>
				<div className='drawer-side'>
					<label htmlFor='my-drawer-3' className='drawer-overlay'></label>
					<ul className='menu p-4 overflow-y-auto w-80 bg-base-100'>
						<li>
							{' '}
							<Link to='/dashboard'>Dashboard</Link>
						</li>
						<li>
							{' '}
							<Link to='/search'>Search</Link>
						</li>
						<li>
							<Link to='/settings'>Settings</Link>
						</li>
					</ul>
				</div>
			</div>
		</BrowserRouter>
	);
}

function SettingsView() {
	return (
		<div className='container mx-auto'>
			<h1>Settings page</h1>
		</div>
	);
}

function HomePage() {
	const style = {class: 'container mx-auto', padding: '8px'};
	return (
		<div style={style}>
			<h1>Homepage</h1>
		</div>
	);
}

function DashboardView() {
	const style = {class: 'container mx-auto', padding: '8px'};
	return (
		<div style={style}>
			<Dashboard />
		</div>
	);
}

function SearchView() {
	const style = {class: 'container mx-auto', padding: '8px'};
	return (
		<div style={style}>
			<SearchForm />
			<SkillForm />
		</div>
	);
}

function PublicationView() {
	const style = {class: 'container mx-auto', padding: '8px'};
	return (
		<div style={style}>
			<SkillForm />
		</div>
	);
}

export default App;
