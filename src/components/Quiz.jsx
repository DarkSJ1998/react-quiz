import { useCallback, useState } from 'react';

import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import QuestionTimer from './QuestionTimer';

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
		console.debug(`userAnswers:`, userAnswers);

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
					{shuffledAnswers.map((option, index) => {
						// The dynamic CSS class that would be applied
						let cssClass = '';

						/**
						 * Fetching the previous question's answer, ie, the
						 * question that is being currently displayed
						 */
						const prevAnswer = userAnswers[userAnswers.length - 1];

						// Only for the current selected option
						if (prevAnswer === option) {
							switch (answerState) {
								// If the option is in the selection phase
								case 'answered':
									cssClass = 'selected';
									break;

								// If the option is correct/wrong
								case 'correct':
								case 'wrong':
									cssClass = `${answerState}`;
									break;
							}

							if (answerState === 'answered') {
								cssClass = 'selected';
							}
						}

						return (
							<li key={`option_${index + 1}`} className='answer'>
								<button
									onClick={() => handleSelectAnswer(option)}
									className={cssClass}
								>
									{option}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
