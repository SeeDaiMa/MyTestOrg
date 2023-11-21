public class IconUtils {
    /**
    * @description 
    * @author shihuang.zhou | 06-17-2023 
    * @param sObjectName 对象api名称
    * @return String tab页面的图标的名称
    **/
    public static String getIconName(String sObjectName) {

        String iconName = '';
        
        List<Schema.DescribeTabSetResult> tabSetDesc = Schema.describeTabs();
        List<Schema.DescribeTabResult> tabDesc = new List<Schema.DescribeTabResult>();
        List<Schema.DescribeIconResult> iconDesc = new List<Schema.DescribeIconResult>();

        for (Schema.DescribeTabSetResult tsr : tabSetDesc) {
            // 
            tabDesc.addAll(tsr.getTabs());
        }

        for (Schema.DescribeTabResult tr : tabDesc) {
            if (sObjectName == tr.getSobjectName()) {
                // 是自定义的
                if (tr.isCustom() == true) {
                    iconDesc.addAll(tr.getIcons());
                } else {
                    iconName = 'standard:' + sObjectName.toLowerCase();
                    break;
                }
            }
        }

        for (Schema.DescribeIconResult ir : iconDesc) {
            if (ir.getContentType() == 'image/svg+xml') {
                iconName =
                    'custom:' +
                    ir.getUrl()
                        .substringBetween('custom/', '.svg')
                        // 向前截取
                        .substringBefore('_');
                break;
            }
        }

        return iconName;
    }
}