export default class Validations {
    static checkEmail(email) {
      // Improved regex pattern for email validation
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
  
    static minLength(value, minLength) {
      return value.length >= minLength;
    }
  }
  