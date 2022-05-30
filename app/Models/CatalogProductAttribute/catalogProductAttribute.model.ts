import BaseModel from "../BaseModel";

export class catalogProductAttributeModel extends BaseModel {
    constructor() {
        super();
    }

    async add(catalogProductAttributesData: any) {
        let addCatalogProductAttribute = await this._executeQuery("insert into catalog_product_attributes set ?", [catalogProductAttributesData]);
        return addCatalogProductAttribute;
    }
    async all(catalogProductAttributeData:any){
        return await this._executeQuery("select * from catalog_product_attributes", [catalogProductAttributeData]);
    }

    async update(updatedCatalogProductAttributeData:any,id:number,tenant:number){
        return await this._executeQuery("update catalog_product_attributes set ? where id = ? and tenant_id = ?", [updatedCatalogProductAttributeData,id,tenant]);
    }

    async getById(id:number, tenant_id:number){
        return  await this._executeQuery("select * from catalog_product_attributes where id = ?",[id,tenant_id] )
        // console.log("model data--->",userResult);

    }



}
