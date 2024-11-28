import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  // let auth = inject(AuthService);
  // return auth.$isLoggedIn();
  return true;
};
