import React from 'react';
import LocationIcon from '../assets/location.svg';

function Earthquake({
	place,
	magnitude,
	time,
	tsunamiAlert,
	coordinates,
	depth,
}) {
	const date = new Date(time);
	let bgClass = 'bg-lime-500';

	if (magnitude >= 4 && magnitude < 6) bgClass = 'bg-amber-400';
	if (magnitude > 6) bgClass = 'bg-rose-700';

	const [direction, location] = place.split(' of ');

	return (
		<div
			id='earthquake'
			className='flex max-w-lg m-[20px] rounded-[15px] border border-1 border-black overflow-hidden'>
			<div
				className={`${bgClass} w-[130px] p-[20px] bg-lime-500 flex flex-row items-center justify-center font-extrabold text-[40px]`}>
				{magnitude.toFixed(2)}
			</div>
			<div className='p-[20px] flex-grow bg-white'>
				<p className='font-bold'>{direction + ' of'}</p>
				<p className='text-[32px]'>{location}</p>
				<p className='font-semibold text[12px] text-gray-800'>
					{date.toDateString()}
				</p>
				<p
					className={`${
						tsunamiAlert ? 'bg-rose-700' : 'bg-emerald-900'
					} p-[5px] w-[200px] rounded-[10px] text-center mt-[8px] text-white`}>
					{tsunamiAlert ? 'Tsunami Alert Issued' : 'No Tsunami Alert'}
				</p>
				<p className='text-slate-500 text-[18px]'>Depth: {depth.toFixed(2)}</p>
			</div>
			<a
				target='_blank'
				href={`https://maps.google.com?q=${coordinates[1]},${coordinates[0]}`}
				className='w-[30px] bg-slate-500 cursor-pointer flex justify-center items-center'>
				<img src={LocationIcon} />
			</a>
		</div>
	);
}

// <4 -- green >= 4 & <=6 yellow >6 red

export default Earthquake;
