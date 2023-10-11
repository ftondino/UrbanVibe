import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PostsComponent } from './components/posts/posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  exports: [MaterialModule, PostsComponent],
})
export class SharedModule {}
