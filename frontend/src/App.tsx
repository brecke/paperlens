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
			<div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content spacious-below'>
				<div className='px-2 mx-2 navbar-start'>
					<span className='text-lg font-bold'>
						<Link to='/'>PaperLens</Link>
					</span>
				</div>
				<div className='hidden px-2 mx-2 navbar-center lg:flex'>
					<div className='flex items-stretch'>
						<a className='btn btn-ghost btn-sm rounded-btn'>
							<Link to='/dashboard'>Dashboard</Link>
						</a>
						<a className='btn btn-ghost btn-sm rounded-btn'>
							<Link to='/search'>Add publication</Link>
						</a>
						<a className='btn btn-ghost btn-sm rounded-btn'>
							<Link to='/'>Verify claims</Link>
						</a>
					</div>
				</div>
				<div className='navbar-end'>
					<div className='flex-none'>
						<a className='btn btn-ghost btn-sm rounded-btn'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-5 mr-2 stroke-current'>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
							</svg>
              Notifications
						</a>
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
			<div className='grow md:container md:mx-auto'>
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
			<h1 className='text-slate-500'>Settings page</h1>
		</div>
	);
}

function HomePage() {
	const style = {class: '', padding: '8px'};
	return (
		<div style={style}>
			<h1 className='text-slate-500'>Homepage</h1>
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
