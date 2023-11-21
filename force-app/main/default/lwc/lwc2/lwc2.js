import { LightningElement, track } from 'lwc';

export default class Lwc2 extends LightningElement {

    percentage = 50;
    
    

    handlePercentageChange(event){
        this.percentage = event.target.value;
    }
}