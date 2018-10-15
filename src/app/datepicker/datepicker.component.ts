import { Globals } from './../app.globals';
import { AppUtils } from './../app.utils';
import { WindowRef } from './../WindowRef';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, ElementRef, AfterViewInit } from '@angular/core';
import {MyDate, MyMonth} from './datepicker.component.interface';

@Component({
    selector: 'responsive-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() options:any;
    @Input() selDate:string;
    @Output() dateChanged:EventEmitter<Object> = new EventEmitter();

    showTextBox: boolean= true;
    showCurDay: boolean= true;
    showSelector:boolean = false;
    visibleMonth:MyMonth = {monthTxt: '', monthNbr: 0, year: 0};
    selectedDate:MyDate = {year: 0, month: 0, day: 0};
    selectedInputDate;
    weekDays:Array<string> = [];
    dates:Array<Object> = [];
    sliderDates:Array<Object> = [];
    selectionDayTxt:string = '';
    weekdayStr:any;
    dayIdx:number = 0;
    olderCount:number = 0;
    today:Date = null;
    currentInputDateMonth;
    inputSelectedDate;

    PREV_MONTH:number = 1;
    CURR_MONTH:number = 2;
    NEXT_MONTH:number = 3;

    // Default options
    dayLabels = {su: 'Domingo', mo: 'Segunda-feira', tu: 'Terça-feira', we: 'Quarta-feira', th: 'Quinta-feira', fr: 'Sexta-feira', sa: 'Sábado'};
    monthLabels = { 1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 5: 'Maio', 6: 'Junho', 7: 'Julho', 8: 'Agosto', 9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro' };
    dateFormat:string = 'yyyy-mm-dd'
    todayBtnTxt:string = 'Hoje';
    firstDayOfWeek:string = 'mo';
    sunHighlight:boolean = true;
    height:string = 'auto';
    width:string = '100%';
    background = "red";
    border;
    daysCarousel;
    timelineCarousel;

    constructor(public elem: ElementRef, private winRef: WindowRef) {
        this.today = new Date();
        Globals.calendaryDate = {
          day: this.today.getDate(),
          month: this.today.getMonth() + 1,
          year: this.today.getFullYear()
        }
        Globals.monthLabels = this.monthLabels;
    }

    ngOnInit() {
      this.dayLabels = this.options.dayLabels !== undefined ? this.options.dayLabels : this.dayLabels;
      this.monthLabels = this.options.monthLabels !== undefined ? this.options.monthLabels : this.monthLabels;
      this.dateFormat = this.options.dateFormat !== undefined ? this.options.dateFormat : this.dateFormat;
      this.todayBtnTxt = this.options.todayBtnTxt !== undefined ? this.options.todayBtnTxt : this.todayBtnTxt;
      this.firstDayOfWeek = this.options.firstDayOfWeek !== undefined ? this.options.firstDayOfWeek : this.firstDayOfWeek;
      this.sunHighlight = this.options.sunHighlight !== undefined ? this.options.sunHighlight : this.sunHighlight;
      this.height = this.options.height !== undefined ? this.options.height : this.height;
      this.width = this.options.width !== undefined ? this.options.width : this.width;

      // Custom Editing Pardeep
      this.background = this.options.background !== undefined ? this.options.background : this.background;
      this.showTextBox = this.options.showTextBox !== undefined ? this.options.showTextBox : this.showTextBox;
      this.showCurDay = this.options.showCurDay !== undefined ? this.options.showCurDay : this.showCurDay;

      let days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
      this.dayIdx = days.indexOf(this.firstDayOfWeek);
      if (this.dayIdx !== -1) {
          let idx = this.dayIdx;
          for (var i = 0; i < days.length; i++) {
              this.weekDays.push(this.dayLabels[days[idx]]);
              idx = days[idx] === 'sa' ? 0 : idx + 1;
          }
      }

      if(this.showTextBox== false){
          this.openBtnClicked();
          this.border= 'none';
          let doc = document.getElementsByTagName('html')[0];
          doc.addEventListener('click', (event) => {
              if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                  this.showSelector = true;
              }
          }, true);
      }
      else if(this.showTextBox== true){
          let doc = document.getElementsByTagName('html')[0];
          doc.addEventListener('click', (event) => {
              if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                  this.showSelector = false;
              }
          }, false);
      }
      // Custom Editing Pardeep
    }

    ngAfterViewInit(){
      this.createCarousel();

      // this.daysCarousel.on('changed.owl.carousel', this.onSliderDaysChanged);

    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
      this.selectionDayTxt = changes['selDate'].currentValue;
      if(this.selectionDayTxt !== '') {
        let arrDate = this.selectionDayTxt.split("-");
        this.selectedDate = {
          day: parseInt(arrDate[2]),
          month: parseInt(arrDate[1]),
          year: parseInt(arrDate[0])
        };
      }
    }

    createCarousel(){
      this.timelineCarousel = this.winRef.nativeWindow.$(".timeline-carousel").owlCarousel({
        center: true,
        items: 4,
        dots: false,
        nav:false,
        navigation: false
      });
      this.daysCarousel = this.winRef.nativeWindow.$(".slider-days").owlCarousel({
        center: true,
        items: 3,
        dots: false
      });
      const self = this;
      let _currDay = AppUtils.getObjectById(this.sliderDates, "day", this.selectedDate.day);
      this.currentInputDateMonth = this.selectedDate.month;
      this.inputSelectedDate = this.selectedDate.day+"/"+this.selectedDate.month+"/"+this.selectedDate.year;
      if (_currDay.day === this.selectedDate.day && _currDay.month === this.selectedDate.month && _currDay.year === this.selectedDate.year) {
        if (this.daysCarousel){
          this.daysCarousel.trigger('to.owl.carousel', _currDay.id - this.olderCount);
          this.timelineCarousel.trigger('to.owl.carousel', _currDay.id - this.olderCount);
        }
        this.weekdayStr = _currDay.dayStr.toString();
      } else {
        this.cellClicked(this.sliderDates[0]);
      }

      this.daysCarousel.on('changed.owl.carousel', function(event) {
        let currentCarouselIdx = parseInt(event.property.value);
        if (currentCarouselIdx == self.sliderDates.length-1){
          self.winRef.nativeWindow.$(".owl-next").css("display", "none");
        } else {
          self.winRef.nativeWindow.$(".owl-next").css("display", "block");
        }
        let currDay = self.winRef.nativeWindow.$(event.currentTarget).find(`.item-${currentCarouselIdx}`).attr('id');
        if (self.sliderDates[currentCarouselIdx]){
          self.selectDate(self.sliderDates[currentCarouselIdx]);
          self.weekdayStr = currDay.toString();
        }
      });
      this.timelineCarousel.on('changed.owl.carousel', function(event) {
        let currentCarouselIdx = parseInt(event.property.value);
        let currDay = self.winRef.nativeWindow.$(event.currentTarget).find(`.item-${currentCarouselIdx}`).attr('id');
        if (self.sliderDates[currentCarouselIdx]){
          let currItem = self.sliderDates[currentCarouselIdx];
          self.selectDate(currItem);
          self.inputSelectedDate = currItem["day"]+'/'+currItem["month"]+'/'+currItem["year"];
        }
      });
    }

    inputChangeDate(e){
      let arrSel = this.selectedInputDate.split("-");
      if (this.currentInputDateMonth && parseInt(this.currentInputDateMonth) > parseInt(arrSel[1])){
        this.createMonth(arrSel[1], arrSel[0]);
        this.winRef.nativeWindow.$(".timeline-carousel").hide();
      } else if (this.currentInputDateMonth && parseInt(this.currentInputDateMonth) < parseInt(arrSel[1])) {
        this.createMonth(arrSel[1], arrSel[0]);
        this.winRef.nativeWindow.$(".timeline-carousel").hide();
      }
      setTimeout(()=>{
        let newDate = AppUtils.getObjectById(this.sliderDates, "day", arrSel[2]);
        this.cellClicked(newDate);
        this.inputSelectedDate = arrSel[2]+'/'+arrSel[1]+'/'+arrSel[0];
      }, 500);
      this.currentInputDateMonth = parseInt(arrSel[1]);
    }

    removeBtnClicked():void {
        this.selectionDayTxt = '';
        this.selectedDate = {year: 0, month: 0, day: 0};
        this.dateChanged.emit({date: {}, formatted: this.selectionDayTxt, epoc: 0});
    }

    openBtnClicked():void {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            let y = 0, m = 0;
            if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                y = this.today.getFullYear();
                m = this.today.getMonth() + 1;
            }
            else {
                y = this.selectedDate.year;
                m = this.selectedDate.month;
            }
            // Set current month
            this.visibleMonth = {monthTxt: this.monthLabels[m], monthNbr: m, year: y};

            // Create current month
            this.createMonth(m, y);
        }
    }

    prevMonth():void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.createMonth(m, y);
    }

    nextMonth():void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 12) {
            m = 1;
            y++;
        }
        else {
            m++;
        }
        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.createMonth(m, y);
    }

    prevYear():void {
        this.visibleMonth.year--;
        this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear():void {
        this.visibleMonth.year++;
        this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    todayClicked():void {
        // Today selected
        this.selectDate({day: this.today.getDate(), month: this.today.getMonth() + 1, year: this.today.getFullYear()});
    }

    cellClicked(cell:any):void {
        if (cell.cmo !== this.CURR_MONTH){
          return
        }
        // Cell clicked in the selector
        if (cell.cmo === this.PREV_MONTH) {
            // Previous month of day
            this.prevMonth();
        }
        else if (cell.cmo === this.CURR_MONTH) {
            // Current month of day
            this.selectDate(cell);
        }
        else if (cell.cmo === this.NEXT_MONTH) {
            // Next month of day
            this.nextMonth();
        }
        this.daysCarousel.trigger('to.owl.carousel', cell.id - this.olderCount);
        this.timelineCarousel.trigger('to.owl.carousel', cell.id - this.olderCount);
        if (this.winRef.nativeWindow.$(window).width() < 1023){
          this.winRef.nativeWindow.$(".timeline-carousel").show();
        }
        this.weekdayStr = cell.dayStr.toString();
    }

    selectDate(date:any):void {
        this.selectedDate = {day: date.day, month: date.month, year: date.year};
        this.selectionDayTxt = this.formatDate(date);

        // Custom Editing Pardeep
        if(this.showTextBox==false){
            this.showSelector = true;
        }
        else if(this.showTextBox==true){
            this.showSelector= false;
        }
        Globals.calendaryDate = this.selectedDate;
        // Custom Editing Pardeep
        let epoc = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime() / 1000.0;
        this.dateChanged.emit({date: this.selectedDate, formatted: this.selectionDayTxt, epoc: epoc});
    }

    preZero(val:string):string {
        // Prepend zero if smaller than 10
        return val < '10' ? '0' + val : val;
    }

    formatDate(val:any):string {
        return this.dateFormat.replace('yyyy', val.year)
            .replace('mm', this.preZero(val.month))
            .replace('dd', this.preZero(val.day));
    }

    monthText(m:number):string {
        // Returns mont as a text
        return this.monthLabels[m];
    }

    monthStartIdx(y:number, m:number):number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m:number, y:number):number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m:number, y:number):number {
        // Return number of days of the previous month
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        return this.daysInMonth(m, y);
    }

    isCurrDay(d:number, m:number, y:number, cmo:any):boolean {
        // Check is a given date the current date
        if (this.showCurDay){
            return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
        }
        return false;
    }

    sundayIdx():number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    createMonth(m:number, y:number): void {
        this.dates.length = 0;
        this.olderCount = 0;
        let monthStart = this.monthStartIdx(y, m);
        let dInThisM = this.daysInMonth(m, y);
        let dInPrevM = this.daysInPrevMonth(m, y);
        let sunIdx = this.sundayIdx();

        let dayNbr = 1;
        let cmo = this.PREV_MONTH;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    week.push({day: j, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), sun: week.length === sunIdx});
                }
                cmo = this.CURR_MONTH;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    week.push({day: dayNbr, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    week.push({day: dayNbr, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx});
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
        if (this.daysCarousel){
          this.winRef.nativeWindow.$(".slider-days").find(".owl-item").remove();
        }
        this.sliderDates = [];
        let idx = 0;
        for (let w = 0; w < this.dates.length; w++){
            for (let d in this.dates[w]){
              let dayStr = this.weekDays[d];
              this.dates[w][d].dayStr = dayStr;
              this.dates[w][d].id = idx;
              if (this.dates[w][d].cmo == 1){
                this.olderCount++;
              }
              if (this.dates[w][d].cmo == 2){
                this.sliderDates.push(this.dates[w][d]);
              }
              idx++;
            }
        }

        const self = this;
        // console.log("sliderDates: ", this.sliderDates)
        if (this.daysCarousel){
          setTimeout( function (){
            self.daysCarousel.trigger('destroy.owl.carousel');
            self.daysCarousel.html(self.daysCarousel.find('.owl-stage-outer').html()).removeClass('owl-loaded');
            self.timelineCarousel.trigger('destroy.owl.carousel');
            self.timelineCarousel.html(self.timelineCarousel.find('.owl-stage-outer').html()).removeClass('owl-loaded');
            self.createCarousel();
          }, 500)
        }
    }
}
