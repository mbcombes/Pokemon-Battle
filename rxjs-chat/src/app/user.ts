export class User {

    public id: Number;
    public username: String;
    public email: String;
    public password: String;
    public pokemon: Array<object>;

    constructor(
    ) { 
        this.username = ""
        this.email = ""
        this.password = ""
     }
}
