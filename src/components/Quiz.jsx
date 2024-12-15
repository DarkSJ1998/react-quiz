import { useCallback, useState } from 'react';

import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import Question from './Question';

export default function Quiz() {
	const [answerState, setAnswerState] = useState('');
	const [userAnswers, setUserAnswers] = useState([]);

	/**
	 * If the current question is unanswered, we will show that,
	 * if the current question is answered, we will continue to
	 * show that for a while (userAnswers.length would point to
	 * the next question in this case).
	 */
	const activeQuestionIndex =
		answerState === '' ? userAnswers.length : userAnswers.length - 1;

	const handleSelectAnswer = useCallback((selectedOption) => {
		// Setting the option into the selected phase
		setAnswerState('answered');

		// Updating the state for the answers
		setUserAnswers((prev) => [...prev, selectedOption]);

		setTimeout(() => {
			/**
			 * Updating the answerState to indicate if the answer is
			 * correct or wrong.
			 */
			if (selectedOption === QUESTIONS[activeQuestionIndex].answers[0]) {
				setAnswerState('correct');
			} else {
				setAnswerState('wrong');
			}

			// After a while, we will move to the next question
			setTimeout(() => {
				setAnswerState('');
			}, 2000);
		}, [1000]);
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
				questionText={QUESTIONS[activeQuestionIndex].text}
				answers={QUESTIONS[activeQuestionIndex].answers}
				selectedAnswer={userAnswers[userAnswers.length - 1]}
				answerState={answerState}
				onSelect={handleSelectAnswer}
				onSkip={handleSkipAnswer}
			/>
		</div>
	);
}
