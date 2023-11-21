public with sharing class NewCaseListController {
    public NewCaseListController() {

    }
    public List<Case> getNewCases(){
         return  [select id,CaseNumber from Case where status = 'New'];
    }
}