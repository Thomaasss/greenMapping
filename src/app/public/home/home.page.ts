import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({ 
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slogan : string;
  loginBtn : string;
  signUpMsg : string;
  signUpLink : string;

  snapUserId : string;
  snapUserAvatarId : string;
  snapUserAvatarUrl : string;
  snapUserPseudo:string;

  goSnap : string;
  
  constructor(private router : Router,
              private route : ActivatedRoute ){
    this.slogan = "The future is yours";
    this.loginBtn = "Connexion";
    this.signUpMsg = "Tu n'as pas encore de compte ?";
    this.signUpLink = "Inscription";
  }

  ngOnInit() {
  }

}