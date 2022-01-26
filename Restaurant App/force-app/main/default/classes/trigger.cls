public class OrderTriggerHandler{
    public static void populateTotalPrice(List<Order_Item__c> ordList){
        for (Order_Item__c obj : ordList){
            obj.Total_Price__c = obj.Price_per__c * obj.Quantity__c;
            }
    }
    public static void updateTotalPriceOnMenuOrQuantityChange(List<Order_Item__c> up, Map<id, Order_Item__c> olobj) {        
        for (Order_Item__c nobj : up){   
             	if(nobj.Quantity__c != olobj.get(nobj.id).Quantity__c || nobj.Item__c  != olobj.get(nobj.id).Item__c ){
                    nobj.Total_Price__c = nobj.Price_per__c * nobj.Quantity__c;
                              
                }      
        }
        
    }
    
}
