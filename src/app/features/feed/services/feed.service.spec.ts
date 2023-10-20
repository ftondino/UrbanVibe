import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from 'src/app/core/services/api.service';
import { FeedService } from './feed.service';
import { UsersService } from '../../users/services/users.service';
import { Post, Comment } from 'src/app/Models/post.model';

describe('FeedService', () => {
  let service: FeedService;
  let httpTestingController: HttpTestingController;
  let usersService: UsersService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService, UsersService, ApiService],
    });
    service = TestBed.inject(FeedService);
    service.token = 'mockToken';
    httpTestingController = TestBed.inject(HttpTestingController);
    usersService = TestBed.inject(UsersService);
    usersService.token = 'mockToken';
    apiService = TestBed.inject(ApiService);
    apiService.token = 'mockToken';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts', () => {
    const mockPosts: Post[] = [
      { id: 1, user_id: 1, title: 'new title', body: 'new body' },
      { id: 1, user_id: 1, title: 'new title', body: 'new body' },
    ];

    service.getPosts();

    const req = httpTestingController.expectOne(
      'https://gorest.co.in/public/v2/posts'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockPosts);

    expect(service.posts).toEqual(mockPosts);
    expect(service.filteredPosts).toEqual(mockPosts);
  });

  it('should toggle comments for a post', fakeAsync(() => {
    const mockComments: Comment[] = [
      { post_id: 1, id: 1, name: 'name', email: 'email', body: 'body' },
      { post_id: 2, id: 2, name: 'name 2', email: 'email 2', body: 'body 2' },
    ];

    const postId = 1;

    service.posts = [{ id: 1, user_id: 1, title: 'title', body: 'body' }];

    spyOn(apiService, 'getData').and.callThrough();

    service.toggleComments(postId);

    tick();

    const req = httpTestingController.expectOne(
      `https://gorest.co.in/public/v2/posts/${postId}/comments`
    );

    expect(req.request.method).toEqual('GET');

    req.flush({ data: mockComments });
  }));

  it('should publish a new post', () => {
    const newPostData = { user_id: 1, title: 'new title', body: 'new body' };

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
