({
    doInit : function(component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var errorMessage = myPageRef.state.c__errorMessage;
        component.set('v.errorMessage',errorMessage);
    }
})