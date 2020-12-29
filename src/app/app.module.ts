import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/store.reducer';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/info-panel/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsComponent } from './components/info-panel/action-buttons/action-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ListAnnotationsComponent } from './components/info-panel/list-annotations/list-annotations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoPanelComponent,
    MapComponent,
    SearchComponent,
    ActionButtonsComponent,
    ListAnnotationsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: reducer }),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
