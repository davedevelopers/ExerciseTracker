import React, { Component } from 'react';
import axios from 'axios';

export class CreateUser extends Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
        }
    }

    onChangeState(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const {username} = this.state;
        const user = {
            username,
        };

        axios.post('http://localhost:5000/users/add', user)
            .then(result=>console.log(result.data))
        console.log(user);
        this.setState({
            username:''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        name="username"
                        className="form-control"
                        value={this.state.username}
                        onChange={(e)=>this.onChangeState(e)}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}

export default CreateUser
