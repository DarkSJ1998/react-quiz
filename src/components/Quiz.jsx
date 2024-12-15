import { useCallback, useState } from 'react';

import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import Question from './Question';

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;

	const handleSelectAnswer = useCallback((selectedOption) => {
		// Updating the state for the answers
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

	return (
		<div id='quiz'>
			<Question
				key={activeQuestionIndex}
				index={activeQuestionIndex}
				onSelect={handleSelectAnswer}
				onSkip={handleSkipAnswer}
			/>
		</div>
	);
}
