import { Component, OnInit, OnDestroy } from "@angular/core";
import { TopToolbarComponent } from "./../../components/top-toolbar/top-toolbar.component";
import {
  PopoverController,
  ModalController,
  AlertController,
} from "@ionic/angular";

import { environment } from "../../../environments/environment";
import * as mapboxgl from "mapbox-gl";
import "../../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  map: mapboxgl.Map;
  style = "mapbox://styles/gperdigal/ckh1ykln916ew1apnxih3omld";
  lng;
  lat;
  data: any;
  customData: any;
  geolocate: any;
  wantsToMark: boolean;
  placeName: string;
  constructor(
    private geolocation2: Geolocation,
    private router: Router,
    private popover: PopoverController,
    public modalController: ModalController,
    public alertController: AlertController,
    private api: ApiService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.ionicGeolocation();
  }

  async presentAlert(lngLat) {
    const alert = await this.alertController.create({
      header: "Ajouter ici ?",
      message:
        "Ajouter une nouvelle proposition d'amélioration dans votre commune",
      inputs: [
        {
          name: "title",
          type: "text",
          id: "title",
          placeholder: "Libellé du projet",
        },
        {
          name: "description",
          type: "textarea",
          id: "description",
          placeholder: "Description du projet",
        },
      ],
      buttons: [
        {
          text: "Ajouter",
          handler: (data) => {
            if (data.description && data.title) {
              this.api.setMarker(data.title, data.description, lngLat);
              new mapboxgl.Marker().setLngLat(lngLat).addTo(this.map);
            }
            this.ionicGeolocation(lngLat.lat, lngLat.lng);
          },
        },
        {
          text: "Retour",
          handler: (data) => {
            this.ionicGeolocation();
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewDidEnter() {}

  ionViewDidLeave() {
    this.map.remove();
  }

  async presentPopover(ev: any) {
    const popover = await this.popover.create({
      component: TopToolbarComponent,
      cssClass: "popoverClass",
      event: ev,
    });
    return await popover.present();
  }

  ionicGeolocation(lat?, lng?) {
    this.geolocation2
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.api.updateLoc(resp.coords.latitude, resp.coords.longitude);
        this.buildMap(lat ? lat : null, lng ? lng : null);
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/");
  }

  buildMap(lat?, lng?) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      center: [lng ? lng : this.lng, lat ? lat : this.lat],
      zoom: lng ? 20 : 15,
    });
    this.api.getPins().then((pins: any) => {
      pins.forEach((pin) => {
        new mapboxgl.Marker()
          .setLngLat([pin.location.coordinates[0], pin.location.coordinates[1]])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                "<h3 style='color: black'>" +
                  pin.title +
                  "</h3><p style='color: black'>" +
                  pin.comment +
                  "</p><i style='color: black'>soumis par "+pin.user.username+"</i>"
              )
          )
          .addTo(this.map);
      });
    });
    this.map.addControl(
      (this.geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }))
    );

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on("load", (event) => {
      class MyCustomControl {
        container: any;
        map: any;
        onAdd(map) {
          this.map = map;
          this.container = document.createElement("ion-button");
          this.container.className = "my-custom-control";
          this.container.innerHTML =
            '<ion-icon name="pin"></ion-icon>&nbsp;Ajouter un projet';
          this.container.setAttribute("color", "success");
          this.container.setAttribute(
            "style",
            "position:fixed; bottom:10px; right:0; left: 0; padding: 0 20px;"
          );
          this.container.setAttribute("size", "small");
          this.container.setAttribute("id", "myCustomId");
          return this.container;
        }
        onRemove() {
          this.container.parentNode.removeChild(this.container);
          this.map = undefined;
        }
      }

      const myCustomControl = new MyCustomControl();

      this.map.addControl(myCustomControl);
      document.getElementById("myCustomId").addEventListener("click", () => {
        this.markFunction();
        this.map.removeControl(myCustomControl);
      });
    });
  }

  markFunction() {
    this.wantsToMark = true;
    this.map.once("click", (event) => {
      this.presentAlert(event.lngLat);
    });
  }
}
