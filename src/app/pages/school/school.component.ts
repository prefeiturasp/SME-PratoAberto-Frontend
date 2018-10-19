import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../../app.globals';
import { WindowRef } from '../../services/WindowRef';
import { SchoolsService } from '../../services/schools.service';
import { CalendaryService } from '../../services/calendary.service';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  private doc: any;
  public selectedDate;
  public weekCalendary = [];
  public currentSchool;
  public currentCard;
  public isCard: Boolean = false;
  public schools = Globals.schools;
  public errorMessage = 'Carregando';
  public weekday = [
    'dom',
    'seg',
    'ter',
    'qua',
    'qui',
    'sex',
    'sab'
  ];
  public datePickerOptions = {
      todayBtnTxt: 'Today',
      dateFormat: 'yyyy-mm-dd',
      firstDayOfWeek: 'su',
      sunHighlight: false,
      background: '#3BAFDA',
      showTextBox: false,
      showCurDay: false
  };
  private newSelectedDate;
  public carouselOptions;
  public detailsList = [];
  public rangeStr = '';

  constructor(
    private winRef: WindowRef,
    private route: ActivatedRoute,
    private schoolsService: SchoolsService,
    private calendaryService: CalendaryService) { }



  ngOnInit() {
    this.doc = this.winRef.nativeWindow.document;
    this.doc.getElementById('map-container').className = 'map-container school-page';
    this.doc.getElementById('map-loader').className = 'loader__overlay school-page';
    this.setToday();
    this.route.params.subscribe(params => {
      this.getCurrentSchool(params['id']);
    });

    const self = this;
    this.schoolsService.getDetails().subscribe(function(res){
      self.detailsList = res;
    });
  }

  getCurrentSchool(_id) {
    const self = this;
    this.schoolsService.getById(_id)
      .subscribe(function(res){
        self.currentSchool = res;
        const today = new Date();
        const todayStr = self.generateDate(
          today.getFullYear(),
          (today.getMonth() + 1),
          today.getDate()
        );

        const splitToday = todayStr.split('-');
        const findStr = splitToday[2] + '-' + splitToday[0] + '-' + splitToday[1];

        self.getCalendary(
          todayStr,
          self.currentSchool.tipo_unidade,
          self.currentSchool.tipo_atendimento,
          self.currentSchool.agrupamento
        );

        // console.log("curretnSchool", self.currentSchool)
        self.isCard = false;

        if (Globals.mapInstance) {
          if (self.currentSchool.lat && self.currentSchool.lon) {
            Globals.mapInstance.setCenter({
              lat: self.currentSchool.lat,
              lng: self.currentSchool.lon
            });
          }
          Globals.mapInstance.setZoom(18);
          google.maps.event.trigger(Globals.mapInstance, 'resize');
        }
      }
    );
  }

  generateDate(y, m, d) {
    let todayStr = y.toString();
    let month = m.toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    todayStr += month;
    let day = d.toString();
    if (day.length < 2) {
      day = '0' + day;
    }
    todayStr += day;

    return todayStr;
  }

  getCalendary(date, unit, attendance, grouping) {
    const self = this;
    this.calendaryService.get(date, unit, attendance, grouping)
      .subscribe(function(res){
        if (res.length === 0) {
          self.isCard = false;
          self.errorMessage = 'Nenhum cardápio encontrado para a data selecionada.';
          return;
        }
        self.currentSchool.cards = {};
        for (let i = 0; i < res.length; i++) {
          const obj = res[i].cardapio;
          if (self.currentSchool.idades.indexOf(res[i].idade) > -1) {
            if (!self.currentSchool.cards[res[i].idade]) {
              self.currentSchool.cards[res[i].idade] = {
                name: res[i].idade,
                menu: [],
                exibitionOrder: self.currentSchool.idades.indexOf(res[i].idade)
              };
            }
            Object.keys(obj).forEach((key) => {
              const eats = [];
              for (let j = 0; j < obj[key].length; j++) {
                eats.push(obj[key][j]);
              }
              if (self.currentSchool.refeicoes.indexOf(key) > -1) {
                self.currentSchool.cards[res[i].idade].menu.push({
                  name: key,
                  content: eats,
                  icon: key.replace(/ /g, '').toLowerCase(),
                  exibitionOrder: self.currentSchool.refeicoes.indexOf(key)
                });
              }
            });
          }

          if (res.length > 0) {
            self.isCard = true;
            self.errorMessage = 'Carregando.';
          } else {
            self.isCard = false;
            self.errorMessage = 'Nenhum cardápio encontrado para a data selecionada.';
          }
          // console.log("calendaryService: ", self.currentSchool);
        }
      }
    );
  }

  onDateChanged(event) {
      if (this.newSelectedDate === event.formatted.replace(/-/g, '')) {
        return;
      }
      this.newSelectedDate = event.formatted.replace(/-/g, '');
      // console.log('onDateChanged(): ', event);
      // this.setCard(this.newSelectedDate);
      if (this.currentSchool) {
        this.getCalendary(
          this.generateDate(
            event.date.year,
            event.date.month,
            event.date.day,
          ),
          this.currentSchool.tipo_unidade,
          this.currentSchool.tipo_atendimento,
          this.currentSchool.agrupamento
        );
      }
  }

  setToday() {
    const today = new Date();
    let todayStr = today.getFullYear() + '-';
    todayStr += today.getMonth().toString().length < 2 ? '0' + (today.getMonth() + 1) + '-' : (today.getMonth() + 1) + '-';
    todayStr += today.getDate().toString().length < 2 ? '0' + today.getDate() : today.getDate();
    this.selectedDate = todayStr;
  }

  onOpenModalEducassis() {
    this.doc.getElementById('overlayEducassis').style.display = 'block';
  }

  onCloseModalEducassis() {
    this.doc.getElementById('overlayEducassis').style.display = 'none';
  }

  onOpenModalDetails() {
    this.doc.getElementById('overlayDetails').style.display = 'block';
  }

  onCloseModalDetails() {
    this.doc.getElementById('overlayDetails').style.display = 'none';
  }

  shareFb() {
    // window.open('https://www.facebook.com/sharer/sharer.php?u=https://pratoaberto.tk',
    // 'fbShareWindow', 'height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://pratoaberto.tk
    &picture=https://pratoaberto.tk/assets/images/Post_Facebook_1200x600.jpg
    &title=Prato Aberto - COMIDA BOA NÃO TEM SEGREDO
    &description=Um jeito fácil e transparente para todo mundo se nutrir de informação sobre o que é servido na Rede Municipal de Ensino.`,
    'fbShareWindow',
    'height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  }

  onItemSelect(carouselItem: any): void {
    // console.log("onItemSelect", carouselItem)
  }

  onSelected(e) {
    // console.log("onSelected", e)
  }

  getObjectById(data, key, id) {
    // console.log("getDimensionsByFind", data, id)
    return data.find(x => x[key] === id);
  }
  onClose(e) {
    // console.log("onClose", e)
  }

  onClickShare() {
    if (this.doc.getElementById('share-container').className === 'container-share mob') {
      this.doc.getElementById('share-button').className = 'button-share opened';
      this.doc.getElementById('share-container').className = 'container-share opened';
    } else {
      this.doc.getElementById('share-button').className = 'button-share';
      this.doc.getElementById('share-container').className = 'container-share mob';
    }
  }

  onExpandCard(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    if (this.winRef.nativeWindow.$(target).parent().hasClass('selected')) {
      this.winRef.nativeWindow.$('.age-item').removeClass('selected');
      return;
    }
    this.winRef.nativeWindow.$('.age-item').removeClass('selected');
    this.winRef.nativeWindow.$(target).parent().addClass('selected');
  }

  dateModelChange(e) {
    // console.log("dateModelChange", e)

  }

  onPrintPage() {
    const currWeekByDate = this.getWeekByDate(
      new Date(
        Globals.calendaryDate['year'],
        Globals.calendaryDate['month'] - 1,
        Globals.calendaryDate['day']
      )
    );

    const _weekDays = [
      '',
      `${Globals.weekDayLabels[0]}, ${this.preZero(currWeekByDate[0].getDate())}/${this.preZero(currWeekByDate[0].getMonth() + 1)}`,
      `${Globals.weekDayLabels[1]}, ${this.preZero(currWeekByDate[1].getDate())}/${this.preZero(currWeekByDate[1].getMonth() + 1)}`,
      `${Globals.weekDayLabels[2]}, ${this.preZero(currWeekByDate[2].getDate())}/${this.preZero(currWeekByDate[2].getMonth() + 1)}`,
      `${Globals.weekDayLabels[3]}, ${this.preZero(currWeekByDate[3].getDate())}/${this.preZero(currWeekByDate[3].getMonth() + 1)}`,
      `${Globals.weekDayLabels[4]}, ${this.preZero(currWeekByDate[4].getDate())}/${this.preZero(currWeekByDate[4].getMonth() + 1)}`
    ];

    const startStr = '' +
                    currWeekByDate[0].getFullYear() +
                    this.preZero(currWeekByDate[0].getMonth() + 1) +
                    this.preZero(currWeekByDate[0].getDate());

    const endStr = '' +
                  currWeekByDate[4].getFullYear() +
                  this.preZero(currWeekByDate[4].getMonth() + 1) +
                  this.preZero(currWeekByDate[4].getDate());

    this.rangeStr = `
      ${this.preZero(currWeekByDate[0].getDate())} -
      ${this.preZero(currWeekByDate[4].getDate())} de
      ${Globals.monthLabels[currWeekByDate[4].getMonth() + 1]} de
      ${currWeekByDate[4].getFullYear()}
    `;

    this.calendaryService.getByRange(
      this.currentSchool.tipo_unidade,
      this.currentSchool.tipo_atendimento,
      this.currentSchool.agrupamento,
      startStr,
      endStr
    ).subscribe(res => {
      this.weekCalendary = [];
      const calendaryAgeGroups = this.winRef.nativeWindow._.groupBy(res, (item) => {
        return item.idade;
      });

      const ageMenu = {};

      Object.keys(calendaryAgeGroups).map(ageKey => {
        if (!ageMenu[ageKey]) {
          ageMenu[ageKey] = {};
          ageMenu[ageKey].name = ageKey;
        }
        for (let i = 0; i < currWeekByDate.length; i++) {
          const currDate = '' +
                        currWeekByDate[i].getFullYear() +
                        this.preZero(currWeekByDate[i].getMonth() + 1) +
                        this.preZero(currWeekByDate[i].getDate());

          const currEats = this.winRef.nativeWindow._.findWhere(calendaryAgeGroups[ageKey], {data: currDate});

          if (currEats) {
            // console.log("currEats", currEats)
            Object.keys(currEats['cardapio']).map(menuKey => {
              if (!ageMenu[ageKey][menuKey]) {
                ageMenu[ageKey][menuKey] = {};
              }
              ageMenu[ageKey][menuKey] = {
                name: currEats.idade,
                date: currDate,
                weekDays: _weekDays,
                items: {
                  eats: [[menuKey]]
                }
              };
              // console.log("ageMenu[ageKey][menuKey]", ageMenu[ageKey][menuKey])
              for (let j = 0; j < 5; j++) {
                const _currDate = '' +
                                currWeekByDate[j].getFullYear() +
                                this.preZero(currWeekByDate[j].getMonth() + 1) +
                                this.preZero(currWeekByDate[j].getDate());

                const _currEats = this.winRef.nativeWindow._.findWhere(calendaryAgeGroups[ageKey], {data: _currDate});
                let tempArr = [];
                if (_currEats) {
                  tempArr = _currEats['cardapio'][menuKey];
                }
                ageMenu[ageKey][menuKey]['items']['eats'].push(tempArr);
              }
            });
          }
        }
        const tempObj = {
          name: '',
          weekDays: _weekDays,
          items: []
        };
        Object.keys(ageMenu[ageKey]).map(key => {
          if (ageMenu[ageKey][key].items) {
            const tempArr = [];
            for (let eat = 0; eat < ageMenu[ageKey][key].items.eats.length; eat++) {
              tempArr.push(ageMenu[ageKey][key].items.eats[eat]);
            }
            tempObj['name'] = ageMenu[ageKey][key].name;
            tempObj['items'].push(tempArr);
          }
        });
        this.weekCalendary.push(tempObj);
      });

      let printContents;

      setTimeout(() => {
        printContents = this.winRef.nativeWindow.$('#printPage').clone();
        printContents.css({
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'block',
          overflow: 'visible'
        });
        this.winRef.nativeWindow.$('body').prepend(printContents);
        setTimeout(() => {
          window.print();
          setTimeout(() => {
            window.close();
            printContents.remove();
          }, 1000);
        }, 1000);
      }, 250);
    });

  }

  getWeekByDate(currDate) {
    const week: Date[] = new Array();

    currDate.setDate((currDate.getDate() - currDate.getDay() + 1));
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(currDate)
        );
        currDate.setDate(currDate.getDate() + 1);
    }
    return week;
  }

  preZero(val) {
    return val < 10 ? '0' + val : val;
  }

  public getStyleContent(idx) {
    if (idx % 2 === 0) {
      return '#fafafa';
    }
  }

  public getStyleTitle(idx) {
    if (idx === 1 || idx === 3 || idx === 5) {
      return '#fafafa';
    }
  }
}
