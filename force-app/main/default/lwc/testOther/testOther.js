import { LightningElement } from 'lwc';

export default class TestOther extends LightningElement {

    header = "hello";

    counter = "world";

    render() {
        return `
        <template>
        <h2>${this.header} Nr. ${this.counter}!</h2>
        </template>
         `;
    }
}