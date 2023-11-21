import { LightningElement } from 'lwc';

export default class TestParentInputComponent extends LightningElement {
    
    flag ;

    checkInputValidity() {
        let allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        
        //  调用子组件的方法
         this.template.querySelector('c-test-son-input-component').checkInputValidity();
        console.log('result2#',this.flag);
        console.log('result : ' + allValid);
    }

    
    getValidResult(event){
        this.flag = event.detail;
    }
}