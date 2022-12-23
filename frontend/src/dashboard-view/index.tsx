function Dashboard() {
	return (
		<>
			<h1>Dashboard</h1>
			<div className='align-center'>
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
						<div className='stat-title'>Peer validations</div>
						<div className='stat-value'>12</div>
						<div className='stat-desc'>bla bla bla</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
