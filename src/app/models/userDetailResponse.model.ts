import { UserDetails } from "./userDetails.model";

export interface UserDetailResponse {

    message : string;
	status : string;
    userDetails : UserDetails;
	

}