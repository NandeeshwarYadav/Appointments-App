// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, onClickBookmark} = props
  const {id, title, newDate, isStarred, bookmarkImg} = appointment
  const clickBookmark = () => {
    onClickBookmark(id)
  }
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-card">
      <div className="title-starredBtn">
        <p className="title">{title}</p>
        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={clickBookmark}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="date">Date:{newDate}</p>
    </li>
  )
}

export default AppointmentItem
