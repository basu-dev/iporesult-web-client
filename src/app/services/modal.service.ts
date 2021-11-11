import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './api.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];
    private QUERY_PARAM_STRING = 'mop';
    private currentModalId = '';


    public modelDataSub = new Subject<User>();
    constructor(private router: Router, private route: ActivatedRoute) {

        this.route.queryParams.subscribe(data => {
            if (!this.currentModalId) return;
            if (!data[this.QUERY_PARAM_STRING]) {
                this.close(this.currentModalId);
            }
        });
    }

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }


    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);

    }

    open(id: string, data?: User) {
        if (data) {
            this.modelDataSub.next(data);
        }
        // open modal specified by id
        this.modalQueryParamSwitch.on();
        const modal = this.modals.find(x => x.id === id);
        this.currentModalId = id;
        modal.open();
        this.modalQueryParamSwitch.on();
    }

    private modalQueryParamSwitch = {
        manipulateQueryParam: (param: Params, queryParamsHandling?: 'merge') => {
            this.router.navigate(
                [],
                {
                    relativeTo: this.route,
                    queryParams: param,
                    queryParamsHandling,
                });
        },
        on: function () { this.manipulateQueryParam({ mop: 1 }, 'merge'); },
        off: function () { history.back(); }
    };

    close(id: string) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }

    closeAll() {
        this.modals.forEach(m => m.close());
        this.modalQueryParamSwitch.off();
    }
}
