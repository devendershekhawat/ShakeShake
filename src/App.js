import React, { useEffect, useState } from 'react';
import EarthquakeList from './components/EarthquakeList';

const USGS_API_URL =
	'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=500';

function App() {

	const [minMag, setMinMag] = useState(0);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [earthquakes, setEarthQuakes] = useState([]);
	const [loading, setLoading] = useState(true);

	// lifting the state up

	//[App]-------callback--------🪝[minMag, startDate, endDate]

	const getEarthquakes = async () => {
		setLoading(true);
		const response = await fetch(`${USGS_API_URL}${minMag > 0 ? '&minmagnitude=' + minMag : ''}${minMag > 0 ? '&starttime=' + startDate : ''}${minMag > 0 ? '&endtime=' + endDate : ''}`);
		const jsonResponse = await response.json();
		setEarthQuakes(jsonResponse.features);
		setLoading(false);
	};

	useEffect(() => {
		getEarthquakes();
	}, [])


	return (
		<div className='flex'>
			<div className='w-[400px] bg-gray-900 p-[20px] h-[100vh] fixed'>
				<input
					className='max-w-sm min-w-[300px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'
					value={minMag} onChange={(event) => setMinMag(event.target.value)} type='number'
				/>
				<input 
					className='max-w-sm min-w-[300px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'
					value={startDate} onChange={(event) => setStartDate(event.target.value)} placeholder='Start Date'
				/>
				<input
					className='max-w-sm min-w-[300px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'				
					value={endDate} onChange={(event) => setEndDate(event.target.value)} placeholder='End Date'
				/>
				<button onClick={getEarthquakes} className='max-w-sm min-w-[250px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-rose-700 text-white rounded-[10px]'>Get Earthquakes</button>
			</div>
			<div className='ml-[400px] flex-grow'>
				<EarthquakeList earthquakes={earthquakes} loading={loading} />
			</div>
		</div>
	);
}

export default App;
