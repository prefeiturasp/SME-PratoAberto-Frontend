import { ElementRef, DoCheck, OnChanges, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
export interface MaterializeAction {
    action: string;
    params: [any];
}
export declare class MaterializeDirective implements AfterViewInit, DoCheck, OnChanges, OnDestroy {
    private _el;
    private _params;
    private _functionName;
    private previousValue;
    private previousDisabled;
    private _waitFunction;
    private changeListenerShouldBeAdded;
    init: EventEmitter<void>;
    private initialized;
    constructor(_el: ElementRef);
    materializeParams: any;
    materializeActions: EventEmitter<string | MaterializeAction>;
    materialize: string;
    materializeSelectOptions: any;
    ngModel: any;
    ngAfterViewInit(): void;
    ngOnChanges(_unused?: any): void;
    ngOnDestroy(): void;
    ngDoCheck(): boolean;
    private performElementRemotion();
    private performElementUpdates();
    private performLocalElementUpdates(functionName?, params?);
    private isTooltip();
    private isSelect();
    private isDatePicker();
    private isTimePicker();
    private isChips();
    private isAutocomplete();
    private isTextarea();
    private enableDPButtons();
}
