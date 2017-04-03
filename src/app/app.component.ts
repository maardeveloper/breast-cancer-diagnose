import { Component } from '@angular/core';
import { NetworkService } from './services/network.service';
declare var synaptic: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [NetworkService],
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  perceptron = null;
  outputs = [];
  results:any;
  trainingNetwork:any;

  constructor(private _network: NetworkService) {
  }

  getTrainJSON() {
    this._network.getTrainingData().then((response) => {
      this.trainingNetwork = response;
      console.log(response);
    }).catch((error) => console.log(error));
  }

  getTestJSON() {
    this._network.getTestData().then((response) => {
      this.trainingNetwork = response;
      console.log(response);
    }).catch((error) => console.log(error));
  }

  train(){
    this.perceptron = new synaptic.Architect.Perceptron(2,3,1);
    this.results = this.perceptron.trainer.XOR({
  			iterations: 100000,
  			error: .0001,
  			rate: 1
  		});
      this.validate();
    }

    validate(){
      this.outputs = [];
  		this.outputs.push({
  			input: '0 0',
  			output: this.perceptron.activate([0,0])[0].toFixed(3),
  			target: 0
  		});
  		this.outputs.push({
  			input: '0 1',
  			output: this.perceptron.activate([0,1])[0].toFixed(3),
  			target: 1
  		});
  		this.outputs.push({
  			input: '1 0',
  			output: this.perceptron.activate([1,0])[0].toFixed(3),
  			target: 1
  		});
      this.outputs.push({
  			input: '1 1',
  			output: this.perceptron.activate([1,1])[0].toFixed(3),
  			target: 0
  		});
      console.log(this.outputs);
  	}
}
