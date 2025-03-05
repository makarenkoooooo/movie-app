import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { store } from './redux/store'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Выбираем правильный Router в зависимости от среды
const Router =
  process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
