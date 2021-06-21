//token expires within an hour after creating it
//always create a new user object when user logs in
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  //automatically checks the validity
  //access it like a property - special kind of property
  //code that runs, when you access the property
  get token() {
    //return null if token expired
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}
