import { Component } from '@angular/core';
import { FeedService } from '../../../features/feed/services/feed.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  constructor(public feedService: FeedService) {}
  toggleComments(postId: number): void {
    this.feedService.toggleComments(postId);
  }
}
