trigger OrderEventTrigger on Order_Event__e (after insert) {



    if(Trigger.isAfter && Trigger.isInsert){
        List<Task> tasks = new List<Task>();
        for (Order_Event__e evt : (List<Order_Event__e>)Trigger.new) {
            if(evt.Has_Shipped__c){
                Task ta = new Task();
                ta.Priority = 'Medium';
                ta.Subject =  'Follow up on shipped order 105';
                ta.OwnerId = evt.CreatedById;
                tasks.add(ta);
            }
        }
        if(tasks.size()>0){
            INSERT tasks;
        }
    }
}