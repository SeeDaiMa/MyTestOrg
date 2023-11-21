({
    myAction : function(component, event, helper) {

    },
    doInit : function(component,event,helper){
        component.set("v.validate ",function(){
            var userInput = component.get( "v.selectedRowsList");
            if(userInput && userInput.length>0) {
                return { isvalid: true };
            }else{
                return { isValid: false,errorMessage:'A value is required' };
            }
        });
        component.set('v.columns',[
            {label : 'Id',fieldName : 'id',type:'text'},
            {label : 'User Name',fieldName : 'UserName',type:'text'},
            {label : 'Comment', fieldName : 'CommentBody',type:'text'},
            {label : 'CreatedDate',fieldName : 'CreatedDate',type:'Date'}
        ]);
        helper.getData(component);
    },
    getSelectedRecord: function(component,event,helper){
        var selectedRows = event.getParam('selectedRows');
        component.set("v.selectedRowsList",selectedRows);
        var selectedRowsList = component.get("v.selectedRowsList");
        console.log(selectedRowsList);
        let ids;
        for (let index = 0; index < selectedRowsList.length; index++) {
            if(!ids){
                ids = selectedRowsList[index].id;
            }else{
                ids+=','+selectedRowsList[index].id;
            }
        }
        component.set("v.IdsRows",ids);
    }
})