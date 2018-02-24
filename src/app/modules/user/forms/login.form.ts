export class Login {
  constructor(
    public username?: string,
    public password?: string,
    public persistentLogging: boolean = false
   ) { }
}
