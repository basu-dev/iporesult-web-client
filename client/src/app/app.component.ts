import {Component} from '@angular/core';
import {ApiService} from './services/api.service';
import {ModalService} from "./services/modal.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService,
              private modalService:ModalService
             ) {
    this.apiService.ping();
    this.apiService.retrieveUsers();
  }
openModal(id: string): void {
        this.modalService.open(id);
    }
}
