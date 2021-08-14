import { Component, OnInit } from '@angular/core';
import { ApiService, Ipo } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private apiService: ApiService,
        private modalService: ModalService
    ) { }

    ipos!: Ipo[];
    error = false;

    ngOnInit(): void {
        this.apiService.getIpos().subscribe(
            (data: any) => {
                this.error = false;
                this.ipos = data
            },
            (err: any) => {
                this.error = true;
            }
        )
    }
    openModal(id: string): void {
        this.modalService.open(id);
    }
}
