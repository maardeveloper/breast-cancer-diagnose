import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() toggleView;

  constructor() { }

  alertTeam() {
    alert('Jorge, Roli, Mario, Peps');
  }

  ngOnInit() {
  }

}
