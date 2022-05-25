import BaseModel from "../BaseModel";

export class catalogCategoryProductMappingModel extends BaseModel {
    constructor() {
        super();
    }

    async add(categoryProductMappingData: any) {
        let categoryProductMapping = await this._executeQuery("insert into catalog_category_product_mapping set ?", [categoryProductMappingData]);
        return categoryProductMapping;
    }

    async all(catalogAttributes:any){
        return await this._executeQuery("select * from catalog_category_product_mapping", [catalogAttributes]);
    }

    async fetchById(id:number, tenant_id:number){
        return  await this._executeQuery("select * from catalog_category_product_mapping where id = ?",[id,tenant_id] )

    }

    async update(data:any){
        return await this._executeQuery("update catalog_category_product_mapping set ? where id = ? and tenant_id = ?", [data, data.id,data.tenant_id]);
    }



}
