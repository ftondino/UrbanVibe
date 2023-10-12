import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FeedService } from './feed.service';

describe('FeedService', () => {
  let service: FeedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService],
    });
    service = TestBed.inject(FeedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts', () => {
    const mockPosts = [
      { user_id: 1, id: 1, title: 'title', body: 'body' },
      { user_id: 2, id: 2, title: 'title 2', body: 'body 2' },
    ];

    service.getPosts();

    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/posts'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockPosts);

    expect(service.posts).toEqual(mockPosts);
  });

  it('should toggle comments for a post', () => {
    const postId = 1;
    const mockComments = [
      { post_id: 1, id: 1, name: 'name', email: 'email', body: 'body' },
      { post_id: 2, id: 2, name: 'name 2', email: 'email 2', body: 'body 2' },
    ];

    service.posts = [
      { user_id: 1, id: 1, title: 'title', body: 'body' },
      { user_id: 2, id: 2, title: 'title 2', body: 'body 2' },
    ];

    service.toggleComments(postId);

    const req = httpTestingController.expectOne(
      `https://gorest.co.in/public/v2/posts/${postId}/comments`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockComments);

    expect(service.posts[0].comments).toEqual(mockComments);
    expect(service.showComments[postId]).toBe(true);
  });

  it('should search posts', () => {
    const searchTerm = 'title 2';

    service.post = searchTerm;
    service.posts = [
      { user_id: 1, id: 1, title: 'title', body: 'body' },
      { user_id: 2, id: 2, title: 'title 2', body: 'body 2' },
    ];

    service.searchPosts();

    expect(service.filteredPosts.length).toBe(1);
    expect(service.filteredPosts[0].title).toBe('title 2');

    service.post = 'non esistente';

    service.searchPosts();

    expect(service.noPosts).toBe(true);
  });

  it('should publish a new post', () => {
    const newPostData = { user_id: 1, title: 'new title', body: 'new body' };
    service.token = 'your-token';

    service.newPost(newPostData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `https://gorest.co.in/public/v2/users/${service.user.id}/posts`
    );
    expect(req.request.method).toEqual('POST');
    req.flush({});
  });
});
