export class UserAlreadyExistsError extends Error {
  __proto__ = Error;

  constructor() {
    super('E-mail já cadastrado!');
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}
