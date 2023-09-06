import React, { useEffect, useState } from 'react';
import EarthquakeList from './components/EarthquakeList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const USGS_API_URL =
	'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100';

function App() {
	const [minMag, setMinMag] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [earthquakes, setEarthQuakes] = useState([]);
	const [loading, setLoading] = useState(true);

	const resetFilter = () => {
		setMinMag('');
		setStartDate(null);
		setEndDate(null);
	};

	// lifting the state up

	//[App]-------callback--------🪝[minMag, startDate, endDate]

	const getEarthquakes = async () => {
		// const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		const startDateString =
			startDate && new Intl.DateTimeFormat('en-US').format(startDate);
		const endDateString =
			endDate && new Intl.DateTimeFormat('en-US').format(endDate);

		setLoading(true);

		console.log(startDateString, endDateString);
		const response = await fetch(
			`${USGS_API_URL}${minMag > 0 ? '&minmagnitude=' + minMag : ''}${
				startDateString ? '&starttime=' + startDateString : ''
			}${endDateString ? '&endtime=' + endDateString : ''}`
		);
		const jsonResponse = await response.json();
		setEarthQuakes(jsonResponse.features);
		setLoading(false);
	};

	useEffect(() => {
		getEarthquakes();
	}, [minMag, startDate, endDate]);

	return (
		<div className='flex'>
			<div className='w-[400px] bg-gray-900 p-[20px] h-[100vh] fixed text-white'>
				<input
					className='max-w-sm min-w-[300px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'
					value={minMag}
					onChange={(event) => setMinMag(event.target.value)}
					type='number'
					placeholder='Minimum Magnitude'
				/>

				<div>
					Start date:{'  '}
					<DatePicker selected={startDate} onChange={setStartDate} />
				</div>

				<br />
				<div>
					End date:
					{'  '}
					<DatePicker selected={endDate} onChange={setEndDate} />
				</div>
				{/* <input 
					className='max-w-sm min-w-[300px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'
					value={startDate} onChange={(event) => setStartDate(event.target.value)} placeholder='Start Date'
				/>
				<input
					className='max-w-sm min-w-[300px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'				
					value={endDate} onChange={(event) => setEndDate(event.target.value)} placeholder='End Date'
				/> */}
				<button
					onClick={resetFilter}
					className='max-w-sm min-w-[250px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-rose-700 text-white rounded-[10px]'>
					Reset filters
				</button>

				{/* <button
					onClick={getEarthquakes}
					className='max-w-sm min-w-[250px] mx-[auto] m-[20px] p-[10px] block border border-1 border-gray-500 bg-rose-700 text-white rounded-[10px]'>
					Get Earthquakes
				</button> */}
			</div>
			<div className='ml-[400px] flex-grow'>
				<EarthquakeList earthquakes={earthquakes} loading={loading} />
			</div>
		</div>
	);
}

export default App;
