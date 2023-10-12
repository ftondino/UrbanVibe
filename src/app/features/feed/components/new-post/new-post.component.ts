import { Component } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private feedService: FeedService,
    private snackBar: MatSnackBar
  ) {
    this.postForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  onSubmit(panel: MatExpansionPanel) {
    this.feedService.newPost(this.postForm.value).subscribe(() => {
      this.feedService.getPosts();
      this.snackBar.open('Post pubblicato', 'Ok', { duration: 3000 });
      this.postForm.reset();
      Object.keys(this.postForm.controls).forEach((key) => {
        this.postForm.controls[key].setErrors(null);
      });
      panel.close();
    });
  }
}
