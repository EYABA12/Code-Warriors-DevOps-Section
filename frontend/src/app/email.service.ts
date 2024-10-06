import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) { }

  subscribeEmail(userId: number, emailSubscription: string): Observable<any> {
    const updateData = { emailSubscription: emailSubscription }; // Créez un objet contenant les données de mise à jour
    return this.http.patch<any>(`api/users/email/${userId}`, updateData);
  }

  sendNewsletter(formData: FormData): Observable<any> {
    return this.http.post(`api/mail/send`, formData, {responseType: 'text'});
  }
}
