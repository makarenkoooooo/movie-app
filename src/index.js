import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store' // Подключаем store
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Оборачиваем приложение в Redux Provider */}
      <App />
    </Provider>
  </React.StrictMode>
)

// Если нужно измерять производительность
reportWebVitals()
