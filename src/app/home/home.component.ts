import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { WindowRef } from '../WindowRef';
import { Globals } from '../app.globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchInputModel;
  public merendometers:Array<object> = [
    { image: "/assets/images/prato-aberto-home-merendometro-1.png" },
    { image: "/assets/images/prato-aberto-home-merendometro-2.png" },
    { image: "/assets/images/prato-aberto-home-merendometro-3.png" }
  ];
  private doc:any;
  constructor(private winRef: WindowRef, private router : Router) { }

  ngOnInit() {
    this.doc = this.winRef.nativeWindow.document;
    this.doc.getElementById("map-container").className = "map-container";
    this.doc.getElementById("map-loader").className = "loader__overlay";
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(e) {
    if (e.key == "Enter" && e.type == "keyup") {
      // console.log(this.searchInputModel)
      this.router.navigate(['/busca', this.searchInputModel]);
    }
  }

  gotoRoute(value, origin){
    console.log("gotoRoute: ", value, origin);
    Globals.originSearch = origin;
    this.router.navigate([value]);
  }

  onScrollto(){
    let _top = this.winRef.nativeWindow.$(".home__merendometer").offset().top;
    this.winRef.nativeWindow.$("html, body").animate({
      scrollTop:_top
    }, 600);
  }
}
