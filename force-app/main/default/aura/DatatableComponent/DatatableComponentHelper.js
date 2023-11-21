({
    helperMethod : function() {

    },
    getData: function(cmp){
        var action = cmp.get('c.getCaseComment');
        action.setParams({
            recordId :cmp.get('v.recordId')
        });
        action.setCallback(this,$A.getCallback(function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                cmp.set('v.data',response.getReturnValue());
            }else if(state === "ERROR"){
                var errors = response.getError();
                console.log(errors);
            }
        }));
        $A.enqueueAction(action);
    }
})