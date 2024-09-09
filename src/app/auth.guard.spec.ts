import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service'; 
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['isAuthenticated']); 

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
      providers: [
        AuthGuard, 
        { provide: AuthService, useValue: authServiceMock }, 
        {
          provide: Router, 
          useClass: class {
            navigate = jasmine.createSpy('navigate'); 
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard); 
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>; 
    router = TestBed.inject(Router); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);  
    const result = guard.canActivate();
    expect(result).toBeFalse();  
    expect(router.navigate).toHaveBeenCalledWith(['/login']);  
  });

  it('should allow access if authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);  
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });
});