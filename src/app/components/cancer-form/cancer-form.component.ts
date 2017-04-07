import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CancerFormService } from '../../services/cancer-form.service';

declare var synaptic: any;

@Component({
  selector: 'cancer-form',
  templateUrl: './cancer-form.component.html',
  providers: [ CancerFormService ],
  styleUrls: ['./cancer-form.component.css']
})
export class CancerFormComponent implements OnInit {

  @Output() formValue: EventEmitter<any> = new EventEmitter();

  cancerForm: FormGroup;

  constructor( public fb: FormBuilder ) {
    this.cancerForm = fb.group({
      'cT': [null, Validators.required],
      'uCSi': [null, Validators.required],
      'uCSh': [null, Validators.required],
      'mA': [null, Validators.required],
      'sECS': [null, Validators.required],
      'bN': [null, Validators.required],
      'bC': [null, Validators.required],
      'nN': [null, Validators.required],
      'm': [null, Validators.required]
    });
  }

  binarizeData(valuesArray) {
    let binarizedArray = [];
    for(let arrayItem of valuesArray) {
      arrayItem = arrayItem/10;
      binarizedArray.push(arrayItem);
    }
    return binarizedArray;
  }

  submitForm() {
    let arrayData = [
      this.cancerForm.controls['cT'].value, this.cancerForm.controls['uCSi'].value,
      this.cancerForm.controls['uCSh'].value, this.cancerForm.controls['mA'].value,
      this.cancerForm.controls['sECS'].value, this.cancerForm.controls['bN'].value,
      this.cancerForm.controls['bC'].value, this.cancerForm.controls['nN'].value,
      this.cancerForm.controls['m'].value
    ];
    arrayData = this.binarizeData(arrayData);
    console.log(arrayData);
    this.formValue.emit(arrayData);
    console.log('lel');
  }

  ngOnInit() {
  }

}
