import { useState } from 'react';

import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;

	const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

	if (isQuizCompleted) {
		return (
			<div id='summary'>
				<img src={quizCompletePng} alt='Trophy icon' />
				<h2>Quiz Completed!</h2>
			</div>
		);
	}

	const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
	shuffledAnswers.sort(() => Math.random() - 0.5);

	function handleSelectAnswer(selectedOption) {
		console.debug(`userAnswers:`, userAnswers);
		setUserAnswers((prev) => [...prev, selectedOption]);
	}

	return (
		<div id='quiz'>
			<div id='question'>
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>

				<ul id='answers'>
					{shuffledAnswers.map((option, index) => (
						<li key={`option_${index + 1}`} className='answer'>
							<button onClick={() => handleSelectAnswer(option)}>
								{option}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
