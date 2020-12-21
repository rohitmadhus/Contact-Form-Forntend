import React, { Component } from 'react';
import UserService from '../services/UserService';

class AddUser extends Component {
    constructor(props){  
        super(props); 
        this.state = {
            name : "",
            age  :"",
            cities : ""

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.userSave = this.userSave.bind(this);
        
    }
    changeNameHandler = (event ) =>{
        this.setState({name : event.target.value})
    }
    changeAgeHandler = (event ) =>{
        this.setState({age : event.target.value})
    }
    changeCityHandler = (event ) =>{
        this.setState({cities : event.target.value})
    }

    userSave = (event ) =>{
        event.preventDefault();
        let user = {name : this.state.name,age : this.state.age,cities : this.state.cities}
        console.log("user =>" + JSON.stringify(user));
        UserService.createUser(user).then(rest => {this.props.history.push("/users")}
       );
    }
    cancelUser = (event ) =>{
        this.props.history.push("/users")
    }
    
    
    

    
    render() {
        return (
            <div>
                <div className = "Container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Add User</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group"></div>
                                    <input placeholder="name" name="name" className="form-control"
                                    value={this.state.name} onChange={this.changeNameHandler}></input>
                                    
                                    <div className="form-group"></div>
                                    <input placeholder="Age" name="age" className="form-control"
                                    value={this.state.age} onChange={this.changeAgeHandler}></input>
                                    
                                    <div className="form-group"></div>
                                    <input placeholder="City" name="cities" className="form-control"
                                    value={this.state.cities} onChange={this.changeCityHandler}></input>
                                    
                                    <button className="btn btn-success toolbar-btn" onClick={this.userSave}>Save</button>
                                    <button className="btn btn-danger toolbar-btn" onClick={this.cancelUser.bind(this)}>Cancel</button>
                            
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddUser;