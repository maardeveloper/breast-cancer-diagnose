import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';

declare var synaptic: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [NetworkService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  perceptron = null;
  outputs = [];
  results:any;

  neuralNet: any;
  trainer: any;
  trainingSet: any;
  testingSet: any;

  testNetworkArray:any;
  trainingNetworkArray:any;
  xTrain:any;
  yTrain:any;
  xTest:any;
  yTest:any;

  inputLayerSize: number;
  hiddenLayerSize: number;
  outputLayerSize: number;

  inputLayer:any;
  hiddenLayer: any;
  outputLayer:any;

  hasCancer: boolean;
  answer: string;

  constructor(private _network: NetworkService) {

    const TRAINING_SET =
      [
        {
          input: [0.5,0.1,0.3,0.1,0.2,0.1,0.3,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.2,0.4,0.1,0.1,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.1,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.4,0.6,0.8,0.4,0.1,0.8,1,0.1],
          output: [1]
        },
        {
          input: [0.5,0.3,0.2,0.8,0.5,1,0.8,0.1,0.2],
          output: [1]
        },
        {
          input: [1,0.5,1,0.3,0.5,0.8,0.7,0.8,0.3],
          output: [1]
        },
        {
          input: [0.4,0.1,0.1,0.2,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,1,1,1,1,1,1,0.1,0.1],
          output: [1]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [1,0.4,0.3,1,0.3,1,0.7,0.1,0.2],
          output: [1]
        },
        {
          input: [0.5,1,1,1,0.5,0.2,0.8,0.5,0.1],
          output: [1]
        },
        {
          input: [0.8,1,1,1,0.6,1,1,1,10],
          output: [1]
        },
        {
          input: [0.2,0.3,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.1,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.3,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.6,0.3,0.3,0.3,0.3,0.2,0.6,0.1,0.1],
          output: [0]
        },
        {
          input: [0.7,0.1,0.2,0.3,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.2,0.1,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.3,0.1,0.3,0.4,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.6,0.6,0.5,0.7,0.6,0.7,0.7,0.3],
          output: [1]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.2,0.5,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.6,0.2,0.3,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.8,0.7,0.4,0.4,0.5,0.3,0.5,1,0.1],
          output: [1]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.4,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [1,1,0.7,0.8,0.7,0.1,1,1,0.3],
          output: [1]
        },
        {
          input: [0.4,0.2,0.4,0.3,0.2,0.2,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.3,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.3,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.2,0.2,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.3,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,1,1,1,1,0.2,1,1,10],
          output: [1]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.2,0.3,0.4,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.2,0.1,0.3,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.2,0.2,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.3,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.4,0.5,0.1,0.8,0.1,0.3,0.6,0.1],
          output: [0]
        },
        {
          input: [0.7,0.8,0.8,0.7,0.3,1,0.7,0.2,0.3],
          output: [1]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.3,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.3,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.3,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.3,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.2,0.2,0.2,0.2,0.1,0.1,0.1,0.2],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.3,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.7,0.4,0.1,0.6,0.1,0.7,1,0.3],
          output: [1]
        },
        {
          input: [0.5,1,1,0.8,0.5,0.5,0.7,1,0.1],
          output: [1]
        },
        {
          input: [0.3,1,0.7,0.8,0.5,0.8,0.7,0.4,0.1],
          output: [1]
        },
        {
          input: [0.3,0.2,0.1,0.2,0.2,0.1,0.3,0.1,0.1],
          output: [0]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.2,0.1,0.3,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.3,0.2,0.1,0.3,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.4,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.2,0.1,0.2,0.1,0.2,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [1,1,1,1,0.5,1,1,1,7],
          output: [1]
        },
        {
          input: [0.5,1,1,1,0.4,1,0.5,0.6,0.3],
          output: [1]
        },
        {
          input: [0.5,0.1,0.1,0.1,0.2,0.1,0.3,0.2,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        }
      ];
    const TESTING_SET =
      [
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.3,0.1],
          output: [0]
        },
        {
          input: [0.4,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.1,0.2,0.1,0.1,0.1,8],
          output: [0]
        },
        {
          input: [0.1,0.1,0.1,0.3,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,1,1,0.5,0.4,0.5,0.4,0.4,0.1],
          output: [1]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.2,0.1,0.2,0.1,0.2],
          output: [0]
        },
        {
          input: [0.3,0.1,0.1,0.1,0.3,0.2,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.2,0.1,0.1,0.1,0.2,0.1,0.1,0.1,0.1],
          output: [0]
        },
        {
          input: [0.5,1,1,0.3,0.7,0.3,0.8,1,0.2],
          output: [1]
        },
        {
          input: [0.4,0.8,0.6,0.4,0.3,0.4,1,0.6,0.1],
          output: [1]
        }
      ];

    console.log(TRAINING_SET);
    this.xTest = [];
    this.yTest = [];
    this.inputLayerSize = 9;
    this.hiddenLayerSize = 2;
    this.outputLayerSize = 1;

    this.inputLayer = new synaptic.Layer(this.inputLayerSize);
    this.hiddenLayer = new synaptic.Layer(this.hiddenLayerSize);
    this.outputLayer = new synaptic.Layer(this.outputLayerSize);

    this.inputLayer.project(this.hiddenLayer);
    this.hiddenLayer.project(this.outputLayer);

    this.neuralNet = new synaptic.Network({
      input: this.inputLayer,
      hidden: [this.hiddenLayer],
      output: this.outputLayer
    });

    this.trainer = new synaptic.Trainer(this.neuralNet);

    this.trainingSet = TRAINING_SET;
    this.testingSet = TESTING_SET;

    this.trainer.train(this.trainingSet, {
      rate: 0.2,
      iterations: 20,
      error: 0.05,
      shuffle: true,
      log: 1,
      cost: synaptic.Trainer.cost.CROSS_ENTROPY
    });

    console.log('este men es el checado test', TESTING_SET[7].input);
    console.log(this.neuralNet.activate(TESTING_SET[7].input), 'otra wea~input');
    console.log(TESTING_SET[7].output, 'otra wea~output');
  }

  doesHasCancer(valueActivated:number) {
    valueActivated > 0.75 ? this.answer = 'you have cancer' : this.answer = 'you dont have cancer';
  }

  activateFormInputs(formValues) {
    console.log(formValues, 'awewe from home');
    console.log(this.neuralNet.activate(formValues), 'Este es tu resultado chavo');
    this.doesHasCancer(this.neuralNet.activate(formValues));
  }

  getTrainJSON() {
    this._network.getTrainingData().then((response) => {
      this.trainingNetworkArray = response;
      console.log(response);
    }).catch((error) => console.log(error));
  }

  getTestJSON() {
    this._network.getTestData().then((response) => {
      this.testNetworkArray = response;
      console.log(response);
    }).catch((error) => console.log(error));
  }

  fillxTest(){
    for(let instance of this.testNetworkArray) {
      let pushStuff = {};
      pushStuff['FIELD1'] = instance['FIELD1'];
      pushStuff['FIELD2'] = instance['FIELD2'];
      pushStuff['FIELD3'] = instance['FIELD3'];
      pushStuff['FIELD4'] = instance['FIELD4'];
      pushStuff['FIELD5'] = instance['FIELD5'];
      pushStuff['FIELD6'] = instance['FIELD6'];
      pushStuff['FIELD7'] = instance['FIELD7'];
      pushStuff['FIELD8'] = instance['FIELD8'];
      pushStuff['FIELD9'] = instance['FIELD9'];
      pushStuff['FIELD10'] = instance['FIELD10'];
      this.xTest.push(pushStuff);
    }
    console.log(this.xTest, 'xtest');
  }

  fillyTest(){
    for(let instance of this.testNetworkArray) {
      let pushStuff = {};
      pushStuff['FIELD11'] = instance['FIELD11'];
      this.yTest.push(pushStuff);
    }
    console.log(this.yTest, 'ytest');
  }

  binarizeOutput() {
    for(let instance of this.testNetworkArray) {
      if(instance['FIELD11'] == 2) {
        instance['FIELD11'] = 0
      }
      if(instance['FIELD11'] == 4) {
        instance['FIELD11'] = 1
      }
    }
    console.log(this.testNetworkArray, 'this new shit');
  }

  binarizeTestOutput() {
    for(let instance of this.yTest) {
      if(instance['FIELD11'] == 2) {
        instance['FIELD11'] = 0
      }
      if(instance['FIELD11'] == 4) {
        instance['FIELD11'] = 1
      }
    }
    console.log(this.yTest, 'this new test array');
  }

  binarizeTestInput() {
    for(let instance of this.xTest) {
        instance['FIELD2'] = instance['FIELD2'] / 10;
        instance['FIELD3'] = instance['FIELD3'] / 10;
        instance['FIELD4'] = instance['FIELD4'] / 10;
        instance['FIELD5'] = instance['FIELD5'] / 10;
        instance['FIELD6'] = instance['FIELD6'] / 10;
        instance['FIELD7'] = instance['FIELD7'] / 10;
        instance['FIELD8'] = instance['FIELD8'] / 10;
        instance['FIELD9'] = instance['FIELD9'] / 10;
        instance['FIELD10'] = instance['FIELD10'] / 10;
    }
    console.log(this.xTest, 'this new train array');
  }

  ngOnInit() {
  }

}
