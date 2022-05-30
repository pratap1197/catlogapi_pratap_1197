import BaseModel from "../BaseModel";

export class catalogStoreAttributeModel extends BaseModel {
    constructor() {
        super();
    }

    async add(catalogStoreAttributesData: any) {
        let addCatalogStoreAttribute = await this._executeQuery("insert into catalog_store_attributes set ?", [catalogStoreAttributesData]);
        return addCatalogStoreAttribute;
    }

    async update(data:any){
        return await this._executeQuery("update catalog_store_attributes set ? where id = ? and tenant_id = ?", [data, data.id,data.tenant_id]);
    }

    async all(catalogProductAttributeData:any){
        return await this._executeQuery("select * from catalog_store_attributes", [catalogProductAttributeData]);
    }
    async fetchById(id:number, tenant_id:number){
        return  await this._executeQuery("select * from catalog_store_attributes where id = ?",[id,tenant_id] )
        // console.log("model data--->",userResult);

    }


}
