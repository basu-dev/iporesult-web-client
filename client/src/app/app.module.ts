import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {ResultComponent} from './pages/result/result.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalComponent} from './components/Modal/Modal.component';
import {UserFormComponent} from './components/user-form/user-form.component'
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ResultComponent,
        ModalComponent,
        UserFormComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        HttpClientModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
