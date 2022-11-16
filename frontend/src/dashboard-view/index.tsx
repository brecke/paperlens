
function Dashboard() {
	return (
		<div>
			<h1>This is the dashboard view</h1>
			<div className='stats shadow'>

				<div className='stat place-items-center'>
					<div className='stat-title'>Publications</div>
					<div className='stat-value'>5</div>
					<div className='stat-desc'>bla bla bla</div>
				</div>

				<div className='stat place-items-center'>
					<div className='stat-title'>Skills</div>
					<div className='stat-value text-secondary'>7</div>
					<div className='stat-desc text-secondary'>bla bla bla</div>
				</div>

				<div className='stat place-items-center'>
					<div className='stat-title'>Profile views</div>
					<div className='stat-value'>1,200</div>
					<div className='stat-desc'>bla bla bla</div>
				</div>

			</div>
		</div>
	);
}

export default Dashboard;
