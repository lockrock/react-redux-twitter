import React from 'react'
import api from '../api'
import { connect } from 'react-redux'
import uniqBy from "lodash.uniqby";

export const loadMoreReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_MORE_START":
      if (state.loadingMore) return state;
      return {
        ...state,
        loadingMore: true
      };

    case "LOAD_MORE_FINISHED":
      const newList = uniqBy(state.statuses.concat(action.statuses), "id_str")
      console.log('NEW LIST', newList)
      return {
        ...state,
        loadingMore: false,
        statuses: newList,
        
      };

    case "LOAD_MORE_FAILED":
      return {
        ...state,
        loadMoreError: action.error,
        loadingMore: false
      };

    default:
      return state;
  }
};

export const load = (since_id, count, query) => (dispatch) => {
    dispatch({
        type: 'LOAD_MORE_START',
        since_id, 
        count,
        q: query,
    })

    api.request({
        since_id, count, q: query
    }).then(
        (res) => {
            res.json().then((res) => {
                dispatch({ type: 'LOAD_MORE_FINISHED', statuses: res.statuses })
            })
            
        },
        (searchError) => {
            dispatch({ type: 'LOAD_MORE_FAILED', searchError})
        }
    )
}

const mapStateToProps = ({loadingMore, statuses, searchQuery}) => ({loadingMore, statuses, searchQuery})
const mapDispatchToProps = (dispatch) => ({
    onLoadMore: (since_id, count, query) => dispatch(load(since_id, count, query))
})

let LoadMore = props => {

    const onClick = e =>{
        e.preventDefault()
        const last = props.statuses[props.statuses.length-1];
        let since_id;
        if (last) since_id = last.id;
        else return;
        props.onLoadMore(
            since_id,
            10,
            props.searchQuery
        )
    }
    return (
        <button
        className="btn"
        onClick={onClick}
        >
            {props.loadingMore ? "Loading..." : "Load More"}
        </button>
  );
};
LoadMore = connect(mapStateToProps, mapDispatchToProps)(LoadMore)

export default LoadMore