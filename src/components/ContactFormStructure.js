import React, { Component } from 'react';
import UserService from '../services/UserService'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import Postdata from '../data.json'
import { withRouter } from 'react-router';


class ContactFormStructure extends Component {
  
    constructor(props){
        super(props);
        this.state ={
            formId :this.props.formId,
            form : {},
            dummyData : Postdata,
            checkedItems : new Map(),
            initialItem : new Map(),
            fields: {},
            errors: {}
        }
        
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.contactSubmit = this.contactSubmit.bind(this);
    }
    

    handleCheckBoxChange(event) {
        this.state.dummyData.city.values.forEach((item) => this.state.initialItem.set(item,false));
        var isChecked = event.target.checked;
        var item = event.target.value;
        if(this.state.dummyData.city.vcity.multiSelection){
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        }
        else{   
          this.setState({checkedItems: this.state.initialItem.set(item, isChecked)});
        }       
  }


componentDidMount(){
      UserService.getContactStructure(this.state.formId).then((form)=>{
           this.setState({dummyData : form.data});
       }).then(
      this.state.dummyData.city.values.forEach((item) => this.state.checkedItems.set(item,false)),
      this.state.dummyData.city.values.forEach((item) => this.state.initialItem.set(item,false))
         );      
    }

handleValidation(){
      let fields = this.state.fields;
      let check = this.state.checkedItems;
      let errors = {};
      let formIsValid = true;

      //Name
      if(!fields["name"] && this.state.dummyData.nameObj.vname.mandatory){
         formIsValid = false;
         errors["name"] = "Cannot be empty";
      }

      if(typeof fields["name"] !== "undefined"){
         if(!fields["name"].match(/^[a-zA-Z]+$/) && this.state.dummyData.nameObj.vname.stringType === "alpha"){
            formIsValid = false;
            errors["name"] = "Only letters";
         } 
         if(!fields["name"].match(/^[a-zA-Z0-9]+$/) && this.state.dummyData.nameObj.vname.stringType === "alphaNumeric"){
          formIsValid = false;
          errors["name"] = "Only letters";
       }               
      }
      //age
      if(!fields["age"] && this.state.dummyData.age.vage.mandatory){
         formIsValid = false;
         errors["age"] = "Cannot be empty";
      }

      if(fields["age"] && !(fields["age"] >= this.state.dummyData.age.vage.minInclusive && fields["age"] <= this.state.dummyData.age.vage.maxInclusive)){
        formIsValid = false;
        errors["age"] = "Out of range";
      }
      //checkbox
      if(!Array.from(check.values()).includes(true) && this.state.dummyData.city.vcity.mandatory){
      formIsValid = false;
      errors["city"] = "Cannot be empty";
      }
      this.setState({errors: errors});
      return formIsValid;
 }

contactSubmit = (e) => {
    let keys = [];
    e.preventDefault();
    if(this.handleValidation()){  
        for (let key of this.state.checkedItems){  
          if(key[1]){ 
             keys.push(key[0]);}}
             let user = {name : this.state.fields.name,age : this.state.fields.age,cities : keys}
             UserService.createNewContact(user).then(
               rest => {
                 this.props.history.push("/")}
              );
             alert("Form submitted" + user);
          console.log(user);
     }else{
     alert("Form has errors.")
     }
}

 handleChange(field, e){         
       let fields = this.state.fields;
       fields[field] = e.target.value;        
       this.setState({fields});
}

  
    render() {
        return (
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form className="topPadding" onSubmit= {this.contactSubmit}>
                  <p className="h5 text-center mb-4">Write to us</p>

                  <label className="black-text">{this.state.dummyData.nameObj.name} </label>
                  <input type="text" className="form-control" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                  <p className="smallText"><span style={{color: "red"}}>{this.state.errors["name"]}</span>(Type = {this.state.dummyData.nameObj.vname.stringType} , Madatory = {this.state.dummyData.nameObj.vname.mandatory.toString()})</p>
        

                  <label className="black-text">{this.state.dummyData.age.name}</label>
                  <input type="number" className="form-control"  onChange={this.handleChange.bind(this, "age")} value={this.state.fields["age"]}/>
                  <p className="smallText"><span style={{color: "red"}}>{this.state.errors["age"]}</span>(MaxValue = {this.state.dummyData.age.vage.maxInclusive}, MinValue = {this.state.dummyData.age.vage.minInclusive}, Mandatory = {this.state.dummyData.age.vage.mandatory.toString()})</p>



                  <label className="black-text">{this.state.dummyData.city.city}</label>
                  <div>{this.state.dummyData.city.values.map((option) => ( 
                         <div className="form-check form-check-inline">
                           <label>
                             <input  
                               type="checkbox"
                               value={option}
                               checked={this.state.checkedItems.get(option)}
                               onChange={this.handleCheckBoxChange}    
                             /> {option}
                           </label>
                         </div>))}
                    </div>
                    <p className="smallText"><span style={{color: "red"}}>{this.state.errors["city"]}</span>(Multiselection = {this.state.dummyData.city.vcity.multiSelection.toString()}, Mandatory = {this.state.dummyData.city.vcity.mandatory.toString()}) </p>

                  <br />



                  <div className="text-center mt-4">
                   <MDBBtn gradient="blue" className="mb-3" type="submit" >
                  SEND
                  <MDBIcon far icon="paper-plane" className="ml-2" />
                   </MDBBtn>
                   </div>
                        </form>
            
                  
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
       
        );
    }
}

export default withRouter(ContactFormStructure);