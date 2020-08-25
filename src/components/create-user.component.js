import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
            message : ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username : e.target.value,
            message : ''
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = { username : this.state.username };

        axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                console.log(res.data);
                this.setState({ message : res.data });
            });

        this.setState({ username : '' });
    }

    render() {
        return (
            <div className="container">
                <h3>Create a New User</h3>
                <form className="create-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />
                    </div>
                    <p style={{color : "dodgerblue"}}>{this.state.message}</p>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}