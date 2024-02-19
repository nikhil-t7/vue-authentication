import Validations from './validations';

export default class SignUpValidation {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }
  checkValidations() {
    let error = [];
    if (!Validations.checkEmail(this.email)) {
      error['email'] = 'Invalid Email';
    }
    if (!Validations.minLength(this.password, 6)) {
      error['password'] = 'Password must be more that 6 characters.';
    }
    return error;
  }
  static getErrorMessageFromCode(errorCode) {
    switch (errorCode) {
      case 'EMAIL_EXISTS':
        return 'Email Already Exists.';
      case 'EMAIL_NOT_FOUND':
        return 'Email not found.';
      case 'INVALID_PASSWORD':
        return 'Invalid Password.';
      default:
        return 'Unexpected Error';
    }
  }
}
