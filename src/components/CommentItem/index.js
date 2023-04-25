// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const ComponentItem = props => {
  const {commentDetails, onLikeComment, deleteComment} = props
  const {
    id,
    inputUsername,
    inputComment,
    postTime,
    like,
    initialClassName,
  } = commentDetails
  const firstLetter = inputUsername.slice(0, 1).toUpperCase()
  const sincePost = formatDistanceToNow(postTime)

  const likeTextClassName = like ? 'button active' : 'button'

  const onClickLike = () => {
    onLikeComment(id)
  }

  const onDeleteComment = () => {
    deleteComment(id)
  }

  const likeImage =
    'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likedImage =
    'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  return (
    <li className="display-comment-container">
      <div className="details-container">
        <div className={initialClassName}>
          <p className="initial">{firstLetter}</p>
        </div>
        <div>
          <div className="name-time-container">
            <h1 className="username">{inputUsername}</h1>
            <p className="post-time">{sincePost}</p>
          </div>
          <p className="comment">{inputComment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <img
            src={like ? likedImage : likeImage}
            alt="like"
            className="like-icon"
          />
          <button
            type="button"
            className={likeTextClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          data-testid="delete"
          className="button"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
      <hr className="h-line" />
    </li>
  )
}

export default ComponentItem
