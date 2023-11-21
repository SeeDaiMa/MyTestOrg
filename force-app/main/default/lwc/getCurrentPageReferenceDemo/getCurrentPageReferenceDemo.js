import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';

export default class GetCurrentPageReferenceDemo extends LightningElement {
    @wire(CurrentPageReference)
    pageRef;

    get currentPageInfo() {
        if(this.pageRef !== undefined) {
            return JSON.stringify(this.pageRef);
        }
        return '';
    }
}