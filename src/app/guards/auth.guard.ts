import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap, take } from 'rxjs';

import { AuthenticationService } from '../services/authentication/authentication.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return authenticationService.getUserInstance().pipe(
    take(1),
    switchMap(userInstance => {
      const uidFromLocalStorage = localStorage.getItem('userId');
      const uidFromURLParam = route.params['id'];
      if (uidFromURLParam && uidFromURLParam !== userInstance?.id) {
        authenticationService.removeUserInstance();
        return router.navigate(['/login'], { replaceUrl: true });
      }

      if (!userInstance || userInstance?.id !== uidFromLocalStorage) {
        return router.navigate(['/login'], { replaceUrl: true });
      }
      return of(true);
    }),
    catchError(() => {
      return router.navigate(['/login'], { replaceUrl: true });
    })
  );
};
