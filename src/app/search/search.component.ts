import { SlicePipe } from '@angular/common';
import { Component, ViewChild, OnInit, AfterViewInit, HostListener, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowRef } from '../WindowRef';
import { SchoolsService } from './../schools.service';
import { AppComponent } from './../app.component';
import { Globals } from '../app.globals';
import { AppUtils } from '../app.utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  private doc : any;
  private geo : any;
  private map : any;
  private sub : any;
  private nearSchoolsCarousel:any;
  public schoolSelected;
  public errorMsg = "Carregando..."
  private searchInput : any;
  public userLocation = {};
  private positions = [];
  public schools = Globals.schools;
  public schoolsFromCarousel:Array<object> = [];
  public originSearch = Globals.originSearch;
  public searchDeskValue = "";
  public schoolsLoaded:Boolean = false;
  public focusTriggeringEventEmitter = new EventEmitter<boolean>();

  constructor(
    private winRef: WindowRef,
    public appComp: AppComponent,
    public schoolsService: SchoolsService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.geo = navigator.geolocation;
    this.doc = this.winRef.nativeWindow.document;
    this.sub = this.route.params.subscribe(params => {
      this.searchInput = params['search_input'];
      this.doc.getElementById("searchInputMob").value
      this.doc.getElementById("searchInputMob").value = this.searchInput;
    });
    this.doc.getElementById("map-container").className = "map-container search-page";
    this.doc.getElementById("map-loader").className = "loader__overlay search-page";
  }

  ngAfterViewInit(){
    if (Globals.schools.length == 0){
      this.onLoadSchools();
    } else {
      this.schoolsLoaded = true;
      this.errorMsg = "Nenhuma escola encontrada.";
      this.schoolsFromCarousel = Globals.schools.filter(school => {
        return school['distance'] < 2;
      });
    }
    if (Globals.mapInstance){
      if (!Globals.userLocation){
        Globals.mapInstance.setCenter({
          lat: -23.549877,
          lng: -46.633987
        });
      } else {
        Globals.mapInstance.setCenter({
          lat: Globals.userLocation["lat"],
          lng: Globals.userLocation["lon"]
        });
      }
      Globals.mapInstance.setZoom(14);
      google.maps.event.trigger(Globals.mapInstance, 'resize');
    }
    if (this.originSearch == "input"){
      this.focusTriggeringEventEmitter.emit(true);
    } else {
      this.winRef.nativeWindow.$(window).resize(()=> {
          if (this.winRef.nativeWindow.$(".search-carousel").length > 0){
            this.nearSchoolsCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            this.winRef.nativeWindow.$('.owl-carousel-top').find('.owl-stage-outer').children().unwrap();

            this.buildCarousel();
          }
      });
      setTimeout(()=>{ this.buildCarousel(); }, 0);
    }
  }
  buildCarousel(){
    this.nearSchoolsCarousel = this.winRef.nativeWindow.$(".search-carousel").owlCarousel({
      items: 1,
      dots: false,
      nav:false,
      navigation: false,
      center: true,
      margin: 10,
      stagePadding:30
    });
  }
  onLoadSchools(){
    let self = this;
    if (Globals.querySchool) {
      self.schools = Globals.schools;
      return false;
    }
    this.schoolsService.get()
      .subscribe(function(res){
        let schools = res;
        Globals.schools = [];
        for (let i in schools){
          schools[i].distance = parseFloat(AppUtils.getDistanceFromLatLonInKm(
            -23.549877,
            -46.633987,
            schools[i].lat,
            schools[i].lon
          ).toFixed(1));
        }
        Globals.schools = schools.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0);
        // console.log(Globals.schools)
        self.schools = Globals.schools;
        // self.schools = Globals.schools.filter(school => {
        //   return school['distance'] < Globals.maxKmRange;
        // });
        self.schoolsFromCarousel = Globals.schools.filter(school => {
          return school['distance'] < 2;
        });
        // console.log("self.schoolsFromCarousel", self.schoolsFromCarousel)
        self.schoolsLoaded = true;
        self.appComp.setMarkersBySchools();
        self.errorMsg = "Nenhuma escola encontrada.";
      }
    );
  }

  onSelectSchool(school) {
    Globals.mapInstance.setCenter({
      lat: school.LATITUDE,
      lng: school.LONGITUDE
    });
    // lng: school.LONGITUDE - 0.015
    Globals.mapInstance.setZoom(16);
    this.router.navigate(['../escola', school._id]);
  }

  searchBoxClear(e) {
    this.doc.getElementById("searchInputMob").value = "";
    this.doc.getElementById("searchInputDesk").value = "";
    this.searchDeskValue = "";
  }

  autocompleListFormatter(data: any) {
    function camelize(str) {
      let _str = str.toLowerCase().replace(/\s(.)/g, function($1) { return $1.toUpperCase(); });
      return _str.substring(0, 1).toUpperCase() + _str.substring(1, _str.length);
    }

    let address = camelize(`${data.endereco} - ${data.bairro}`);
    let html = `
        <div class="distance">
          <img src="assets/images/prato-aberto-icone-pin-escola.png" alt="" class="icon">
          <span class="km">${data.distance} km</span>
        </div>
        <div class="infos">
          <h3 class="name">${data.nome}</h3>
          <small class="address">${address}</small>
          </div>`;
    return html;
  }

  searchUpdate($event){
    // console.log("searchUpdate", $event)
    if ($event && $event._id){
      this.router.navigate(['../escola', $event._id]);
    }

  }

  public camelize(str) {
    let _str = str.toLowerCase().replace(/\s(.)/g, function($1) { return $1.toUpperCase(); });
    return _str.substring(0, 1).toUpperCase() + _str.substring(1, _str.length);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
