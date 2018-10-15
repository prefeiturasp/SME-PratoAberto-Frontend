import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WindowRef } from './WindowRef';

import { SchoolsService } from './schools.service';
import { Globals } from './app.globals';
import { AppUtils } from './app.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private doc: any;
  private geo: any;
  private map: any;
  public userLocation = {};
  public positions = [];
  private markers = [];
  public schools = [];
  private _schools = [];
  private latLngSchoolsCalc = {};

  constructor(
    private winRef: WindowRef,
    private _sanitizer: DomSanitizer,
    private schoolsService: SchoolsService,
    private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.geo = navigator.geolocation;
    this.doc = this.winRef.nativeWindow.document;
  }



  onMapReady(map) {
    // console.log('map', map);

    Globals.mapInstance = map;
    // Globals.mapInstance.setZoom(6);
    this.doc.getElementById('map-loader').style.display = 'block';
    this.geo.getCurrentPosition(
      pos => {
        this.onUserLocation(pos);
      },
      error => {
        this.onUserLocation({
          coords: {
            latitude: -23.549877,
            longitude: -46.633987
          }
        });
      }
    );
    google.maps.event.trigger(Globals.mapInstance, 'resize');
    // map.setCenter({lat: this.positions[0][0], lng: this.positions[0][1]});
    // console.log('markers', Globals.mapInstance.markers);
  }

  onLoadSchools() {
    const self = this;
    if (Globals.querySchool) {
      self.setMarkersBySchools();
      return false;
    }
    if (Globals.schools.length === 0) {
      this.schoolsService.get()
      .subscribe(schools => {
        Globals.schools = [];

        for (let i = 0; i < schools.length; i++) {
          schools[i].distance = parseFloat(AppUtils.getDistanceFromLatLonInKm(
            self.latLngSchoolsCalc['lat'],
            self.latLngSchoolsCalc['lon'],
            schools[i].lat,
            schools[i].lon
          ).toFixed(1));
        }
          Globals.schools = schools.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0);
          // console.log("Globals.schools", Globals.schools)
          setTimeout( () => { self.setMarkersBySchools(); }, 500);
        }
      );
    }
  }

  public setMarkersBySchools() {
    this._schools = Globals.schools.filter(school => school['distance'] < 2);
    // this._schools = Globals.schools;
    for (let i = 0; i < this._schools.length; i++) {
      if (this._schools[i]['lat'] && this._schools[i]['lon']) {
        this.positions.push({
          id: this._schools[i]['_id'],
          title: this._schools[i]['nome'],
          pos: {lat: this._schools[i]['lat'], lng: this._schools[i]['lon']},
          image: {
            url: '/assets/images/prato-aberto-icone-pin-escola.png',
            size: new google.maps.Size(16, 16),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 16)
          }
        });
      }
    }
    Globals.mapInstance.setCenter({lat: Globals.userLocation['lat'], lng: Globals.userLocation['lon']});
    // console.log("positions: ", this.positions)
  }

  onUserLocation(position) {
    Globals.userLocation = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    this.latLngSchoolsCalc = Globals.userLocation;
    if (Globals.schools.length === 0) {
      this.onLoadSchools();
    }
    this.positions.push({
      id: null,
      title: '',
      pos: {lat: position.coords.latitude, lng: position.coords.longitude},
      image: {
        url: '/assets/images/prato-aberto-icone-location.png',
        size: new google.maps.Size(16, 16),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 16)
      }
    });
    Globals.mapInstance.setCenter({lat: Globals.userLocation['lat'], lng: Globals.userLocation['lon']});
  }

  gotoSchool(marker) {
    if (marker) {
      Globals.mapInstance.setCenter({
        lat: marker.pos.lat,
        lng: marker.pos.lng
      });
      Globals.mapInstance.setZoom(14);
      const schoolId = AppUtils.getObjectById(Globals.schools, 'nome', marker.title)._id;
      this.router.navigate(['/escola', schoolId]);
    }
  }

  onMapClick(e) {
    // console.log("onMapClick", e)
  }

  onMarkerInit(marker) {
    this.markers.push(marker);
    if (this.markers.length === this.positions.length - 1) {
      this.doc.getElementById('map-loader').style.display = 'none';
      const markerCluster = new MarkerClusterer(Globals.mapInstance, this.markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        minimumClusterSize: 5
      });
    }
    if (this.markers.length === 150) {
      this.doc.getElementById('map-loader').style.display = 'none';
    }
  }

  onIdle(e) {
    // console.log("onIdle", e)
  }
}
