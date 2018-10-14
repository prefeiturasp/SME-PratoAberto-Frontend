# collapsable
Angular2 Accordion Component 

## IMPORTANT NOTICE

After 0.5.0 or higher, `ng2-collapsable` has been changed to `@ngui/collapsable`. Here are the changes;

* Module `ng2-collapsable` is changed to `@ngui/collapsable`.
* Direvtive `ng2-collapsable` is changed to `ngui-collapsable`.
* Class name `Ng2CollapsableModule` is changed to `NguiCollapsableModule`.

<a href="https://rawgit.com/ng2-ui/collapsable/master/app/index.html">
  Demo
</a>

## Install

1. install @ngui/collapsable

        $ npm install @ngui/collapsable --save

2. add `map` and `packages` to your `systemjs.config.js`

        map['@ngui/collapsable'] = 'node_modules/collapsable/dist/collapsable.umd.js';

3. import NguiCollapsable to your AppModule
        import { NgModule } from '@angular/core';
        import { FormsModule } from "@angular/forms";
        import { BrowserModule  } from '@angular/platform-browser';
        import { AppComponent } from './app.component';
        import { NguiCollapsable } from '@ngui/collapsable';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, NguiCollapsable],
          declarations: [AppComponent],
          bootstrap: [ AppComponent ]
        })
        export class AppModule { }

## Use it in your template
 
    <ngui-collapsable
      selected="js"
      selected-index-class="selected"
      selected-contents-class="slideDown animated">
      <div index="html">HTML</div>
      <div contents="html">HTML {{1}}</div>
      <div index="js">Javascript</div>
      <div contents="js">Javascript {{1}}</div>
    </ngui-collapsable>
         
For full example, please check out `test` directory to see the example of;

  - `systemjs.config.js`
  - `app.module.ts`
  -  and `app.component.ts`.

## **ng2-ui** welcomes new members and contributors

This module is only improved and maintained by contributors like you;

As a contributor, it's NOT required to be skilled in Javascript nor Angular2. 
It’s required to be open-minded and interested in helping others.
You can contribute to the following;

  * Updating README.md
  * Making more and clearer comments
  * Answering issues and building FAQ
  * Documentation
  * Translation

In result of your active contribution, you will be listed as a core contributor
on https://ng2-ui.github.io, and a member of ng2-ui too.

If you are interested in becoming a contributor and/or a member of ng-ui,
please send me email to `allenhwkim AT gmail.com` with your github id. 

## For Developers

### To start

    $ git clone https://github.com/ng2-ui/collapsable.git
    $ cd collapsable
    $ npm install
    $ npm start

