import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap, take } from 'rxjs';

import { AuthenticationService } from '../services/authentication/authentication.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return authenticationService.getCurrentUser().pipe(
    take(1),
    switchMap(userInstance => {
      if (!userInstance) {
        return router.navigate(['/login'], { replaceUrl: true });
      }

      const uidFromURLParam = route.params['id'];
      if (uidFromURLParam !== userInstance.uid) {
        return router.navigate(['/login'], { replaceUrl: true });
      }

      return of(true);
    }),
    catchError(() => {
      return router.navigate(['/login'], { replaceUrl: true });
    })
  );
};
