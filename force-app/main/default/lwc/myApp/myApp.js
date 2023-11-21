import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';

export default class MyApp extends LightningElement {

    showSpinner = false;

    // async handleAlertClick() {
    //     await LightningAlert.open({
    //         message: 'this is the alert message',
    //         theme: 'error', // a red theme intended for error states
    //         label: 'Error!', // this is the header text
    //     });
    //     //Alert has been closed
    // }


    handleAlertClick() {
        /*
        theme available options
          default: white
        shade: gray
        inverse: dark blue
        alt-inverse: darker blue
        success: green
        info: gray-ish blue
        warning: yellow
        error: red
        offline: ​black
        */
        this.showSpinner = true;
        LightningAlert.open({
            message: 'this is the alert message',
            theme: 'error', // a red theme intended for error states
            label: 'Error!', // this is the header text
            variant: "header"
        }).then((result) => {
            //当点击OK按钮以后的调用内容
            console.log('execute')
            this.showSpinner = false;
        });
    }
}