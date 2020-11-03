import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  
  // PATTERN INPUT
  register : any = {}; //nécessaire pour utiliser nGmodel dans la page html
  emailPattern = "[A-Za-z0-9._+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"; // maybe delete % from email patter to a void SQL injections
  usernamePattern = "[A-Za-z0-9_-]{5,20}";
  passwordPattern = "^([a-zA-Z0-9@*#.!]{7,40})$";
  telPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  fNamePattern = "[a-zA-Z ]*";
  lNamePattern = "[a-zA-Z ]*";
  passwordConfirmPattern = "^([a-zA-Z0-9@*#.!]{7,40})$";

  // PAGE MAKER

  pageTitle : string;

  slogan : string;

  // INPUTS

  usernameInput : string;
  emailInput : string;
  emailConfirmInput : string;
  passwordInput : string;
  passwordConfirmInput : string;
  fNameInput : string;
  lNameInput : string;
  telInput : string;
  loginBtn : string;
  userPseudo : string

  passwordMatches : boolean;

  // Input Messages

  usernameMsg : string;
  emailMsg : string;
  passwordMsg : string;

  // ON FOCUS

  usernameOnFocus : boolean;
  emailOnFocus : boolean;
  passwordOnFocus : boolean;

  // ABOVE SUMBIT

  signupMsg : string;
  signupLink : string;

  // FORM VERIFICATION

  wrongMail : boolean;
  wrongMail1 : boolean;
  wrongUsername : boolean;
  logError : boolean;
  wrongMailMsg : string;
  wrongUsernameMsg : string;
  logErrorMsg : string;

  // FORM STEP


  onLoading:boolean;

  constructor(private router : Router,
              private alertController : AlertController,
              private route : ActivatedRoute,
              public toastController : ToastController,
              private api: ApiService) {
    this.pageTitle="Inscription";

    this.slogan = "Plus qu'une petite étape...";

    this.usernameInput="Nom d'utilisateur"
    this.emailInput="Email";
    this.emailConfirmInput="Confirmer";
    this.passwordInput="Mot de passe";
    this.passwordConfirmInput="Confirmer";
    this.fNameInput="Prénom";
    this.lNameInput="Nom";
    this.telInput="Tél."

    this.passwordMsg = "7 à 40 caractères. Caractères spéciaux acceptés";
    this.emailMsg = "example@email.com";
    this.usernameMsg = "5 à 20 caractères. Chiffres et underscore acceptés.";

    this.loginBtn="Inscription";

    this.signupMsg = "En cliquant sur inscription, je reconnait avoir lu et approuvé les";
    this.signupLink = "Conditions Générales d'Utilisation";

    this.wrongMail = false;
    this.wrongMail1 = false;
    this.wrongUsername = false;
    this.logError = false;
    this.wrongMailMsg = "Email déjà enregistré";
    this.wrongUsernameMsg = "Nom d'utilisateur déjà enregistré";
    this.logErrorMsg = "Erreur lors de l'inscription";


    this.onLoading = false;

  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
  }

  changeStep() {
    this.userPseudo = this.register.pseudo;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inscription completée ! Connecte-toi à présent.',
      duration: 2500
    });
    toast.present();
  }

  presentAlert(header,subHeader,message,) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.subHeader = subHeader;
    alert.message = message;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  }

  registerForm() {
    this.api.register(this.register);
  }

  wrongEmailRemove() {
    this.wrongMail1 = false;
  }

  usernameInpFoc() {
    this.usernameOnFocus = true;

    this.wrongMail = false;
    this.wrongUsername = false;
    this.logError = false;
  }
  usernameInpBlur() {
    this.usernameOnFocus = false;
  }
  emailInpFoc() {
    this.emailOnFocus = true;

    this.wrongMail = false;
    this.wrongUsername = false;
    this.logError = false;
  }
  emailInpBlur() {
    this.emailOnFocus = false;
  }
  passwordInpFoc() {
    this.passwordOnFocus = true;

    this.wrongMail = false;
    this.wrongUsername = false;
    this.logError = false;
  }
  passwordInpBlur() {
    this.passwordOnFocus = false;
  }
  passwordConfChange () {
    if (this.register.password === this.register.passwordConfirm) {
      this.passwordMatches = true;
    } else {
      this.passwordMatches = false;
    }
  }

}
