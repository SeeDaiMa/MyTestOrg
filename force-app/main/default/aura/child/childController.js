({
    myAction : function(component, event, helper) {

    },
    clickChild: function(component, event, helper) {
        console.log(component.get('v.aaaa'));
        component.set('v.aaaa','lisi');
        console.log(component.get('v.aaaa'));
    },
})