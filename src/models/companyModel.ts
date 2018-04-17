export class CompanyModel {
    constructor(
        public id: number,
        public companyName: string,
        public name: string,
        public email: string,
        public phoneNumber: string,
        public address1: string,
        public address2: string,
        public city: string,
        public state: string,
        public pincode: string,
        public logo: string,
        public dateVal: string
    ){}
}
