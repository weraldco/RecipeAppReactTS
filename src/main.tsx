import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GlobalState from './components/context.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<GlobalState>
				<App />
			</GlobalState>
		</StrictMode>
	</BrowserRouter>
);
