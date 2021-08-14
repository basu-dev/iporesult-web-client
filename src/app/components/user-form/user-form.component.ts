import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService, User } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) { }
  form!: FormGroup;
  user!: User;
  title = "Add User";
  cancelText = "Cancel";
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      boid: ['', [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]]
    })
    this.modalService.modelDataSub.subscribe(
      data => {
        this.title = "Update User";
        this.cancelText = "Delete";
        this.user = data;
        this.form.patchValue(data);
      }
    )
  }

  get name() {
    return this.form.get('name')
  }
  get boid() {
    return this.form.get('boid')
  }
  submit() {
    if (this.user?.name) {
      this.apiService.updateUser(this.form.value, this.user.id);
      // this.toastr.success("IPO", "User Updated Successfully");
      this.close();
      return
    }
    this.apiService.saveUser(this.form.value);
    // this.toastr.success("IPO", "User Added Successfully");
    this.close();

  }
  deleteUser() {
    this.apiService.deleteUser(this.user.id);
    this.close();
  }
  close() {
    this.modalService.closeAll();
    this.user = <User>{};
    this.form.reset();
  }


  get boidError() {
    const field = this.form.get('boid');
    return field?.touched || field?.dirty && (field?.errors?.min || field?.errors?.max);
  }
}
