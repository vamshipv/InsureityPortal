export interface BusinessPropertyModel {
    propertyId: number;
    buildingType: string;
    buildingStoreys: number;
    buildingAge: number;
    businessId: number;
    propertyMasterId: number;
    propertyMaster: {
      propertyMasterId: number;
      costOfAssest: number;
      salvageValue: number;
      usefulLifeOfAssest: number;
      propertyValue: number;
    }
}
