export class AgentModel{
    constructor(
        public id : number,
        public dishoneId : number,
        public firstName : string,
        public lastName: string,
        public phoneNumber: string,
        public email: string,
        public address: string,
        public pincode: string,
        public photo: string,
        public isActivated: number,
        public password: string,
        public location: string,
        public dateVal: string
    ){}
}
