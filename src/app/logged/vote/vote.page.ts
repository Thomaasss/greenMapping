import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.page.html",
  styleUrls: ["./vote.page.scss"],
})
export class VotePage implements OnInit {
  pins;
  user;

  constructor(
    private api: ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem("id");
    this.fetchVotes();
  }

  fetchVotes() {
    this.api.getPins().then((pins) => {
      this.pins = pins;
    });
  }

  async presentAlert(title, user, comment) {
    const alert = await this.alertController.create({
      header: title + " par " + user,
      message: comment,
      buttons: ["Retour"],
    });

    await alert.present();
  }

  vote(id, $e) {
    $e.stopPropagation();
    this.api.vote(id).then((result) => {
      this.fetchVotes();
    });
  }
  
}
