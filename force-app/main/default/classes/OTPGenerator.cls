public class OTPGenerator implements Process.Plugin {    
    public Process.PluginResult invoke(Process.PluginRequest request){   
        Map<String, Object> result = new Map<String, Object>();  
        String randomIntegerString = string.valueof(Math.abs(Crypto.getRandomInteger()));
        String otp = randomIntegerString.substring(0,6);
        result.put('OTP', otp);
        return new Process.PluginResult(result);
    }

    public Process.PluginDescribeResult describe() {
        Process.PluginDescribeResult result = new Process.PluginDescribeResult();
        result.description = 'This plug-in generates a radnom 6-digits code';
        result.tag = 'Identity';
        result.inputParameters = new List<Process.PluginDescribeResult.InputParameter> {};
        result.outputParameters = new List<Process.PluginDescribeResult.OutputParameter> {
            new Process.PluginDescribeResult.OutputParameter('OTP',
            Process.PluginDescribeResult.ParameterType.STRING)
        };  
        return result;
    }
}