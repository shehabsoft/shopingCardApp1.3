import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Title } from "@angular/platform-browser";
@Injectable({
  providedIn: "root"
})
export class TranslateService {
  data: any = {};
  style: string;
  constructor(private http: HttpClient, private titleService: Title) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      console.log("LANG" + lang);
      if (lang == 'ar') {
        this.style =  'rtl';
      } else {
        this.style = 'ltr';
      }
      const langPath = `assets/i18n/${lang || "en"}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          this.titleService.setTitle(this.data["TITLE"]);
          resolve(this.data);
        },
        error => {
          this.data = {};
          console.log("Error");
          resolve(this.data);
        }
      );
    });
  }
}
