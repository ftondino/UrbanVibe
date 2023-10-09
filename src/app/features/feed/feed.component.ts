import { Component, OnInit } from '@angular/core';
import { FeedService } from './services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(public feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getPosts();
  }

  toggleComments(postId: number): void {
    this.feedService.toggleComments(postId);
  }
}
