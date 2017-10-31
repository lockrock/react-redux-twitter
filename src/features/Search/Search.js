import React from 'react'
import { connect } from 'react-redux'
import api from '../../api'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'

const mapStateToProps = ({  }, {location: { search }}) => {
    const q = qs.parse(search);
    let searchQuery = '';
    if(q && q['?q']) searchQuery = q['?q']
    return {
        searchQuery,
    }
}

const mapDispatchToProps = (dispatch) => ({
    // onSearch(searchQuery) {
    //     dispatch(search(searchQuery))
    // }
})

export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_START':
      return { ...state, 
        searchQuery: action.searchQuery, 
        loading: true 
    };

    case 'SEARCH_FINISHED':
      return {
        ...state,
        statuses: action.statuses,
        loading: false,
        searchError: null
      };

    case 'SEARCH_FAILED':
      return { 
          ...state, 
          searchError: action.error, 
          loading: false 
        };

    default:
      return state;
  }
};

export const search = (searchQuery) => (dispatch) => {
    dispatch({
        type: 'SEARCH_START',
        searchQuery,
    })
    api.search(searchQuery).then(
        (res) => {
            res.json().then((res) => {
                dispatch({ type: 'SEARCH_FINISHED', statuses: res.statuses })
            })
            
        },
        (searchError) => {
            dispatch({ type: 'SEARCH_FAILED', searchError})
        }
    )
}

let Search = ({ searchQuery, onSearch, history }) => {

    let input;

    const onChange = (e) => { 
        searchQuery = input.value 
    }

    const onSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?q=${encodeURIComponent(input.value)}`)
    }

    return <form onSubmit={onSubmit}>
        <input 
            className="form-control" 
            type="text" 
            defaultValue={searchQuery} 
            ref={node => input = node}
            onChange={onChange}
            />
        <button className="form-control">Search</button>
    </form>
}

Search = withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

export default Search