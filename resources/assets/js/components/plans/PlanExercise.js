import React, { Component } from 'react'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
export default class PlanExercise extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exercises: this.props.info.exercises,
      duration: this.props.info.duration,
      selectedExercise: this.props.info.selectedExercise == 0 ? this.props.info.exercises[0]['id'] : this.props.info.selectedExercise
    }
  }

  render () {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Exercise duration</ControlLabel>
          <FormControl
            value={this.state.duration}
            onChange={event => {
              this.setState({
                duration: event.target.value
              })
            }}
          />
        </FormGroup>

        <FormGroup controlId='formControlsSelect'>
          <ControlLabel>Plan Difficulty</ControlLabel>
          <FormControl
            componentClass='select'
            placeholder='select'
            value={this.state.selectedExercise}
            onChange={event => {
              this.setState({
                selectedExercise: event.target.value
              })
            }}
          >
            {this.state.exercises.map((value, index) => (
              <option key={'exe_' + index} value={value.id}>{value.exercise_name}</option>
          ))}
          </FormControl>
        </FormGroup>

        <Button bsStyle='success' className='addButton' onClick={() => {
          this.props.storeExercise(this.state)
        }}>Save</Button>
      </div>
    )
  }
}
