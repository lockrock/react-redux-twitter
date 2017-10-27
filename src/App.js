import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Twit from './features/Home/Twit/Twit'
import { bindToComponent } from './utils/component'
import './App.css';
import api from './api'
import uniqBy from 'lodash.uniqby'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends Component {
  constructor(props, state) {
    super(props);
    this.state = {
      searchQuery: "#javascript",
      statuses: []
    };

    this.searchByQuery = this.searchByQuery.bind(this);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);

    this.searchByQuery({ q: "#javascript", count: 10 });
  }

  requestQuery(query) {
    return api.search(query).then(resp => resp.json());
  }

  searchByQuery(query) {
    this.requestQuery(query).then(({ statuses }) => {
      console.log(statuses);
      this.setState((oldState, props) => ({ ...oldState, statuses }));
    });
  }

  onChangeSearchQuery(e) {
    const val = e.target.value;
    this.setState({ searchQuery: val, count: 10 });
  }

  onSearch(e) {
    e.preventDefault();
    this.searchByQuery({ q: this.state.searchQuery, count: 10 });
    
  }

  mergeArrays(arr1, arr2) {}

  onLoadMore(e) {
    const statuses = this.state.statuses,
      statLength = statuses.length,
      lastId = statuses[statLength - 1].id_str;

    this.requestQuery({
      q: this.state.searchQuery,
      since_id: lastId,
      count: 10
    }).then(({ statuses }) => {
      this.setState(prevState => ({
        ...prevState,
        statuses: uniqBy(prevState.statuses.concat(statuses), "id_str")
      }));
    });
  }

  render() {
    const statuses = this.state.statuses
    return <Router>
        <div className="container-fluid App">
          <form onSubmit={this.onSearch}>
            <input className="form-control" type="text" value={this.state.searchQuery} onChange={this.onChangeSearchQuery} />
            <button className="form-control">Search</button>
          </form>
          <ul className="App-twits">
            {statuses ? statuses.map(status => {
                  return <Twit {...status} key={status.id} />;
                }) : null}
          </ul>

          {/* <Route exact path="/" {...this.state} render={(props) => <ul className="App-twits">
                {console.log(props)}
                {statuses
                  ? statuses.map(status => {
                    console.log(props)
                    return  <Twit {...status} key={status.id} />
                  })
                  : null}
              </ul>} />
          <Route path="/:searchTerm" render={(props) => <ul className="App-twits">
                {console.log(props)}
                {statuses
                  ? statuses.map(status => {
                    console.log(props)
                    return  <Twit {...status} key={status.id} />
                  })
                  : null}
              </ul>} /> */}

          <button className="btn" onClick={this.onLoadMore}>
            Load more
          </button>
        </div>
      </Router>;
  }
}



export default App;
