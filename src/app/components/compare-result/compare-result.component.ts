import { Component, OnInit, Input } from '@angular/core';
import { CancerResultService } from '../../services/cancer-result.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.css']
})
export class CompareResultComponent implements OnInit {

  @Input() willPassNeuralNet;

  resultArray: any;

  constructor(private _cancerResult: CancerResultService) { }

  ngOnInit() {
    this.getAllResults();
  }

  getAllResults() {
    this._cancerResult.getAllCancerResult().then((response) => {
      this.resultArray = response;
      console.log('REspuesta de respuestas', response);
    }).catch((error) => console.log(error));
  }

}
