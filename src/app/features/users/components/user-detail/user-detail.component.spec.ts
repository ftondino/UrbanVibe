import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetailComponent } from './user-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDividerModule } from '@angular/material/divider';
import { PostsComponent } from 'src/app/shared/components/posts/posts.component';
import { ApiService } from 'src/app/core/services/api.service';
import { FeedService } from 'src/app/features/feed/services/feed.service';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(() => {
    const apiServiceMock = {
      getData: () => of({}),
    };

    TestBed.configureTestingModule({
      declarations: [UserDetailComponent, PostsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDividerModule],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
