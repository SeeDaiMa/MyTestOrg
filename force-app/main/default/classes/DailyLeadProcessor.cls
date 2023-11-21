public class DailyLeadProcessor implements Schedulable {

    public void execute(SchedulableContext SC) {
        List<Lead> leads =[SELECT id
                          FROM Lead
                          WHERE LeadSource = NULL
                          LIMIT 200];
        if(leads.size()>0){
            for (Lead lead : leads) {
                lead.LeadSource = 'Dreamforce';
            }
            UPDATE leads;
        }
    }

}