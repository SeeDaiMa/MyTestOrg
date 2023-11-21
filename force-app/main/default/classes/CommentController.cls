public with sharing class CommentController {
    @AuraEnabled
    public  static List<Comment> getCaseComment(String recordId){
        
        List<Comment> caseComments = new List<Comment>();
        for (CaseComment comment : [select id,CreatedBy.Name,CreatedDate,CommentBody 
                                    from CaseComment  
                                    where ParentId = :recordId]) {
            Comment c = new Comment();
            c.id = comment.id;
            c.UserName = comment.CreatedBy.Name;
            c.CreatedDate = comment.CreatedDate;
            c.CommentBody = comment.CommentBody;
            caseComments.add(c);
        }
        return caseComments;
    }

    public class Comment{
        @AuraEnabled
        public Id id{get;set;}
        @AuraEnabled
        public Datetime CreatedDate{get;set;}
        @AuraEnabled
        public String UserName{get;set;}
        @AuraEnabled
        public String CommentBody{get;set;}
    }

}