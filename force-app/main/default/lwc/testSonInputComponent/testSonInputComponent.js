import { LightningElement, api } from 'lwc';

export default class TestSonInputComponent extends LightningElement {
    @api
    checkInputValidity() {
        let allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        this.dispatchEvent(new CustomEvent('valid', {
            detail: allValid
        }));
    }
}