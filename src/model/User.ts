export class User {
  constructor(public uid: string,
              public name: string,
              public email: string,
              public password: string,
              public photoURL?: string) {}

  static createBlank(): User {
    return new User('', '', '', '', '');
  }
}
