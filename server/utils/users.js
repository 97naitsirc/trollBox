class Users {

    constructor(){

        this.users = [];

    }

    addUser(id, name, room){

        var user = {id,name,room};

        this.users.push(user);

        return user;
    }

    removeUser(id){

        var userFiltered = this.users.filter((user)=>user.id === id)[0];

        if(userFiltered){

            this.users = this.users.filter((user)=> user.id !== id);

        }
    
        return userFiltered;

    }

    getUser(id){

        var userFiltered = this.users.filter((user)=>user.id === id)[0];

        return userFiltered;

    }

    getUserList(room){

        var usersFiltered = this.users.filter((user)=>user.room === room);

        var namesArray = usersFiltered.map((user)=>user.name);

        return namesArray;

    }

   }

module.exports = {

    Users

};