import { IterableDiffers, DoCheck } from '@angular/core';
import { OwlChild } from "./owl-child.component";
export declare class OwlCarousel implements DoCheck {
    private differs;
    $owlChild: OwlChild;
    carouselClasses: any;
    options: any;
    private _items;
    private differ;
    show: boolean;
    constructor(differs: IterableDiffers);
    items: any[];
    ngDoCheck(): void;
    refresh(): void;
    next(options?: any[]): void;
    previous(options?: any[]): void;
    to(options?: any[]): void;
    trigger(action: string, options?: any[]): void;
}
