import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TasksModule } from './tasks/tasks.module';
import { OrderModule } from 'ngx-order-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ChartComponent } from './home/chart/chart.component';
import { ChartColumnComponent } from './home/chart-column/chart-column.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './login/create-user/create-user.component';
import { AuthGuard } from './login/guard/auth-guard';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    ChartColumnComponent,
    LoginComponent,
    CreateUserComponent,
    RegisteredUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    TasksModule,
    OrderModule,
    SharedModule,
    PaginationModule.forRoot(),
    DragulaModule.forRoot(),
    ReactiveFormsModule,
    // AngularFirestoreModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
