export class AgentExpenseModel{
    constructor(
        public id : number,
        public dishoneId : number,
        public agentId : number,
        public amount: number,
        public description : string,
        public dateVal: string
    ){}
}
