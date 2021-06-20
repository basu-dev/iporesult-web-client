import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from 'src/app/services/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private apiService: ApiService
  ) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      boid: ['', [Validators.required]]
    })
  }

  get name() {
    return this.form.get('name')
  }
  get boid() {
    return this.form.get('boid')
  }
  submit() {

    this.apiService.saveUser(this.form.value);

  }
}
