import {
  Component,
  OnInit,
  VERSION
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceLocal } from "../../shared/services/auth.service.local";
import { ProductService } from "../../shared/services/product.service";
import { TranslateService } from "../../shared/services/translate.service";
import { ThemeService } from "src/app/shared/services/theme.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  angularVersion = VERSION;

  constructor(
    public authService: AuthServiceLocal,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService,
    private themeService: ThemeService
  ) {
    // console.log(translate.data);
  }

  ngOnInit() {
    this.setLang('ar');

  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => { });
  }

  updateTheme(theme: string) {
    console.log(theme);
    this.themeService.updateThemeUrl(theme);
  }
}
