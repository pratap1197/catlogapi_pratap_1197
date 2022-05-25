import BaseModel from "../BaseModel";

export class catalogCustomAttributesModel extends BaseModel {
    constructor() {
        super();
    }

    async add(catalogStoreAttributesData: any) {
        let addCatalogStoreAttribute = await this._executeQuery("insert into catalog_custom_attributes set ?", [catalogStoreAttributesData]);
        return addCatalogStoreAttribute;
    }


    async update(data:any){
        return await this._executeQuery("update catalog_custom_attributes set ? where id = ? and tenant_id = ?", [data, data.id,data.tenant_id]);
    }

    async all(catalogAttributes:any){
        return await this._executeQuery("select * from catalog_custom_attributes", [catalogAttributes]);
    }

    async getById(id:number, tenant_id:number){
        return  await this._executeQuery("select * from catalog_custom_attributes where id = ?",[id,tenant_id] )
        // console.log("model data--->",userResult);

    }



}
