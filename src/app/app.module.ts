import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/store.reducer';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AnnotationsComponent } from './components/annotations/annotations.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffects } from './store/store.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoPanelComponent,
    MapComponent,
    SearchComponent,
    AnnotationsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ annotations: reducer }),
    EffectsModule.forRoot([StoreEffects]),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
