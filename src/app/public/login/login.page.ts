import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

let baseURL = "https://kickserver.xyz";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

  rowUsername : string;
  rowEmail : string;
  rowIsArtist : boolean;
  rowIsBeatmaker : boolean;
  rowBio : string;
  rowRegistrationDate : string;
  rowRegistrationDateTime : string;
  rowId : string;
  following : any;
  followers : any;
  pseudo : string;
  // PAGE MAKER

  pageTitle : string;

  slogan : string;

  resetPassMsg : string;
  resetPassLink : string;

  // Inputs

  usernameInput : string;
  passwordInput : string;
  loginBtn : string;

  // Input patterns

  usernamePattern = "[A-Za-z0-9_-]{5,20}";
  passwordPattern = "^([a-zA-Z0-9@*#.!]{7,40})$";

  // Input Messages

  usernameMsg : string;
  emailMsg : string;
  passwordMsg : string;

  // ON FOCUS

  usernameOnFocus : boolean;
  passwordOnFocus : boolean;

  // Loading

  onLoading : boolean;

  wrongLogin : boolean;
  wrongLoginMsg : string;

  constructor(private router : Router, private api: ApiService) {
    this.pageTitle="Connexion";

    this.slogan = "The future is yours";

    this.usernameInput="Nom d'utilisateur";
    this.passwordInput="Mot de passe";
    this.loginBtn="Connexion";
    this.resetPassLink = "Mot de passe oublié ?"

    this.passwordMsg = "7 à 40 caractères";
    this.usernameMsg = "5 à 20 caractères";

    
    this.wrongLogin = false;
    this.onLoading = false;
    this.wrongLoginMsg = "Identifiants incorrects";
  }


  loginForm : any = {}; //nécessaire pour utiliser nGmodel dans la page html A REMETTRE 
  wrongLogs = false;

  usernameInpFoc() {
    this.usernameOnFocus = true;
    this.wrongLogin = false;
  }
  usernameInpBlur() {
    this.usernameOnFocus = false;
  }
  passwordInpFoc() {
    this.passwordOnFocus = true;
    this.wrongLogin = false;
  }
  passwordInpBlur() {
    this.passwordOnFocus = false;
  }



  //------------------------------------------------------------------Login function--------------------------------------------------------
  login() {

    this.onLoading = true;

    this.api.login(this.loginForm).then(result => {
      this.onLoading = false;
    });

  }

  ngOnInit() {
  }

}
