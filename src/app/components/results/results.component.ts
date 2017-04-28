import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() testingArray;

  arrayWithResults = [];

  currentAnswer: any;

  cancerApiJSON:any;

  constructor() { }

  pushTheResult(currentAnswer) {
    let result = {};
    result['x_position'] = this.calculateXPositionResult(currentAnswer);
    result['y_position'] = this.calculateXPositionResult(currentAnswer);
    result['color'] = 'blue';
    result['delay'] = this.calculateDelayResult(currentAnswer);
    result['isOurResult'] = true;
    this.arrayWithResults.push(result);
  }

  fillTheResultsArray() {
      for(let result of this.testingArray) {
        result['x_position'] = this.calculateXPosition(result);
        result['y_position'] = this.calculateXPosition(result);
        result['color'] = this.calculateColor(result);
        result['delay'] = this.calculateDelay(result);
        result['isOurResult'] = false;
        this.arrayWithResults.push(result);
      }
  }

  calculateXPosition(result) {
    let xposition: number = 0;
    for(let value of result.input) {
      xposition = xposition + value;
    }
    xposition = (xposition/9) * 100;
    return xposition;
  }

  calculateDelay(result) {
    let xposition: number = 0;
    for(let value of result.input) {
      xposition = xposition + value;
    }
    xposition = (xposition/9);
    return xposition;
  }

  calculateXPositionResult(result) {
    let xposition: number = 0;
    for(let value of result) {
      xposition = xposition + value;
    }
    xposition = (xposition/9) * 100;
    return xposition;
  }

  calculateDelayResult(result) {
    let xposition: number = 0;
    for(let value of result) {
      xposition = xposition + value;
    }
    xposition = (xposition/9);
    return xposition;
  }

  calculateColor(result) {
    let color: string = '';
    if(result.output[0] == 0) {
      color = 'green';
    } else {
      color = 'red';
    }
    return color;
  }

  ngOnInit() {
    this.fillTheResultsArray();
  }

  popLastEntry() {
    this.arrayWithResults.pop();
  }


}
