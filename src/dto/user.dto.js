class UserDto {
    constructor(user){
        this.email = user.email;
        this.role = user.role;
        this.frist_name = user.frist_name;
        this.last_name = user.last_name;
        this.age = user.age;
    }
}

export default UserDto;