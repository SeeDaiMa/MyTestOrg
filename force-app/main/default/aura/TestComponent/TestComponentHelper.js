({
    helperMethod : function() {

    },
    changeByBtn : function(component, event,btnFlag,iconId){
        var flag = component.get(btnFlag);
        var icon = component.find(iconId); 
        // you can verify say the iconName as below
        
        // now let's say I want to change the icon type, I can set that right this way
        if(flag){
            icon.set("v.iconName","utility:chevronright");
            component.set(btnFlag,false);
        }else{
            icon.set("v.iconName","utility:chevrondown");
            component.set(btnFlag,true);
        }
        
         // this will change my icon on component.
    }
})