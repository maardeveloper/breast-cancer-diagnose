import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { CancerFormComponent } from './components/cancer-form/cancer-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResultsComponent } from './components/results/results.component';
import { CompareResultComponent } from './components/compare-result/compare-result.component';

import { CancerResultService } from './services/cancer-result.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CancerFormComponent,
    ResultsComponent,
    NavbarComponent,
    CompareResultComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
  ],
  providers: [CancerResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
