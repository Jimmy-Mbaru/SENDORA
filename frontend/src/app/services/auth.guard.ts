import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Optionally check role
  const expectedRole = route.data['role'] as 'ADMIN' | 'USER' | undefined;
  const userRole = authService.getRoleFromToken();

  if (expectedRole && expectedRole !== userRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
