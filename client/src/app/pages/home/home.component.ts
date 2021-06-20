import {Component, OnInit} from '@angular/core';
import {ApiService, Ipo} from 'src/app/services/api.service';
import {ModalService} from 'src/app/services/modal.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private apiService: ApiService,
        private modalService: ModalService
    ) {}
    ipos!: Ipo[];
    colors = ['blue', 'green', 'red', 'orangered', '#ff00ff']
    random: number[] = []
    ngOnInit(): void {
        this.apiService.getIpos().subscribe(
            (data: any) => {
                this.ipos = data
                console.log(data)
                for (let i = 0; i < this.ipos.length; i++) {
                    this.random.push(Math.random() * this.ipos.length)
                }
            },
            (err: any) => console.log(err)
        )

    }

    openModal(id: string): void {
        this.modalService.open(id);
    }
}
