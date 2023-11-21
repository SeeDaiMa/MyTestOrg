import { LightningElement, track, wire } from 'lwc';
import userId from "@salesforce/user/Id";
import { MessageContext,APPLICATION_SCOPE, publish,subscribe, unsubscribe } from 'lightning/messageService'; 
import { IsConsoleNavigation,EnclosingTabId, getFocusedTabInfo,setTabLabel,refreshTab,openSubtab } from 'lightning/platformWorkspaceApi';
export default class customizeTabLwc extends LightningElement {
    @wire(IsConsoleNavigation) isConsoleNavigation;
    result;
    @wire(EnclosingTabId) tabId;

    showTabInfo(event) {
        if (this.isConsoleNavigation) {
            getFocusedTabInfo().then((tabInfo) => {
                this.result = JSON.stringify(tabInfo);
            }).catch(function(error) {
                console.log(error);
            }); 
        }
    }

    changeTabInfo(event) {
        if (this.isConsoleNavigation) {
            // getFocusedTabInfo().then((tabInfo) => {
            //     setTabLabel(tabInfo.tabId, 'updated tab');
            //     refreshTab(tabInfo.tabId);
            // }).catch(function(error) {
            //     console.log(error);
            // }); 
            setTabLabel(this.tabId, 'updated tab');
        }
    }

    addSubTabInfo(event) {
        if (this.isConsoleNavigation) {
            // getFocusedTabInfo().then((tabInfo) => {
            //     openSubtab(tabInfo.tabId, { recordId: userId, focus: true });
            // }).catch(function(error) {
            //     console.log(error);
            // }); 
            openSubtab(this.tabId, { recordId: userId, focus: true });
        }
    }
}