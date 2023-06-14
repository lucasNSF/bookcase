import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

export const authGuard: CanActivateFn = async () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const currentUser = authenticationService.getCurrentAuthUser();
  const userIdFromLocalStorage = localStorage.getItem('userId');

  if (!currentUser || currentUser.uid !== userIdFromLocalStorage) {
    authenticationService.removeUserInstance();
    router.navigate(['/login'], { replaceUrl: true });
  }

  return true;
};
