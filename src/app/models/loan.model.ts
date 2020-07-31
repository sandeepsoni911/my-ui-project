import { Items } from "./items.model";

export interface Loan {


	loanId : string;
	loanAmount : number;
	dueDate : string;
	itemType : string;
	customerId : string;
	rateOfInterest : string;
	comments : string;
	status : boolean;
	itemName : string;
	itemQuality: string;
	weight : number;
	customerName : string;
	createdDate : Date;
	khataNumber : string;
	customerCity: string;
	itemsList:Items[];
	customerAddress:string;
	customerFatherName:string;

    
}