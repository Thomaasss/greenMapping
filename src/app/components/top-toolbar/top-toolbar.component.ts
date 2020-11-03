import { Component, OnInit, OnDestroy,Injectable } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})

export class TopToolbarComponent implements OnInit, OnDestroy {

  menuTitle : string;
  footerMessage : string;

  logoutTitle: string;
  logoutIcon: string;
  logoutColor: string;

  themingTitle : string;
  themingIcon : string;
  themingColor : string;

  // A COMPLETER
  themeChoosen : string;

  // BUG MULTIPLE INSTANCES
  menuDisplayed : any;
  menuToDisplay : boolean;

  constructor(public actionSheetController: ActionSheetController,
              private popover:PopoverController
  ) {
    this.menuTitle = "Réglages";
    this.footerMessage = "&copy; Kick 2019. Tous droits réservés.";

    this.logoutTitle = "Déconnexion";
    this.logoutIcon = "log-out";
    this.logoutColor = "danger";

    this.themingTitle = "Thème";
    this.themingIcon = "color-palette";
    this.themingColor = "light";

    this.themeChoosen = "light"
  }

  ClosePopover() {
    this.popover.dismiss();
  }

  pages = [
    {
      title:"Carte Kick",
      url:"/map",
      icon:"globe",
      color:"light"
    },
    {
      title:"A propos",
      url:"/about",
      icon:"information-circle-outline",
      color:"light"
    }
  ];

  //////////////// LIFE CYCLE ////////////////
  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  ngOnDestroy() {
  }

  async UITheming() {
    const actionSheet = await this.actionSheetController.create({
      header: "Thèmes",
      buttons: [{
        text: 'Clair',
        icon: 'sunny',
        handler: () => {
          this.chooseTheme("light");
          this.ClosePopover();
        }
      }, {
        text: 'Sombre',
        icon: 'moon',
        handler: () => {
          this.chooseTheme("dark");
          this.ClosePopover();
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  chooseTheme(themeChoosen) {
    this.themeChoosen = themeChoosen;
    return themeChoosen;
  }

  // async presentModalAccount() {
  //   const modal = await this.modalController.create({
  //     component: AccountPage
  //   });
  //   return await modal.present();
  // }
}
