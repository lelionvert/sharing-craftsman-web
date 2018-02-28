export class Profile {
  constructor(
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public website?: string,
    public github?: string,
    public linkedin?: string,
    public picture?: string
   ) { }

   toJSON() {
     return {
       firstname: this.firstname,
       lastname: this.lastname,
       email: this.email,
       website: this.website,
       github: this.github,
       linkedin: this.linkedin,
       picture: this.picture
     }
   }
}
