import {Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import {ModalService} from 'src/app/services/modal.service';



@Component({
    selector: 'jw-modal',
    templateUrl: 'Modal.component.html',
    styleUrls: ['Modal.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id!: string;
    @Input() width!: string;
    @Input() height!: string;
    private element: any;

    constructor(private modalService: ModalService, el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: any) => {
            if (el.target.className === 'jw-modal-background') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }


    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }


    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
