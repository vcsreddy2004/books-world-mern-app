export interface UserView {
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    password:string,
    token:string,
    lastLogIn:Date | null,
    errorMessage:string
}