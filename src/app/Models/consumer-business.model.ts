export interface ConsumerBusinessModel {
    businessId: number;
    businessName: string;
    businessType: string;
    totalEmployees: number;
    businessMasterId: number;
    consumerId: number;
    "businessMaster": {
      businessMasterId: number;
      businessValue: number;
      businessTurnOver: number;
      capitalInvest: number;
    }
}
