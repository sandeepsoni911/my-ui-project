export interface LoanPayment {
    loanId? : string;
    partialPaymentAmount : number;
    balanceAmount? : number;
    loanPaymentId? : number;
	dueDate? : string;
	comment : string;
    createdOn? : Date;
    interestAmount? : number;
    paymentType : string;

}