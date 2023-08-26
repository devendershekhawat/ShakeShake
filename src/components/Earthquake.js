import React from 'react';
import './Earthquake.css';

function Earthquake({ place, magnitude, time }) {
	const date = new Date(time);
	return (
		<div id='earthquake'>
			<p>{place}</p>
			<p>{magnitude}</p>
			<p>{date.toDateString()}</p>
		</div>
	);
}

export default Earthquake;
