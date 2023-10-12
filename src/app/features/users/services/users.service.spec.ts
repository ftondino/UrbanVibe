import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/Models/user.model';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set users', () => {
    const users: User[] = [
      {
        id: 1,
        name: 'example',
        gender: 'male',
        status: 'active',
        email: 'example@info',
      },
    ];
    service.setUsers(users);
    service.users$.subscribe((data) => {
      expect(data).toEqual(users);
    });
  });

  it('should set user and token', () => {
    const user = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    };
    const token = '12345';
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    service.setUser();

    expect(service.user).toEqual(user);
    expect(service.token).toEqual(token);
  });

  it('should create a new user', () => {
    const user: User = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    };
    const token = '12345';

    spyOn(service, 'newUser').and.returnValue(of(user));

    service.newUser(user, token).subscribe((response) => {
      expect(response).toEqual(user);
    });
  });

  it('should delete a user', () => {
    const user: User = {
      id: 1,
      name: 'example',
      gender: 'male',
      status: 'active',
      email: 'example@info',
    };

    spyOn(service, 'deleteUser').and.returnValue(of(null));

    service.deleteUser(user).subscribe((response) => {
      expect(response).toBeNull();
    });
  });
});
