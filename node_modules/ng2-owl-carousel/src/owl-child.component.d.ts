import { OnDestroy, ElementRef } from "@angular/core";
export declare class OwlChild implements OnDestroy {
    private el;
    owlClass: boolean;
    $owl: any;
    options: any;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    trigger(action: string, options?: any[]): void;
    ngOnDestroy(): void;
}
