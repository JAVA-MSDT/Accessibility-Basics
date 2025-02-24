import { Component, OnInit } from '@angular/core';
import { DropdownAccessiblity } from './service/dropdownmenu-index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dropdwon: DropdownAccessiblity) {}
  ngOnInit(): void {
    this.dropdwon.activateDDMenu(
      'menuContainer',
      'menuBtn',
      'menuList',
      'menuItme'
    );
    this.dropdwon.activateDDMenu(
      'menuContainer2',
      'menuBtn2',
      'menuList2',
      'menuItme2'
    );
  }
}
