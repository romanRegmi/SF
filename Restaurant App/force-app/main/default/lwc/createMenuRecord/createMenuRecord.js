import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import MENU_OBJECT from '@salesforce/schema/Menu__c';
import ITEM_NAME from '@salesforce/schema/Menu__c.Item_Name__c';
import uploadFile from '@salesforce/apex/imageUpload.uploadFile'
import PRICE from '@salesforce/schema/Menu__c.Price__c';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateMenuRecord extends NavigationMixin(LightningElement) {
    @api objectApiName = MENU_OBJECT; 
    @api fields = [ITEM_NAME, PRICE];

    fileData
    
    handleSuccess(e) {
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Menu record created with ID: ' + e.detail.id,
            variant: 'success'
        });

        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
        })
        this.dispatchEvent(new CustomEvent('recordChange'));
        this.dispatchEvent(toastEvent);
        this.navigateToRecordPage(e.detail.id)
        this.openfileUpload(e.detail.id)

    }

    navigateToRecordPage(id) {
        console.log('navigateToRecordPage');
        console.log(id)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: MENU_OBJECT,
                actionName: 'view'
            }
        });
    }
    openfileUpload(recordId, event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title, 
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }

}

