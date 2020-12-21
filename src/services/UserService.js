import axios from 'axios'

const USER_BASE_API = "http://localhost:8080/api/v1/users"
const USER_CONTACT_API = "http://localhost:8080/api/v1/form/"

class UserService{

    getUser(){
        return axios.get(USER_BASE_API);
    }

    createUser(user){
         return axios.post(USER_BASE_API,user);
    }

    deleteUser(userName){
        return axios.delete(USER_BASE_API + "/" + userName)
    }

    createNewContact(user){
        return axios.post(USER_CONTACT_API,user);
   }
    getContactStructure(id){
        console.log(USER_CONTACT_API+id);
        return axios.get(USER_CONTACT_API+id);
    }

}

export default new UserService()