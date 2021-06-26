import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from './api.service';

@Injectable({providedIn: 'root'})
export class ModalService {
    private modals: any[] = [];

    public modelDataSub = new Subject<User>();

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
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }

    close(id: string) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
    closeAll() {
        this.modals.forEach(m => m.close());
    }
}
