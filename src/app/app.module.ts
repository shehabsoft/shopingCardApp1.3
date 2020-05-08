import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { TranslateService } from './shared/services/translate.service';
import { ProductModule } from './layouts/product/product.module';
import { OrderModule } from './layouts/order/order.module';
import { UserModule } from './layouts/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';
import { FacebookLoginProvider } from 'angular5-social-login';
import { getAuthServiceConfigs } from './socialloginConfig';
/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [ AppComponent ],
	imports: [
      BrowserModule,
      OrderModule,
		BrowserAnimationsModule,
		IndexModule,
		ProductModule,
		UserModule,
		SharedModule,
      SocialLoginModule,
		RouterModule.forRoot(AppRoutes),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		TranslateService,
		{
			provide: APP_INITIALIZER,
          useFactory: setupTranslateFactory,

			deps: [ TranslateService ],
			multi: true
      },
      {
        provide: AuthServiceConfig, useFactory: getAuthServiceConfigs
      }
	],
	bootstrap: [ AppComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
