import { Injectable } from '@angular/core';
import { Post, Comment } from 'src/app/Models/post.model';
import { ApiService } from 'src/app/core/services/api.service';
import { UsersService } from '../../users/services/users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  showComments: { [key: number]: boolean } = {};
  isLoading: { [key: number]: boolean } = {};
  post: string = '';
  token = this.usersService.token;
  user = this.usersService.user;
  apiUrl = 'https://gorest.co.in/public/v2/users';

  constructor(
    private apiService: ApiService,
    private usersService: UsersService,
    private http: HttpClient
  ) {}

  // PER RECUPERARE I POST
  getPosts(userId?: number): void {
    let endpoint = 'posts';
    if (userId) {
      endpoint = `users/${userId}/posts`;
    }
    this.apiService.getData<Post>(endpoint).subscribe((_posts) => {
      this.posts = _posts;
      this.filteredPosts = _posts;
      this.posts.forEach((post) => {
        this.showComments[post.id] = false;
        this.isLoading[post.id] = false;
      });
    });
  }

  // PER RECUPERARE I COMMENTI
  toggleComments(postId: number): void {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      if (!post.comments) {
        this.isLoading[postId] = true;
        this.apiService
          .getData<Comment>(`posts/${postId}/comments`)
          .subscribe((comments) => {
            post.comments = comments;
            this.isLoading[postId] = false;
            this.showComments[postId] = !this.showComments[postId];
          });
      } else {
        this.showComments[postId] = !this.showComments[postId];
      }
    }
  }

  // PER CERCARE I POST
  searchPosts(): void {
    if (this.post) {
      this.filteredPosts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.post.toLowerCase()) ||
          post.body.toLowerCase().includes(this.post.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  // PUBBLICARE POST

  newPost(post: any) {
    if (!this.token) {
      throw new Error('Token non disponibile');
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.http.post(`${this.apiUrl}/${this.user.id}/posts`, post, {
      headers,
    });
  }
}
