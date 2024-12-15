import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

export default function Question({
	questionText,
	answers,
	selectedAnswer,
	answerState,
	onSelect,
	onSkip,
}) {
	return (
		<div id='question'>
			<QuestionTimer timeout={10000} onTimeout={onSkip} />

			<h2>{questionText}</h2>

			<Answers
				answers={answers}
				selectedAnswer={selectedAnswer}
				answerState={answerState}
				onSelect={onSelect}
			/>
		</div>
	);
}
