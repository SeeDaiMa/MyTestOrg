@isTest
private class DescribeDataCategoryGroupSampleTest {
   public static testMethod void describeDataCategoryGroupSampleTest(){
      List<DescribeDataCategoryGroupResult>describeResult =
                 DescribeDataCategoryGroupSample.describeDataCategoryGroupSample();
      
      //Assuming that you have KnowledgeArticleVersion and Questions
      //associated with only one category group 'Regions'.
      System.assert(describeResult.size() == 2,
           'The results should only contain two results: ' + describeResult.size());
      
      for(DescribeDataCategoryGroupResult result : describeResult) {
         //Storing the results
         String name = result.getName();
         String label = result.getLabel();
         String description = result.getDescription();
         String objectNames = result.getSobject();
         
         //asserting the values to make sure
         System.assert(name == 'Regions',
         'Incorrect name was returned: ' + name);
         System.assert(label == 'Regions of the World',
         'Incorrect label was returned: ' + label);
         System.assert(description == 'This is the category group for all the regions',
         'Incorrect description was returned: ' + description);
         System.assert(objectNames.contains('KnowledgeArticleVersion') 
                       || objectNames.contains('Question'),
                       'Incorrect sObject was returned: ' + objectNames);
      }
   }
}