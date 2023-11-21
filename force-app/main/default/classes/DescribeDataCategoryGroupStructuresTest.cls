@isTest
private class DescribeDataCategoryGroupStructuresTest {
   public static testMethod void getDescribeDataCategoryGroupStructureResultsTest(){
      List<Schema.DescribeDataCategoryGroupStructureResult> describeResult =
         DescribeDataCategoryGroupStructures.getDescribeDataCategoryGroupStructureResults();
      
      System.assert(describeResult.size() == 2,
            'The results should only contain 2 results: ' + describeResult.size());
            
      //Creating category info
      CategoryInfo world = new CategoryInfo('World', 'World');
      CategoryInfo asia = new CategoryInfo('Asia', 'Asia');
      CategoryInfo northAmerica = new CategoryInfo('NorthAmerica',
                                                  'North America');
      CategoryInfo southAmerica = new CategoryInfo('SouthAmerica',
                                                  'South America');
      CategoryInfo europe = new CategoryInfo('Europe', 'Europe');
      
      List<CategoryInfo> info = new CategoryInfo[] {
        asia, northAmerica, southAmerica, europe
     };
      
      for (Schema.DescribeDataCategoryGroupStructureResult result : describeResult) {
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
         
         DataCategory [] topLevelCategories = result.getTopCategories();
         System.assert(topLevelCategories.size() == 1,
         'Incorrect number of top level categories returned: ' + topLevelCategories.size());
         System.assert(topLevelCategories[0].getLabel() == world.getLabel() &&
                       topLevelCategories[0].getName() == world.getName());
         
         //checking if the correct children are returned
         DataCategory [] children = topLevelCategories[0].getChildCategories();
         System.assert(children.size() == 4,
         'Incorrect number of children returned: ' + children.size());
         for(Integer i=0; i < children.size(); i++){
            System.assert(children[i].getLabel() == info[i].getLabel() &&
                          children[i].getName() == info[i].getName());
         }
      }
      
   }
   
   private class CategoryInfo {      
      private final String name;
      private final String label;
            
      private CategoryInfo(String n, String l){
         this.name = n;
         this.label = l;
      }
      
      public String getName(){
         return this.name;
      }
      
      public String getLabel(){
         return this.label;
      }
   }
}