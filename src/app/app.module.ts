import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './routes';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';

import { HomeModule } from './modules/home/index.module';
import { UserModule } from './modules/user/index.module';

import { LogoutService } from './services/user/logout.service';
import { HeaderService } from './services/browser/header.service';
import { CookieService } from './services/browser/cookie.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    HomeModule,
    UserModule
  ],
  providers: [ LogoutService, HeaderService, CookieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
