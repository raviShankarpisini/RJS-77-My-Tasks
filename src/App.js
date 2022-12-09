import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    input: '',
    option: tagsList[0].optionId,
    selectedTag: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {input, option} = this.state
    const newItem = {input, option, id: uuid()}
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newItem],
      input: '',
      option: tagsList[0].optionId,
    }))
  }

  onClickOption = event => {
    const {selectedTag} = this.state
    if (selectedTag === event.target.value) {
      this.setState({selectedTag: ''})
    } else {
      this.setState({selectedTag: event.target.value})
    }
  }

  onChangeInput = event => this.setState({input: event.target.value})

  onChangeOption = event => this.setState({option: event.target.value})

  render() {
    const {input, tasksList, option, selectedTag} = this.state
    let filterSelectedTasks = ''
    if (selectedTag === '') {
      filterSelectedTasks = tasksList
    } else {
      filterSelectedTasks = tasksList.filter(
        each => each.option === selectedTag,
      )
    }

    console.log(tasksList, 'tasks')
    console.log(filterSelectedTasks, 'seleted tasks')
    return (
      <div>
        <div className="left-card">
          <h1>Create a task!</h1>
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="Task">Task</label>
            <input
              id="Task"
              type="text"
              value={input}
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
            />
            <label htmlFor="Tags">Tags</label>
            <select id="Tags" onChange={this.onChangeOption} value={option}>
              {tagsList.map(each => (
                <option value={each.optionId} key={each.displayText}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="right-card">
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickOption}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>

          <h1>Tasks</h1>
          {filterSelectedTasks.length === 0 ? (
            <p>No Tasks Added Yet.</p>
          ) : (
            <ul>
              {filterSelectedTasks.map(each => (
                <li key={each.id}>
                  <div>
                    <p>{each.input}</p>
                    <p>{each.option}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
