import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, MaterialModule],
  exports: [MaterialModule],
})
export class SharedModule {}
