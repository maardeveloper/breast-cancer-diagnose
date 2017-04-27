import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { CancerFormComponent } from './components/cancer-form/cancer-form.component';
import { ResultsComponent } from './components/results/results.component';

import { CancerResultService } from './services/cancer-result.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CancerFormComponent,
    ResultsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [CancerResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
