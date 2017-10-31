import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import api from './api'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import propTypes from 'prop-types'
import TwitList from './features/Home/TwitList'
import Search, { search } from './features/Search/Search'
import LoadMore, { load } from './features/LoadMore'

class App extends Component {

  static propTypes = {
    dispatch: propTypes.func.isRequired,
    match: propTypes.string,
  }

  constructor(props) {
    super(props);
    const { dispatch } = props;
    // this.searchByQuery = this.searchByQuery.bind(this);
  }

  componentDidMount() {
    // this.searchByQuery('#javascript')
  }

  searchByQuery(query) {
    // this.props.dispatch(search(query))
  }

  onLoadMore(e) {
    const statuses = this.state.statuses,
      statLength = statuses.length,
      lastId = statuses[statLength - 1].id;

    this.props.dispatch(load(lastId, 10, this.props.searchQuery))
  }

  render() {
    return <div className="container-fluid App">
        
        <Search />        
        <Route path="/search" component={TwitList}></Route> 
        <Route exact path="/" component={TwitList}></Route>
        <LoadMore /> 
      </div>;
  }
}



export default withRouter(connect()(App));
