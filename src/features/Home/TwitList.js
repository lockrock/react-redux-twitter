import React, { Component } from 'react'
import propTypes from 'prop-types'
import Twit, { twitReducer } from './Twit/Twit'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { search } from '../Search/Search'
import qs from 'querystring'
import './TwitList.css'

export const twitListReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

let TwitList = ({ statuses }) => {
    return <ul className="TwitList">
        {statuses ? 
            statuses.map(status => {
              return <Twit 
                {...status} 
                key={status.id} 
                />;
            }) :
            null}
      </ul>;
}

TwitList.propTypes = {
    statuses: propTypes.array.isRequired,
}

class SmartTwitList extends Component {

    static propTypes = {
        match: propTypes.object
    }

    constructor(...args){
        super(...args)
    }

    updateSearchResults() {
        let searchQuery = this.props.searchQuery
        if(searchQuery == null || searchQuery === "") searchQuery = "javascript"
        this.props.loadStatuses(searchQuery)
    }

    componentDidMount() {
        this.updateSearchResults()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.searchQuery !== 
            this.props.searchQuery) 
            this.updateSearchResults()
    }

    render() {
        return (            
                <TwitList statuses={this.props.statuses}/>
        )
    }
}

SmartTwitList = withRouter(connect(
    ({ statuses }, { location: { search} }) => {
        const q = qs.parse(search);
        let searchQuery = '';
        if(q && q['?q']) searchQuery = q['?q']
        return { searchQuery, statuses }
    },
    (dispatch) => ({
        loadStatuses(query) { dispatch(search(query)) }
    })
)(SmartTwitList))

export default SmartTwitList