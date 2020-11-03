import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  footerMessage: string;
  constructor() {
    this.footerMessage = "© Green Mapping 2021. Tous droits réservés.";
  }

  ngOnInit() { }

}