import { Component, OnInit, ViewChild } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { CancerResultService } from '../services/cancer-result.service';

declare var synaptic: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [NetworkService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('resultsComponent') resultsComponent;

  perceptron = null;
  outputs = [];
  results:any;

  willPassNeuralNet: any = 'neuralNet';

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

  toggleView: boolean = false;

  hasCancer: boolean;
  cancerPercentage: number;
  answer: string;

  cancerResult:any;

  cancerApiJSON: any;

  constructor(
    private _network: NetworkService,
    private _cancerApi: CancerResultService
  ) {

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
  }

  ngOnInit() {}

  doesHasCancer(valueActivated:number) {
    valueActivated > 0.75 ? this.answer = '!!!!!Tienes una alta probabilidad de cancer de mama, ve al doctor!!!!!'
                          : this.answer = 'Tienes una baja probabilidad de cancer de mama, descuida :)';
    this.cancerPercentage = valueActivated;
    this.toggleViewAction();
  }

  toggleViewAction() {
    this.toggleView = !this.toggleView;
  }

  toggleViewFromRepeat() {
    this.toggleViewAction();
    this.popFromResult();
  }

  activateFormInputs(formValues) {
    this.cancerResult = this.neuralNet.activate(formValues);
    this.resultsComponent.pushTheResult(formValues);
    this.doesHasCancer(this.neuralNet.activate(formValues));
  }

  getTrainJSON() {
    this._network.getTrainingData().then((response) => {
      this.trainingNetworkArray = response;
    }).catch((error) => console.log(error));
  }

  getTestJSON() {
    this._network.getTestData().then((response) => {
      this.testNetworkArray = response;
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
  }

  fillyTest(){
    for(let instance of this.testNetworkArray) {
      let pushStuff = {};
      pushStuff['FIELD11'] = instance['FIELD11'];
      this.yTest.push(pushStuff);
    }
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
  }

  popFromResult() {
    this.resultsComponent.popLastEntry();
  }
}
