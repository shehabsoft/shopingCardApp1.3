import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  loggedUser: User;
  private sub: any;
  id: string;
  // Enable Update Button

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.loggedUser = new User();
   
  }
  ngOnInit() {
    this.loggedUser = this.authService.getLoggedInUser();
    this.id = "";
    //this.sub = this.route.params.subscribe((params) => {
    //  this.id = params.id  ;  
    // console.log("get produt Details with ID " + params.id);
     
 
  // });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];
      });

    //this.authService.getSellerAccountById(this.id+'').subscribe(response => {
    //  this.loggedUser = response;

   // });
  }
 
      
}
