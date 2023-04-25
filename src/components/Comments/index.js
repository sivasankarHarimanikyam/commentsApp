import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ComponentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      inputUsername: username,
      inputComment: comment,
      postTime: new Date(),
      like: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  onLikeComment = uniqueId => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (uniqueId === eachComment.id) {
          return {...eachComment, like: !eachComment.like}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  render() {
    const {commentsList, username, comment} = this.state
    const commentCount = commentsList.length
    return (
      <div className="comments-bg-container">
        <div className="comments-container">
          <h1 className="main-heading">Comments</h1>
          <div className="input-comments-container">
            <form className="input-container">
              <p className="input-heading">
                Say something about 4.0 technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                className="user-name"
                onChange={this.onChangeUsername}
                value={username}
              />
              <textarea
                type="text"
                placeholder="Your Comment"
                className="user-comment"
                onChange={this.onChangeComment}
                value={comment}
              />
              <button
                type="submit"
                className="add-button"
                onClick={this.onAddComment}
              >
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="head-image"
            />
          </div>

          <hr className="h-line" />
          <div className="comments-count-container">
            <p className="comments-count">{commentCount}</p>
            <p className="comments-tag">Comments</p>
          </div>
          <ul className="display-comments-container">
            {commentsList.map(eachComment => (
              <ComponentItem
                commentDetails={eachComment}
                key={eachComment.id}
                initialsBackground={initialContainerBackgroundClassNames}
                onLikeComment={this.onLikeComment}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
