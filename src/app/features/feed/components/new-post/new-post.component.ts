import { Component } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  onSubmit() {
    this.feedService.newPost(this.postForm.value).subscribe(() => {
      this.feedService.getPosts();
      this.snackBar.open('Post pubblicato', 'Ok', { duration: 3000 });
    });
  }
}
