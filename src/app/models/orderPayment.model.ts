export interface OrderPayment {
    orderId? : number;
    partialPaymentAmount : number;
    balanceAmount? : number;
    orderPaymentId? : number;
	dueDate? : string;
	comment : string;
    createdOn? : Date;
    paymentType : string;

}