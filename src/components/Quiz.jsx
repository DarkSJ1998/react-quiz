import { useState } from 'react';

import QUESTIONS from '../questions';

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedOption) {
		console.debug(`userAnswers:`, userAnswers);
		setUserAnswers((prev) => [...prev, selectedOption]);
	}

	return (
		<div id='quiz'>
			<div id='question'>
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>

				<ul id='answers'>
					{QUESTIONS[activeQuestionIndex].answers.map(
						(option, index) => (
							<li key={`option_${index + 1}`} className='answer'>
								<button
									onClick={() => handleSelectAnswer(option)}
								>
									{option}
								</button>
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	);
}
