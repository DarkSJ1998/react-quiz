import QuizLogo from '../assets/quiz-logo.png';

export default function Header() {
	return (
		<header>
			<img src={QuizLogo} alt='Quiz Logo' />
			<h1>ReactQuiz</h1>
		</header>
	);
}
