import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import ProviderWrapper from './Provider';
import bridge from '@vkontakte/vk-bridge';
import 'semantic-ui-css/semantic.min.css';

bridge.send("VKWebAppInit", {}); 

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const CalcApp = () => (
    <ProviderWrapper store={ store }>
        <App />
    </ProviderWrapper>
);

ReactDOM.render(
    <CalcApp />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
