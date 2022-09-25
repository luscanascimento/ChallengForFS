import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent, DatatableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    PaginationModule
  ],
  exports: [AlertModalComponent, ConfirmModalComponent, DatatableComponent],
})
export class SharedModule {}
