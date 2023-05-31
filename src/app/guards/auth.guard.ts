import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

export const authGuard: CanActivateFn = async () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const userInstance = await authenticationService.getUserInstance();

  if (!userInstance) {
    router.navigate(['/', 'login']);
  }

  return true;
};
