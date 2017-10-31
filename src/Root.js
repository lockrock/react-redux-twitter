import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import propTypes from 'prop-types'
import { createLogger } from 'redux-logger'
import App from './App'
import api from './api'
import { searchReducer } from './features/Search/Search'
import { loadMoreReducer } from './features/LoadMore'
import { Route, BrowserRouter as Router } from "react-router-dom";

function app(
    state = {
      statuses: [],
      loading: false,
      loadingMore: false,
      loadMoreError: null,
      searchError: null,
    }, 
    action
  ) {
      return searchReducer(loadMoreReducer(state, action), action)
  }

const middlewares = [thunk];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(createLogger());
}

export const store = createStore(
    app,
    applyMiddleware(...middlewares)
)

const Root = ({store}) => (
    <Provider store={store} >
        <Router>
            {/* {<Route path="/search/:searchQuery?" component={App} />} */}
            {/* {<Route path="/" component={App} />} */}
            {<App />}
        </Router>  
        {/* <App /> */}
    </Provider>
)

Root.propTypes = {
    store: propTypes.object.isRequired,
}

export default Root