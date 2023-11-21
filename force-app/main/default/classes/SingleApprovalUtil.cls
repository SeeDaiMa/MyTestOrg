public virtual class SingleApprovalUtil extends ApprovalUtil {


    public static List<flowOutput> SingleApprovalUtilHandle(List<flowInput> inputs){
        List<flowOutput> fpList = new List<flowOutput>();
        flowOutput fp = new flowOutput();
        if(inputs.isEmpty()){
          fp.Msg = 'input is null';
        }
        fp.Msg = handleApprovalProcess(inputs.get(0));
        fpList.add(fp);
        return fpList;
    }

    private static String handleApprovalProcess(flowInput input){
        if(input == null){
            return 'input is null';
        }
        // Create an approval request for the account
        ApprovalFlowInput afi =  new ApprovalFlowInput();
        afi.recordId = input.recordId;
        afi.comment = input.comment;
        afi.isNeedSubmitPerson = input.isNeedSubmitPerson;
        afi.submitId = input.submitId;
        afi.approvalName = input.approvalName;
        afi.isSkipEntryCriteria = input.isSkipEntryCriteria;
        Approval.ProcessSubmitRequest req1 = ApprovalUtilHandle(afi).get(0);
        // Submit the approval request for the account
        try {
          Approval.ProcessResult result = Approval.process(req1);
          if(!result.isSuccess()){
            return result.getErrors().toString();
          }
          return 'success';
        } catch (Exception e) { 
          return e.getMessage();
        }
    }

    public class flowInput{
        @InvocableVariable(label='recordId' description='submit object id' required = true)
        public string recordId; 

        @InvocableVariable(label='comment' description='submit comment' required = false)
        public string comment; 

        @InvocableVariable(label='isNeedSubmitPerson' description='Whether to specify the submitter, the default is not specified' required = false)
        public Boolean isNeedSubmitPerson = false;

        @InvocableVariable(label='submitId' description='if specify the submitter,Please fill in the submitter' required = false)
        public String submitId;

        @InvocableVariable(label='approvalName' description='specify the approval process' required = false)
        public String approvalName;

        @InvocableVariable(label='isSkipEntryCriteria' description='Whether skip Entry Criteria, the default is false' required = false)
        public Boolean isSkipEntryCriteria = false;
        
    }

}