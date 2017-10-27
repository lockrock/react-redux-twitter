import * as React from 'react'
import * as moment from 'moment'
import './Twit.css';

const Twit = (props, state) => (
  <li className="Twit card media">
      <img className="mr-3 Twit-userpic" src={props.user.profile_image_url_https} alt="User avatar"/>
      <div className="media-body">
        <header className="mt-0 Twit-header">
          <a href={props.user.url}>
            {props.user.name} ({props.user.screen_name})
          </a>
          <time dateTime={moment(props.created_at).toString()}>
            {moment(props.created_at).fromNow()}
          </time>
        </header>
        { props.text }
      </div>
  </li>
);

export default Twit;
