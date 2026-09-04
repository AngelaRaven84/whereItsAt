import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';

function LanguageSwitcher() {
	const language = useLanguageStore((state) => state.language);
	const setLanguage = useLanguageStore((state) => state.setLanguage);
	const t = translations[language].navigation;

	return (
		<div
			className='language-switcher'
			role='group'
			aria-label={t.chooseLanguage}>
			<button
				type='button'
				aria-pressed={language === 'sv'}
				onClick={() => setLanguage('sv')}>
				SV
			</button>

			<button
				type='button'
				aria-pressed={language === 'en'}
				onClick={() => setLanguage('en')}>
				EN
			</button>
		</div>
	);
}

export default LanguageSwitcher;
