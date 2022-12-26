function Dashboard() {
	return (
		<>
			<h1 className='text-slate-500'>Dashboard</h1>
			<div className='flex flex-row'>
				<div className='basis-1/3 btn-spacious'>
					<div className='card lg:card-side shadow-2xl text-primary-content'>
						<div className='card-body'>
							<h2 className='text-slate-500'>3 publications</h2>
							<div className='justify-end card-actions'>
								<button className='btn btn-primary'>Edit Publications
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 ml-2 stroke-current'>
										<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='basis-1/3 btn-spacious'>
					<div className='card lg:card-side shadow-2xl text-primary-content'>
						<div className='card-body'>
							<h2 className='text-slate-500'>7 claimed skills</h2>
							<div className='justify-end card-actions'>
								<button className='btn btn-primary'>Edit skills
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 ml-2 stroke-current'>
										<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='basis-1/3 btn-spacious'>
					<div className='card lg:card-side shadow-2xl text-primary-content'>
						<div className='card-body'>
							<h2 className='text-slate-500'>12 peer validations</h2>
							<div className='justify-end card-actions'>
								<button className='btn btn-primary'>See all
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 ml-2 stroke-current'>
										<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
