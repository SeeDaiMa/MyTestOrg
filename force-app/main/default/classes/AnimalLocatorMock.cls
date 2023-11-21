@isTest
global class AnimalLocatorMock implements HttpCalloutMock {
    
    String body {get;set;}
    Integer statusCode {get;set;}

    global void setBody (String body){
        this.body = body;
    }

    public void setStatusCode (Integer statusCode){
        this.statusCode = statusCode;
    }

   // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
    // Create a fake response
    HttpResponse response = new HttpResponse();
    response.setHeader('Content-Type', 'application/json');
    response.setBody(body);
    response.setStatusCode(statusCode);
    return response; 
    }



   
}