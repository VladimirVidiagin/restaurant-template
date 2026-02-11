import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { store } from '@app/store'
import { initTelegramWebApp } from '@shared/lib/telegram'

// Initialize Telegram WebApp
initTelegramWebApp()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={import.meta.env.BASE_URL}>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
