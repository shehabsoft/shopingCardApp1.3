import { Component, OnInit } from "@angular/core";
import { TranslateService } from "src/app/shared/services/translate.service";

@Component({
  selector: "app-checkout-navbar",
  templateUrl: "./checkout-navbar.component.html",
  styleUrls: ["./checkout-navbar.component.scss"]
})
export class CheckoutNavbarComponent implements OnInit {
  constructor( public translate: TranslateService) {}

  ngOnInit() {}
}
