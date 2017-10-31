import * as React from "react";
import * as moment from "moment";
import "./Twit.css";

class Twit extends React.Component {

  render() {
    return (
      <li className="Twit card media">
        <img
          className="mr-3 Twit-userpic"
          src={this.props.user.profile_image_url_https}
          alt="User avatar"
        />
        <div className="media-body">
          <header className="mt-0 Twit-header">
            <a href={this.props.user.url}>
              {this.props.user.name} ({this.props.user.screen_name})
            </a>
            <time dateTime={moment(this.props.created_at).toString()}>
              {moment(this.props.created_at).fromNow()}
            </time>
          </header>
          {this.props.text}
        </div>
      </li>
    );
  }
}

export default Twit;
