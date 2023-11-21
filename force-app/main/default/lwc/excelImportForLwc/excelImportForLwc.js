import { LightningElement,track } from 'lwc';
import sheetJS from '@salesforce/resourceUrl/sheetJS';
import {loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ExcelImportForLwc extends LightningElement {
    @track dataList = [];
    @track disableButton = true;

    connectedCallback() {
        loadScript(this, sheetJS).then(() => {
             console.log('加载 sheet JS完成');
             this.disableButton = false;
        });
    }
    excelFileToJson(event) {
        event.preventDefault();
        let files = event.target.files;

        const analysisExcel = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

        analysisExcel(files[0])
        .then((result) => {
            let datas = []; // 存储获取到的数据
            // let XLSX = window.XLSX;
            let workbook = XLSX.read(result, {
                type: 'binary'
            });
            for (let sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    datas = datas.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                }
            }

            this.dataList = datas;
            const toastEvent = new ShowToastEvent({
                variant: "success",
                message: '文件已经上传解析成功',
            });
            this.dispatchEvent(toastEvent);
        });
    }

    printResult() {
        console.log(JSON.stringify(this.dataList));
    }
}