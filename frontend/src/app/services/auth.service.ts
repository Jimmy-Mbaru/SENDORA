import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('sendora_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('sendora_token');
  }

  logout() {
    localStorage.removeItem('sendora_token');
    this.router.navigate(['/auth/login']);
  }

  getRoleFromToken(): 'ADMIN' | 'USER' | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (err) {
      return null;
    }
  }

  getCurrentUser(): { userId: string; role: 'ADMIN' | 'USER'; email: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.sub,
        role: payload.role,
        email: payload.email,
      };
    } catch (err) {
      return null;
    }
  }

  getMyProfile() {
    return this.http.get(`${environment.apiUrl}/users/me`);
  }

  updateUserProfile(data: { name?: string; cellphone?: string; paypal?: string }) {
    return this.http.patch(`${environment.apiUrl}/users/me`, data);
  }


}
