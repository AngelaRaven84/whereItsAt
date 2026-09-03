import useLanguageStore from '../../store/useLanguageStore';

function LanguageSwitcher() {
	const language = useLanguageStore((state) => state.language);
	const setLanguage = useLanguageStore((state) => state.setLanguage);

	return (
		<div className='language-switcher' role='group' aria-label='Välj språk'>
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
