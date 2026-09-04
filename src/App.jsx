import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import useLanguageStore from './store/useLanguageStore';

function App() {
	const language = useLanguageStore((state) => state.language);

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	return <AppRoutes />;
}

export default App;
