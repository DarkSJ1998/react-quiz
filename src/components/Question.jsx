import { useEffect, useState } from 'react';

import QUESTIONS from '../questions';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

export default function Question({ index, onSelect, onSkip }) {
	const [answer, setAnswer] = useState({
		selectedAnswer: '',
		isCorrect: null,
	});

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswer: answer,
			isCorrect: null,
		});

		setTimeout(() => {
			// Setting the option into the selected phase
			setAnswer({
				selectedAnswer: answer,
				isCorrect: answer === QUESTIONS[index].answers[0],
			});

			// After a while, we will move to the next question
			setTimeout(() => {
				onSelect(answer);
			}, 2000);
		}, 1000);
	}

	useEffect(() => {
		console.debug(`answer:`, answer);
	}, [answer]);

	/**
	 * Updating the answerState to indicate if the answer is
	 * correct or wrong.
	 */
	let answerState = '';
	if (answer.selectedAnswer) {
		answerState = answer.isCorrect ? 'correct' : 'wrong';
	}

	return (
		<div id='question'>
			<QuestionTimer timeout={10000} onTimeout={onSkip} />

			<h2>{QUESTIONS[index].text}</h2>

			<Answers
				answers={QUESTIONS[index].answers}
				selectedAnswer={answer.selectedAnswer}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
