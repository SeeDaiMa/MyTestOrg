public class StringArrayTest {
    public static List<String> generateStringArray(Integer n){
        List<String> strs = new List<String>();
        for(Integer i=0;i<n;i++){
           strs.add('Test '+i);
        }
        return strs;
    }
}