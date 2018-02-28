export class LostPassword {
  constructor(
    public token: string,
    public newPassword: string,
    public repeatPassword: string
   ) { }
}
