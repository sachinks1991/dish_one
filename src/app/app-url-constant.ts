import { Injectable } from "@angular/core";

//Base class which contains a baseURL
@Injectable()
export class CONSTANTS {
    protected BASE_URL: string;

    constructor(){
        this.BASE_URL = 'http://teatalk.one/DishOne/';
    }
}

//Injectable derived class of CONSTANTS which holds URLS for App
@Injectable()
export class AppUrl extends CONSTANTS {
    
    //URL for AGENT
    private _AGENT_DETAILS: string;
    private _AGENT_DETAILS_BY_ID: string;
    private _AGENT_DELETE_BY_ID: string;
    private _AGENT_UPDATE_BY_ID: string;
    private _AGENT_REGISTER: string;

    //URL for AGENT EXPENSE
    private _AGENT_EXPENSE_DETAILS: string;
    private _AGENT_EXPENSE_DETAILS_BY_ID: string;
    private _AGENT_EXPENSE_DELETE_BY_ID: string;
    private _AGENT_EXPENSE_UPDATE_BY_ID: string;
    private _AGENT_EXPENSE_REGISTER: string;

    //URL for AREA
    private _AREA_DETAILS: string;
    private _AREA_DETAILS_BY_ID: string;
    private _AREA_DELETE_BY_ID: string;
    private _AREA_UPDATE_BY_ID: string;
    private _AREA_REGISTER: string;

    //URL for PAYMENT
    private _PAYMENT_DETAILS: string;
    private _PAYMENT_DETAILS_BY_ID: string;
    private _PAYMENT_DELETE_BY_ID: string;
    private _PAYMENT_UPDATE_BY_ID: string;
    private _PAYMENT_REGISTER: string;

    //URL for CUSTOMER
    private _CUSTOMER_DETAILS: string;
    private _CUSTOMER_DETAILS_BY_ID: string;
    private _CUSTOMER_DELETE_BY_ID: string;
    private _CUSTOMER_UPDATE_BY_ID: string;
    private _CUSTOMER_REGISTER: string;
    
    //getters for agent
    get agentDetails(): string {   
        return this._AGENT_DETAILS;
    }

    get agentDetailsById(): string {   
        return this._AGENT_DETAILS_BY_ID;
    }

    get agentDeleteById(): string {   
        return this._AGENT_DELETE_BY_ID;
    }

    get agentUpdateById(): string {   
        return this._AGENT_UPDATE_BY_ID;
    }

    get agentRegister(): string {   
        return this._AGENT_REGISTER;
    }

    //getters for agent expense
    get agentExpenseDetails(): string {   
        return this._AGENT_EXPENSE_DETAILS;
    }

    get agentExpenseDetailsById(): string {   
        return this._AGENT_EXPENSE_DETAILS_BY_ID;
    }

    get agentExpenseDeleteById(): string {   
        return this._AGENT_EXPENSE_DELETE_BY_ID;
    }

    get agentExpenseUpdateById(): string {   
        return this._AGENT_EXPENSE_UPDATE_BY_ID;
    }

    get agentExpenseRegister(): string {   
        return this._AGENT_EXPENSE_REGISTER;
    }

    //getters for payment
    get paymentDetails(): string {   
        return this._PAYMENT_DETAILS;
    }

    get paymentDetailsById(): string {   
        return this._PAYMENT_DETAILS_BY_ID;
    }

    get paymentDeleteById(): string {   
        return this._PAYMENT_DELETE_BY_ID;
    }

    get paymentUpdateById(): string {   
        return this._PAYMENT_UPDATE_BY_ID;
    }

    get paymentRegister(): string {   
        return this._PAYMENT_REGISTER;
    }


    //getters for area
    get areaDetails(): string {   
        return this._AREA_DETAILS;
    }

    get areaDetailsById(): string {   
        return this._AREA_DETAILS_BY_ID;
    }

    get areaDeleteById(): string {   
        return this._AREA_DELETE_BY_ID;
    }

    get areaUpdateById(): string {   
        return this._AREA_UPDATE_BY_ID;
    }

    get areaRegister(): string {   
        return this._AREA_REGISTER;
    }

    //getters for customer
    get customerDetails(): string {   
        return this._CUSTOMER_DETAILS;
    }

    get customerDetailsById(): string {   
        return this._CUSTOMER_DETAILS_BY_ID;
    }

    get customerDeleteById(): string {   
        return this._CUSTOMER_DELETE_BY_ID;
    }

    get customerUpdateById(): string {   
        return this._CUSTOMER_UPDATE_BY_ID;
    }

    get customerRegister(): string {   
        return this._CUSTOMER_REGISTER;
    }
    

     //url for Login
     private _DISH_ONE_CUSTOMER_DETAILS: string;
     get dishOneCustomerDetails(): string {   
        return this._DISH_ONE_CUSTOMER_DETAILS;
    }

    constructor() {
        super();
        //forlogin
        this._DISH_ONE_CUSTOMER_DETAILS = this.BASE_URL + 'dishonecustomer/get_all_dishone_customers.php';

        //URL for AGENT
        this._AGENT_DETAILS = this.BASE_URL + 'agent/get_all_agents.php';
        this._AGENT_DETAILS_BY_ID = this.BASE_URL + 'agent/get_agent_with_id.php';
        this._AGENT_DELETE_BY_ID = this.BASE_URL + 'agent/delete_agent_with_id.php';
        this._AGENT_UPDATE_BY_ID = this.BASE_URL + 'agent/update_agent_with_id.php';
        this._AGENT_REGISTER = this.BASE_URL + 'agent/register_agent.php';

        //URL for AGENT EXPENSE
        this._AGENT_EXPENSE_DETAILS = this.BASE_URL + 'agentexpense/get_all_agentexpense.php';
        this._AGENT_EXPENSE_DETAILS_BY_ID = this.BASE_URL + 'agentexpense/get_agentexpense_with_id.php';
        this._AGENT_EXPENSE_DELETE_BY_ID = this.BASE_URL + 'agentexpense/delete_agentexpense_with_id.php';
        this._AGENT_EXPENSE_UPDATE_BY_ID = this.BASE_URL + 'agentexpense/update_agentexpense_with_id.php';
        this._AGENT_EXPENSE_REGISTER = this.BASE_URL + 'agentexpense/register_agentexpense.php';

        //URL for CUSTOMER
        this._CUSTOMER_DETAILS = this.BASE_URL + 'customer/get_all_customers.php';
        this._CUSTOMER_DETAILS_BY_ID = this.BASE_URL + 'customer/get_customer_with_id.php';
        this._CUSTOMER_DELETE_BY_ID = this.BASE_URL + 'customer/delete_customer_with_id.php';
        this._CUSTOMER_UPDATE_BY_ID = this.BASE_URL + 'customer/update_customer_with_id.php';
        this._CUSTOMER_REGISTER = this.BASE_URL + 'customer/register_customer.php';

        //URL for AREA
        this._AREA_DETAILS = this.BASE_URL + 'areamodel/get_all_area.php';
        this._AREA_DETAILS_BY_ID = this.BASE_URL + 'areamodel/get_area_with_id.php';
        this._AREA_DELETE_BY_ID = this.BASE_URL + 'areamodel/delete_area_with_id.php';
        this._AREA_UPDATE_BY_ID = this.BASE_URL + 'areamodel/update_area_with_id.php';
        this._AREA_REGISTER = this.BASE_URL + 'areamodel/register_area.php';

        //URL for PAYMENT
        this._PAYMENT_DETAILS = this.BASE_URL + 'dishonecustomerpayment/get_all_dishone_customer_payments.php';
        this._PAYMENT_DETAILS_BY_ID = this.BASE_URL + 'dishonecustomerpayment/get_dishone_customer_payment_with_id.php';
        this._PAYMENT_DELETE_BY_ID = this.BASE_URL + 'dishonecustomerpayment/delete_dishone_customer_payment_with_id.php';
        this._PAYMENT_UPDATE_BY_ID = this.BASE_URL + 'dishonecustomerpayment/update_dishone_customer_payment_with_id.php';
        this._PAYMENT_REGISTER = this.BASE_URL + 'dishonecustomerpayment/register_dishone_customer_payment.php';
    }
}


