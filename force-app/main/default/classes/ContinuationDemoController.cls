public with sharing class ContinuationDemoController {
    // Callout endpoint as a named credential URL
    // or, as shown here, as the long-running service URL
    private static final String LONG_RUNNING_SERVICE_URL = 'callout:My_Named_Credential';
        // 'https://th-apex-http-callout.herokuapp.com';

    @TestVisible
    private  static String requestLabel;
    // Action method
    @AuraEnabled(continuation= true)
    public static Object startRequest() {
      // Create continuation. Argument is timeout in seconds.
      Continuation con = new Continuation(40);
      // Set callback method
      con.continuationMethod='processResponse';
      // Set state
      con.state='Hello, World!';
      // Create callout request
      System.debug('con###' + con); 
      // [ContinuationMethod: processResponse, Timeout: 40]
      HttpRequest req = new HttpRequest();
      req.setMethod('GET');
      req.setEndpoint(LONG_RUNNING_SERVICE_URL);
      // Add callout request to continuation
      requestLabel = con.addHttpRequest(req);
      // Return the continuation
      return con;
    }
    
    // Callback method
    @AuraEnabled
    public static Object processResponse(List<String> labels, Object state) {
      System.debug('labels'+labels); // Continuation-1
      System.debug('state'+state); // Hello, World!
      // Get the response by using the unique label
      HttpResponse response = Continuation.getResponse(labels[0]);
      // Set the result variable
      String result = response.getBody();
      result+= 'callout:My_Named_Credential';
      return result;
    }



}