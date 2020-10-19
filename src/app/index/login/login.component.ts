import { ToastrService } from "./../../shared/services/toastr.service";
import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthServiceLocal } from "../../shared/services/auth.service.local";
import { User } from "../../shared/models/user";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { TranslateService } from "src/app/shared/services/translate.service";
 
declare var $: any;

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	providers: [EmailValidator]
})
export class LoginComponent implements OnInit {
	user = {
		emailId: "",
		loginPassword: ""
	};
  user1: User = new User;
	errorInUserCreate = false;
	errorMessage: any;
	createUser;

	constructor(
      private authService: AuthServiceLocal,
		private userService: UserService,
		private toastService: ToastrService,
      private router: Router, 
      private route: ActivatedRoute, private socialAuthService: AuthService, public translate: TranslateService
    ) {
      console.log("User Componenets ");
		this.createUser = new User();
	}

  ngOnInit() { }

  public facebookLogin() {
    let socialPlatformProvider: string = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log("User Email " + userData.email + "USer Name" + userData.name);
        this.authService.getAccountByEmail(userData.email).subscribe((res) => {
          this.toastService.success("Authentication Success", "Logging in please wait");

          const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

          setTimeout((router: Router) => {
            this.router.navigate([returnUrl || "/"]);
          }, 1500);

          this.router.navigate(["/"]);
        }, (err) => {
          this.toastService.error("Authentication Failed", "Invalid Credentials, Please Check your credentials");
        })

        //this will return user data from facebook. What you need is a user token which you will send it to the server
        this.sendToRestApiMethod(userData.token);
      }
    );
  }
  sendToRestApiMethod(token: string): void {
    console.log("login");
}
	addUser(userForm: NgForm) {
		userForm.value["isAdmin"] = false;
      this.authService
        .createUserWithEmailAndPassword(userForm.value["emailId"], userForm.value["password"], userForm.value["name"], userForm.value["mobileNumber"], userForm.value["address"])
        .subscribe((res) => {


          //	this.userService.createUser(user);

          this.toastService.success("Registering", "User Registeration");

          setTimeout((router: Router) => {
            $("#createUserForm").modal("hide");
            this.router.navigate(["/"]);
          }, 1500);
        },
          err => {
            this.errorInUserCreate = true;
            this.errorMessage = err;
            this.toastService.error("Error while Creating User", err);
          });
			 
  }

  forgetPassword(userForm: NgForm) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById("sentMailButton").setAttribute('disabled', 'true');
 
    this.authService
      .forgetPassword(userForm.value["emailId"])
      .subscribe((res) => {


        //	this.userService.createUser(user);

        this.toastService.success("Forget Password", "Password Sent Succuessfully to Your Mail");
        document.getElementById('loading').style.display = 'none';
       
        document.getElementById("sentMailButton").removeAttribute('disabled');
        this.createUser.emailId = '';
         
      },
        err => {
          this.errorInUserCreate = true;
          this.errorMessage = err;
          this.toastService.error("Error Sending Mail", err);
        });

  }

  signInWithEmail(userForm: NgForm) {
    console.log("Being SSSS Login ");
    this.user1.email = userForm.value["emailId"];
    this.user1.password = userForm.value["loginPassword"];
    console.log("calling backend");
    this.authService
      .signIn(this.user1)
      .subscribe((res) => {
        this.toastService.success("Authentication Success", "Logging in please wait");

        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "/"]);
        }, 1500);

        this.router.navigate(["/"]);
      }, (err) => {
        this.toastService.error("Authentication Failed", "Invalid Credentials, Please Check your credentials");
      })
     
	}

	signInWithGoogle() {
		this.authService
			.signInWithGoogle()
			.then((res) => {
				if (res.additionalUserInfo.isNewUser) {
					this.userService.createUser(res.additionalUserInfo.profile);
				}
				const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
				location.reload();
				this.router.navigate(["/"]);
			})
			.catch((err) => {
				this.toastService.error("Error Occured", "Please try again later");
			});
  }
  download() {
    //console.log('download file');
   // this.fileService.downloadFile().subscribe(response => {
      //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      //const url= window.URL.createObjectURL(blob);
      //window.open(url);
    //  window.location.href = response.url;
      //fileSaver.saveAs(blob, 'employees.json');
   // }), error => console.log('Error downloading the file'),
    //  () => console.info('File downloaded successfully');
  }
}
