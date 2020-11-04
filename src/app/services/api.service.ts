import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiBaseUrl = 'http://localhost:4321/';
  token = 'Bearer ';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async presentToast(color, message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'customToast',
      color,
    });
    toast.present();
  }

  register(register): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    const postData = {
      fname: register.fName,
      lname: register.lName,
      username: register.username,
      password: register.password,
      email: register.email,
      phone: register.tel,
    };
    return new Promise((resolve) => {
      this.httpClient
        .post(this.apiBaseUrl + 'user/register', postData, options)
        .subscribe(
          (data) => {
            this.presentToast('success', 'Votre compte a bien été créé !');
            this.router.navigateByUrl('/login');
            resolve(data);
          },
          (err) => {
            this.presentToast('danger', String(err.error.message));
          }
        );
    });
  }

  login(login) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers }
    const postData = { username: login.username, password: login.password }
    return new Promise((resolve) => {
      this.httpClient.post(this.apiBaseUrl + 'user/login', postData, options).subscribe((data: any) => {
        this.token += data.token;
        localStorage.setItem('token', this.token);
        this.presentToast('success', 'Te voilà connecté !');
        this.router.navigateByUrl('/dashboard');
        resolve(data);
      }, err => {
        if (err.error.message != undefined && err.error.message != '' && err.error.message != null) {
          this.presentToast('danger', err.error.message);
        }
      });
    });
  }
}
