import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FeedComponent } from './feed.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostsComponent } from 'src/app/shared/components/posts/posts.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/core/services/api.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(() => {
    const apiServiceMock = {
      getData: () => of({}),
    };

    TestBed.configureTestingModule({
      declarations: [FeedComponent, NewPostComponent, PostsComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    });
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
