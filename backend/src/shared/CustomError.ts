export class CustomError {
  public readonly message;
  public readonly errors;

  constructor(message: string, errors?: string[]) {
    this.message = message;
    this.errors = errors;
  }
}
