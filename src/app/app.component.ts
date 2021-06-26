import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ApiService} from './services/api.service';
import {ModalService} from "./services/modal.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private apiService: ApiService,
    private modalService: ModalService
  ) {

    this.apiService.ping();
    this.apiService.retrieveUsers();
  }
  loading$: Observable<boolean> = of(false);
  openModal(id: string): void {
    this.modalService.open(id);
  }
  ngOnInit() {
    this.loading$ = this.apiService.loading$;
  }

}
