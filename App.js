import React, { Component } from 'react';
import axios from 'axios'
import { Table,Button,Modal,ModalHeader,ModalBody,ModalFooter,FormGroup,Label,Input } from 'reactstrap'
import './App.css';

class App extends Component {
  state = {
    datas : [],
    addUserModal : false,
    editUserModal: false,
    addUserData : {
      firstname: '',
      lastname :'',
      email:'',
      age:''
    },
    editUserData : {
      id : '',
      firstname: '',
      lastname :'',
      email:'',
      age:''
    }
  }


componentDidMount(){
  this.fetchAllRecords();
}

toggleAddUser = () =>{
  this.setState({ 
    addUserModal : ! this.state.addUserModal
  })
}

toggleEditUser = () =>{
  this.setState({ 
    editUserModal : ! this.state.editUserModal
  })
}

addUser = () => {
  axios.post("http://localhost:3000/Users", this.state.addUserData).then((res) =>{
    const { datas } = this.state

    datas.push(res.data)

    this.setState({
      datas, addUserModal : false, 
       addUserData : {
        firstname: '',
        lastname :'',
        email:'',
        age:''
      }
    })
  })
}

editUser( id, firstname, lastname, email, age ){
  this.setState({
    editUserData : { id, firstname, lastname, email, age }, editUserModal : ! this.state.editUserModal
  })
}

saveEditUser(){
  const { firstname, lastname, email, age } = this.state.editUserData;

  axios.put("http://localhost:3000/Users/" + this.state.editUserData.id, {
    firstname, lastname, email, age
  }).then(res => {
    this.fetchAllRecords();
  })
  this.setState({ editUserModal : false, editUserData : { firstname:'', lastname:'',email:'',age:''}})

}

deleteUser(id){

  axios.delete("http://localhost:3000/Users/" + id, {
  }).then(res => {
    this.fetchAllRecords();
  })

}
 
fetchAllRecords(){
  axios.get("http://localhost:3000/Users").then(res => {
    console.log("Find data from api" +res)
    this.setState({ datas : res.data })
  })
}
  render() {

    const Items = this.state.datas.map((data) => (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.firstname}</td>
          <td>{data.lastname}</td>
          <td>{data.email}</td>
          <td>{data.age}</td>
          <td>
          <Button color="success" size="sm" className="mr-2"
          onClick={ this.editUser.bind(this, data.id, data.firstname, data.lastname, data.email, data.age )} >Edit</Button>
          <Button color="danger" size="sm" onClick = {this.deleteUser.bind(this,data.id)}>Delete</Button>
          </td>
        </tr>
    ))

    return (
      <div className="App container">
        <h1>Crud Operation With Rest API..</h1>

        <Button color="primary" onClick={this.toggleAddUser}>Add New User</Button>
        <Modal isOpen={this.state.addUserModal} toggle={this.toggleAddUser}>
          <ModalHeader toggle={this.toggleAddUser}>Add User</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input id="firstname" 
              value={this.state.addUserData.firstname} 
              onChange={(e) => {
                const { addUserData } = this.state;

                addUserData.firstname = e.target.value;

                this.setState({ addUserData })
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input id="lastname"
              value={this.state.addUserData.lastname} 
              onChange={(e) => {
                const { addUserData } = this.state;
                addUserData.lastname = e.target.value;
                this.setState({ addUserData })
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="email" >Email</Label>
              <Input id="email" 
              value={this.state.addUserData.email} 
              onChange={(e) => {
                const { addUserData } = this.state;
                addUserData.email = e.target.value;
                this.setState({ addUserData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="age">Age</Label>
              <Input id="age" 
              value={this.state.addUserData.age} 
              onChange={(e) => {
                 const { addUserData } = this.state;
                 addUserData.age = e.target.value;
                 this.setState({ addUserData })
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggleAddUser}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUser}>
          <ModalHeader toggle={this.toggleEditUser}>Update User</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input id="firstname" 
              value={this.state.editUserData.firstname} 
              onChange={(e) => {
                const { editUserData } = this.state;

                editUserData.firstname = e.target.value;

                this.setState({ editUserData })
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input id="lastname"
              value={this.state.editUserData.lastname} 
              onChange={(e) => {
                const { editUserData } = this.state;
                editUserData.lastname = e.target.value;
                this.setState({ editUserData })
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="email" >Email</Label>
              <Input id="email" 
              value={this.state.editUserData.email} 
              onChange={(e) => {
                const { editUserData } = this.state;
                editUserData.email = e.target.value;
                this.setState({ editUserData })
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="age">Age</Label>
              <Input id="age" 
              value={this.state.editUserData.age} 
              onChange = {(e) => {
                 const { editUserData } = this.state;
                 editUserData.age = e.target.value;
                 this.setState({ editUserData })
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveEditUser.bind(this)}>Update Data</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditUser}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Items}
            </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
