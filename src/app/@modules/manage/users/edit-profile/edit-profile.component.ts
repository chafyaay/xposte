import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ProfileService } from '@core/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnChanges {
  @Input() profileInfo:any[];
  profileForm:FormGroup;
  @Output() profileEvent:EventEmitter<any>=new EventEmitter();
  constructor(
    private serviceprofile:ProfileService
  ) { }

  ngOnChanges() {
    this.initForm();
  }

  initForm(){
    let obj={};
    if(this.profileInfo.length>1)
    this.profileInfo.map(input=>{
      if(input.label!=='role' || input.label!=='listeFrontaux') 
      obj[input.label]= new FormControl(input.value,{validators:[Validators.required,this.getValidator(input)]},)
    })

    this.profileForm=new FormGroup(obj);

    
  }


  onSubmit(){
    this.serviceprofile.updateProfile(this.profileForm.value).subscribe(data=>{
      this.profileEvent.emit({isvalid:true,...data});
    },
    err=>{
      this.profileEvent.emit({isvalid:false});
    }
    )
  }

   getValidator(input:any): ValidatorFn {
    return (control: AbstractControl) => {
      let regex ;
      let inputValid = true;
      if(input.label==='nom' || input.label==='prenom'){
        regex=new RegExp('^[a-zA-Z_ ]+$');
        if (!regex.test(control.value)) {
          inputValid = false;
        }
      }else if(input.label==='adresseMail'){
        regex=new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
        if (!regex.test(control.value)) {
          inputValid = false;
        }
      }else{
        inputValid = true;
      }
      
  console.log('----',inputValid)
      return inputValid ? null : { inputValid: true };
    };
  }


  

}
