import { useRef } from 'react';

export default function Answers({
	answers,
	selectedAnswer,
	answerState,
	onSelect,
}) {
	// A Ref so that we can persist the value across renders
	const shuffledAnswers = useRef();

	// Setting it on the first render cycle and not again
	if (!shuffledAnswers.current) {
		shuffledAnswers.current = [...answers];
		shuffledAnswers.current.sort(() => Math.random() - 0.5);
	}

	return (
		<ul id='answers'>
			{shuffledAnswers.current.map((option, index) => {
				// The dynamic CSS class that would be applied
				let cssClass = '';

				/**
				 * Fetching the previous question's answer, ie, the
				 * question that is being currently displayed
				 */
				const prevAnswer = selectedAnswer;

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
							onClick={() => onSelect(option)}
							className={cssClass}
							disabled={answerState !== ''}
						>
							{option}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
