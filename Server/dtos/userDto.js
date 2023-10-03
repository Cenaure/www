module.exports = class UserDto {
    firstName;
    secondName;
    email;
    id;
    role;
    isActivated;

    constructor(model) {
        this.firstName = model.firstName;
        this.secondName = model.secondName;
        this.email = model.email;
        this.role = model.role;
        this.id = model._idl;
        this.isActivated = model.isActivated;
    }
}