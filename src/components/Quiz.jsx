import { useCallback, useState } from 'react';

import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;

	const handleSelectAnswer = useCallback((selectedOption) => {
		console.debug(`userAnswers:`, userAnswers);
		setUserAnswers((prev) => [...prev, selectedOption]);
	}, []);

	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),
		[handleSelectAnswer]
	);

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

	return (
		<div id='quiz'>
			<div id='question'>
				<QuestionTimer
					key={QUESTIONS[activeQuestionIndex].id}
					timeout={10000}
					onTimeout={handleSkipAnswer}
				/>

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
