import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa.component';

import localePt from '@angular/common/locales/pt';


registerLocaleData(localePt, 'pt-BR')

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    PessoasPesquisaComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    CoreModule

  ],
  exports: [
    NavbarComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//export class CoreModule { }
