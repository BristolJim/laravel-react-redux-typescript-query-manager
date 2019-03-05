import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const rootElement = document.getElementById('app-content');
const store = createStore(rootReducer)

if (rootElement) {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        rootElement
    )
}
