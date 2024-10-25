// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    inputTitle: '',
    inputDate: '',
    starredStatus: false,
  }

  onClickAdd = event => {
    const {appointmentsList, inputDate, inputTitle, starredStatus} = this.state

    const checkInputs = inputTitle !== '' && inputDate !== ''

    event.preventDefault()
    const newList = {
      id: uuidv4(),
      title: inputTitle,
      date: inputDate,
      isStarred: false,
      newDate: format(new Date(inputDate), 'dd MMMM yyyy, EEEE'),
      bookmarkImg:
        'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png',
    }

    if (checkInputs) {
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newList],
        inputTitle: '',
        inputDate: '',
      }))
    }
  }

  onChangeInputDate = event => {
    this.setState({inputDate: event.target.value})
  }

  onChangeInputTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onClickBookmark = id => {
    const appointmentsList = this.state
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({starredStatus: !prevState.starredStatus}))
  }

  render() {
    const {appointmentsList, inputDate, inputTitle, starredStatus} = this.state
    let filterdData = appointmentsList
    if (starredStatus) {
      filterdData = appointmentsList.filter(each => each.isStarred === true)
    }

    return (
      <div className="bg">
        <div className="card">
          <h1>Add Appointment</h1>
          <div>
            <form onSubmit={this.onClickAdd}>
              <div className="default-page">
                <div className="inputs-container">
                  <div className=" title-container">
                    <label htmlFor="inputTitle">Title</label>
                    <input
                      id="inputTitle"
                      type="text"
                      className="input-title"
                      placeholder="Title"
                      onChange={this.onChangeInputTitle}
                      value={inputTitle}
                    />
                  </div>
                  <div className="title-container">
                    <label htmlFor="inputDate">DATE</label>
                    <input
                      id="inputDate"
                      type="date"
                      className="input-title"
                      onChange={this.onChangeInputDate}
                      value={inputDate}
                    />
                  </div>
                  <div>
                    <button type="submit" className="add-btn">
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                    alt="appointments"
                  />
                </div>
              </div>
            </form>
          </div>
          <hr />
          <div>
            <div className="appointments-starred">
              <h1>Appointments</h1>
              <button
                type="button"
                className="starred-btn"
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>
            <ul className="main-container">
              {filterdData.map(eachItem => (
                <AppointmentItem
                  appointment={eachItem}
                  key={eachItem.id}
                  onClickBookmark={this.onClickBookmark}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
