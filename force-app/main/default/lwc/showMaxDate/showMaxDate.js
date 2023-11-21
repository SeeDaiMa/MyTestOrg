import { LightningElement } from 'lwc';
import getMaxDayForThisMonth from './commonUtils';
export default class ShowMaxDate extends LightningElement {
    maxDate = getMaxDayForThisMonth(new Date());
}