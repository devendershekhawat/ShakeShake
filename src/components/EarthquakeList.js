import React, { useState } from 'react';
import Earthquake from './Earthquake';

function EarthquakeList() {
	const [earthquakes, setEarthQuakes] = useState();
	return (
		<Earthquake
			place='10km North of Liverpool'
			magnitude={4.5}
			time={1692989371900}
		/>
	);
}

export default EarthquakeList;
