public class LeadProcessor implements Database.Batchable<sObject>,Database.Stateful {

    // instance member to retain state across transactions
    public Integer recordsProcessed = 0;

    public Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator('select id,LeadSource from lead');
    }

    public void execute(Database.BatchableContext BC, List<Lead> scope) {
        for (Lead l : scope) {
            l.LeadSource = 'Dreamforce';
            recordsProcessed+=1;
        }
        UPDATE scope;
    }

    public void finish(Database.BatchableContext BC) {
        System.debug(recordsProcessed + ' records processed. Shazam!');
    }

}