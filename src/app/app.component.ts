import { Component } from '@angular/core';

declare var synaptic: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  perceptron = null;
  outputs = [];
  results:any;

  constructor() {
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
