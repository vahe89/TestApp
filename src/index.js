import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from './store/reducers'



const store = createStore(
    reducers,
    applyMiddleware()
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
