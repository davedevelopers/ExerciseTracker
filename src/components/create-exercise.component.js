import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
 
import "react-datepicker/dist/react-datepicker.css";

export class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
            .then(response=>{
                if(response.data.length > 0){
                    this.setState({
                        users:response.data.map(user=>user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeState(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        })
    }

    onChangeDate(date) {
        this.setState({
            date:date
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const {username, description, duration, date} = this.state;
        const exercise = {
            username,
            description,
            duration,
            date
        };

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(result=>console.log(result.data))
        
        console.log(exercise);
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create Exercises component</h3>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <select
                            name="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={(e)=>this.onChangeState(e)}
                        >
                            {
                                this.state.users.map((user)=>{
                                    return <option key={user} value={user}>
                                        {user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={(e)=>this.onChangeState(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text" 
                            name="duration"
                            className="form-control"
                            value={this.state.duration}
                            onChange={(e)=>this.onChangeState(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={(e)=>this.onChangeDate(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateExercise
