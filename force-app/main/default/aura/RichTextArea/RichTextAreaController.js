({
    myAction : function(component, event, helper) {

    },
  
    doInit : function( component,event,helper) {
        component.set("v.validate ",function(){
            var userInput = component.get( "v.value ");
            if(userInput) {
                return { isvalid: true };
            }else if( !userInput && component.get( "v.required") ) {
                return { isvalid: false,errorMessage: 'A value is required.' }
            }else{
                return { isValid: true };
            }
        })
    }
            
           
       
            
    
})