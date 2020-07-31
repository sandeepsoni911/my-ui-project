import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/userDetails.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile : UserDetails;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUserDetails()
    .subscribe((proflieData) => {
    
      this.userProfile = proflieData
     });
   
  }

}
