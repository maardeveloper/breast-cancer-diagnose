import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.css']
})
export class CompareResultComponent implements OnInit {

  @Input() neuralNetwork;

  constructor() { }

  ngOnInit() {
  }

}
