public virtual class ApprovalUtil {




    public static List<Approval.ProcessSubmitRequest> ApprovalUtilHandle(ApprovalFlowInput input){
        List<Approval.ProcessSubmitRequest> approvalProcessList =  new List<Approval.ProcessSubmitRequest>();
        if(input.recordId instanceof String){
          approvalProcessList.add(createApprovalProcess(input,null));
        }else if(input.recordId instanceof List<String>){
          for (String id : (List<String>)input.recordId) {
            approvalProcessList.add(createApprovalProcess(input,id));
          }
        }
        return approvalProcessList;
    }

    private static Approval.ProcessSubmitRequest createApprovalProcess(ApprovalFlowInput input,String id){
          Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
          req1.setComments(input.comment);
          if(String.isNotBlank(id)){
            req1.setObjectId(id);
          }else {
            req1.setObjectId((String)input.recordId);
          }
          // Submit on behalf of a specific submitte
          if(input.isNeedSubmitPerson){
            req1.setSubmitterId(input.submitId); 
          }
          // Submit the record to specific process and skip the criteria evaluation
          // 批准过程的名称
          if(String.isNotBlank(input.ApprovalName)){
            req1.setProcessDefinitionNameOrId(input.ApprovalName);
          }
          if(input.isSkipEntryCriteria){
            req1.setSkipEntryCriteria(input.isSkipEntryCriteria);
          }
          return req1;
    }



    public class flowOutput{
      @InvocableVariable
      public String Msg;
    }
    

    public class ApprovalFlowInput{
      public Object recordId; 
      public string comment; 
      public Boolean isNeedSubmitPerson ;
      public String submitId;
      public String approvalName;
      public Boolean isSkipEntryCriteria;
    }



}