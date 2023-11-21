({
    myAction : function(component, event, helper) {

    },
    handleSubmit:function(component, event, helper) {
        console.log(component.get("v.Name"),component.get("v.Phone"),component.get("v.BillingAddress"),component.get("v.Match_Billing_Address__c"));
    },
})
