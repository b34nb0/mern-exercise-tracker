import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}><CreateOutlinedIcon style={{color : "#212529"}} /></Link> | <button type="button" className="link-button" onClick={() => {props.deleteExercise(props.exercise._id)}}><DeleteForeverOutlinedIcon color="secondary"/></button>
        </td>
    </tr>
);

export default class ExercisesList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises : []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                this.setState({exercises : response.data})
            })
            .catch(err => console.log(err));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => console.log(response.data));
        this.setState({
            exercises : this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(ex => {
            return <Exercise exercise={ex} deleteExercise={this.deleteExercise} key={ex._id} />
        })
    }

    render() {
        return (
            <div>
                <div class="banner">
                    <h3>Exercise Log</h3>
                    <img alt="Woman with jumping rope" src="https://image.freepik.com/free-photo/side-view-young-female-with-jumping-rope_23-2148435300.jpg"/>
                </div>
                <div>
                    <table className="table table-striped table-exercises">
                        <thead className="thead-dark">
                            <tr>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.exerciseList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}