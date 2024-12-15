import { useEffect, useState } from 'react';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

export default function Question({
	questionText,
	answers,
	selectedAnswer,
	// answerState,
	onSelect,
	onSkip,
}) {
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
			setAnswer({
				selectedAnswer: answer,
				isCorrect: answer === answers[0],
			});

			setTimeout(() => {
				onSelect(answer);
			}, 2000);
		}, 1000);
	}

	useEffect(() => {
		console.debug(`answer:`, answer);
	}, [answer]);

	let answerState = '';
	if (answer.selectedAnswer) {
		answerState = answer.isCorrect ? 'correct' : 'wrong';
	}

	return (
		<div id='question'>
			<QuestionTimer timeout={10000} onTimeout={onSkip} />

			<h2>{questionText}</h2>

			<Answers
				answers={answers}
				selectedAnswer={selectedAnswer}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
