({
    handleCloseCurrentTabEvent : function(component, event, helper) {
        console.log('execute this current tab handler');
        let workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            
            workspaceAPI.closeTab({tabId: focusedTabId});
        })
        .catch(function(error) {
            console.log('execute');
            console.log(error);
        });
    },
    handleInit : function(component,event,helper) {
        
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            workspaceAPI.setTabLabel({
                tabId: focusedTabId,
                label: "Updated Tab Label"
            });
            // workspaceAPI.refreshTab({tabId:focusedTabId});
        })
        .catch(function(error) {
            console.log(error);
        });

        // var recordId = component.get("v.pageReference").state.c__RecordId;
        // component.set('v.AccountId', recordId);
    }
})