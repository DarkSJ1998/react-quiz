import { useEffect, useState } from 'react';

const UPDATE_INTERVAL = 10;

export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log('Setting timeout');

		setTimeout(onTimeout, timeout);
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log('Setting timeout');

		const interval = setInterval(() => {
			setRemainingTime((prev) => prev - UPDATE_INTERVAL);
		}, UPDATE_INTERVAL);

		return () => clearInterval(interval);
	}, []);

	return <progress id='question-time' value={remainingTime} max={timeout} />;
}
