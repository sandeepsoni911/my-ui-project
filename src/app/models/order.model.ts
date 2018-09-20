export interface Order {  	  
    orderId : number;
	orderAmount: number;
	dueDate: Date;
	itemType: string;
	customerId: number;
	comments: string;
	status: string ;
	itemName : string;
	itemQuality : number;
	weight : number ;
	customerName : string;
	customerCity : string;
	createdDate : Date;
	khataNumber : number;
	exchangeItemName : string;
	exchangeItemQuality : number;
	exchangeWeight : number;
	receivedAmount : number;


}