trigger MaintenanceRequest on Case (before update, after update) {
    // ToDo: Call MaintenanceRequestHelper.updateWorkOrders
    Map<Id,Case> caseLst = new Map<Id,Case>();
    
    if(Trigger.isUpdate  && Trigger.isAfter){
        for(Case oCase: Trigger.new){
            if (oCase.IsClosed && (oCase.Type.equals('Repair'))){
                caseLst.put(oCase.Id, oCase);
            }
        }
        if(caseLst.size() > 0){
            System.debug('****Calling updateWorkOrders from MaintenanceRequestHelper Class****');
            MaintenanceRequestHelper.updateWorkOrders(caseLst.values());    
        }        
    } 
}
