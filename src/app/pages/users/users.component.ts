import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {ModalService} from 'src/app/services/modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private apiService: ApiService, private modalService: ModalService) {}

  users!: any[];
  ngOnInit(): void {
    this.users = this.apiService.retrieveUsers();
    setTimeout(() => this.apiService.loading(false), 0);

  }
  editUser(id: string) {
    let user = this.apiService.getUserById(id);
    this.modalService.open('payment-modal', user);
  }

}
