import LightningDatatable from 'lightning/datatable';
import imageRow from './imageRow.html';
export default class DataTableWithImage extends LightningDatatable {
    static customTypes = {
        image: {
            template: imageRow
        }
    };
}