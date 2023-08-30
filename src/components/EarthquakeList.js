import React, { useEffect, useState } from 'react';
import Earthquake from './Earthquake';
import Loader from './loader';
import SearchBox from './SearchBox';

const USGS_API_URL =
	'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=500'; //query parameters

function EarthquakeList({ earthquakes, loading }) {
	const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
	const [query, setQuery] = useState('');
	 // callback is a function //dependencies is an array of variables
	//useEffect --> whenever a variable in dependencies array changes it runs the callback
	/**
	 * useEffect runs when
	 * 1. component loads for the first time
	 * 2. when any variable inside depedencies change
	 */

	// Todo: when query changes, set earthquakes to a filtered value

	useEffect(() => {
		// filter earthquakes with have query in their place name and set it to searquakes state
		console.log(earthquakes);
		const filtered = earthquakes
			.filter((eq) => eq.properties.mag >= 0 && eq.properties.mag <= 15)
			.filter(
				(eq) =>
					eq.properties.place &&
					eq.properties.place.toLowerCase().includes(query.toLocaleLowerCase())
			);
		setFilteredEarthquakes(filtered);
		// 500 --> 10 --
	}, [query, earthquakes]);

	if (loading) return <Loader />;
	return (
		<div className='max-w-lg mx-auto'>
			<SearchBox query={query} setQuery={setQuery} />
			{filteredEarthquakes.length
				? filteredEarthquakes.map((earthqauke) => (
						<Earthquake
							coordinates={earthqauke.geometry.coordinates}
							place={earthqauke.properties.place}
							magnitude={earthqauke.properties.mag}
							time={earthqauke.properties.time}
							tsunamiAlert={!!earthqauke.properties.tsunami}
							depth={earthqauke.geometry.coordinates[2]}
						/>
				  ))
				: renderNoResultMessage()}
		</div>
	);
}

function renderNoResultMessage() {
	return (
		<div className='max-w-lg bg-slate-500 p-[20px] rounded-[15px] m-[20px] text-center text-[48px]'>
			No Results Found
		</div>
	);
}

export default EarthquakeList;
