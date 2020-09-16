import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTweet as addTweetAction } from '../actions';
import Avatar from './Avatar';
import { isEmpty } from '../utils';

const MAX_CHARS = 60;

export class NewTweet extends Component {

  constructor(props) {
    super(props);
    this.publishTweet = this.publishTweet.bind(this);
  }

  state = { text: '' }

  publishTweet() {
    const { user, addTweet } = this.props;
    const { text } = this.state;
    addTweet({
      content: text,
      userId: user.id,
      likes: [],
      date: new Date(),
      retweets: 0,
    });
    this.setState({text: ''});
  }

  render() {
    const { user } = this.props;
    if (!user || isEmpty(user)) {
      return null;
    }
    return (
      <div className="new-tweet">
        <Avatar src={user.avatar} />
        <input
          value={this.state.text}
          className="new-tweet-input"
          placeholder="What's happening?"
          data-testid="new-tweet-input"
          maxLength={MAX_CHARS}
          onChange={({ target: { value } }) => this.setState({ text: value })}
        />
        <button
          className="new-tweet-button"
          type="button"
          data-testid="new-tweet-button"
          onClick={this.publishTweet}
          disabled={this.state.text.length == 0}
        >
          Tweet
        </button>
      </div>
    );
  }
}

NewTweet.propTypes = {
  user: PropTypes.object.isRequired,
  addTweet: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { addTweet: addTweetAction })(NewTweet);
