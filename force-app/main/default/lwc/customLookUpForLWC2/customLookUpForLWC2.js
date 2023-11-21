import { LightningElement, api, track, wire } from 'lwc';
import lookUp from '@salesforce/apex/LookupController.lookUp';
export default class CustomLookUpForLWC2 extends LightningElement {;

    @api objName; // 对象的名字

    @api iconName; // icon 的名字 

    filter = ''; // 需要筛选的条件， 

    @track searchName; // 搜索的关键字

    @track options; // 被检索出来的集合
    
    @track isShow = true; // 是否显示输入框
    
    @track valueName ; // 选择后显示的名字 
    

    @track isOptionShow = false; // 是否显示下面的options 
    // get isOptionShow(){
    //     return this.options && this.options.length > 0;
    // }

    
    search(event){
        this.searchName = event.target.value;
        console.log('search##',event.target.value);
    }

    @wire(lookUp,{searchTerm : '$searchName', myObject : '$objName', filter : '$filter'})
    searchListBySearchName({error,data}){
        if(data){
            console.log('data##',data);
            this.options = data; 
        }else if(error){
            console.log(error);
        }
    }


    
    handleClick() {
        console.log("In handleClick");
        if(!this.searchName){
            this.searchName = '';
        }
        this.isOptionShow = true;
        // this.inputClass = 'slds-has-focus';
        // this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }
    
    //  选择li
    selected(event){
        console.log('#event.currentTarget##',event.currentTarget);
        this.valueName =  event.currentTarget.dataset.name;
        console.log('#valueName#',this.valueName);
        this.isShow =false;
        // this.options = null;
        this.isOptionShow = false;
    }

    // 取消
    cancel(event){
        this.valueName = null;
        this.isShow = true;
        this.searchName = '';
        // 点击事件 获取焦点
        console.log('1',this.template.querySelector("lightning-input").value);
        console.log('2',this.template.querySelector("[label='account search']").value);
        this.template.querySelector("lightning-input").onclick();
    }


    // 失去焦点
    blur(event){
        // this.searchName = null;
        // this.options = null;
        console.log(1111);
        setTimeout(() => {
            this.isOptionShow = false;
        }, 300);
        // this.isShow =false;
    }
}