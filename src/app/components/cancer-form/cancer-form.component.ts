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

  submitForm(formData) {
    let arrayData = [formData.value.cT, formData.value.uCSi, formData.value.uCSh, formData.value.mA, formData.value.sECS, formData.value.bN, formData.value.bC, formData.value.nN, formData.value.m];
    arrayData = this.binarizeData(arrayData);
    console.log(arrayData);
    this.formValue.emit(arrayData);
  }

  ngOnInit() {
  }

}
