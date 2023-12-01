public with sharing class ApprovalTest extends SingleApprovalUtil {



    @InvocableMethod(label='Test批准过程') 
    public static List<flowOutput> testApproval(List<flowInput> inputs){
        return SingleApprovalUtilHandle(inputs);


    }


    

    



}