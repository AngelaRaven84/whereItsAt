import { Link } from 'react-router-dom';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';

function NotFound() {
	const language = useLanguageStore((state) => state.language);
	const t = translations[language].notFound;
	const goBackLabel = translations[language].navigation.goBack;

	return (
		<section>
			<h1>404</h1>
			<p>{t.message}</p>

			<Link aria-label={goBackLabel} to='/'>
				{goBackLabel}
			</Link>
		</section>
	);
}

export default NotFound;
