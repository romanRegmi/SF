import { LightningElement, wire, track } from 'lwc';
import getMenu from '@salesforce/apex/MenuIdController.getMenu';


export default class FetchMenu extends LightningElement {

    @track columns = [
        { label: 'Name', fieldName: 'Item_Name__c' },
        { label: 'Price', fieldName: 'Price__c' }
    ];

    @track itemList;

    @wire(getMenu)
    wiredMenu({ data, error }) {

        if (data) {
            this.itemList = data;
            console.log(JSON.stringify(this.itemList));
        } else if (error) {
            console.log(error);
        }
    }

    @track imageUrl;

    inputChange(e) {
        if (e.target.value) {
            this.imageUrl = '/sfc/servlet.shepherd/document/download/' + e.target.value

        }

    }

}