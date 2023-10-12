import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts.component';
import { FeedService } from '../../../features/feed/services/feed.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let feedService: FeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientModule],
      providers: [FeedService],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    feedService = TestBed.inject(FeedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleComments on button click', () => {
    spyOn(feedService, 'toggleComments');

    const postId = 1;
    component.toggleComments(postId);

    expect(feedService.toggleComments).toHaveBeenCalledWith(postId);
  });
});
