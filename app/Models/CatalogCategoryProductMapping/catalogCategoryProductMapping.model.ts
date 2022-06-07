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

    async join(data :any){
        return await this._executeQuery("SELECT c.id , c.category_id, c.product_id, c.position, c.status, c.user_id as product_mapping_user_id,c.tenant_id as product_mapping_tenant_id,cp.name as product_name,cp.description as product_description,cp.pack_size as product_product_size,cp.image as product_image,cp.status as product_status, cp.user_id as product_user_id, cp.tenant_id as prouct_id,cs.store_id,cs.sku_id,cs.mrp,cs.cost_price as store_cost_price,cs.selling_price as store_selling_price, cs.status as store_status,cs.user_id as store_user_id,cs.tenant_id as store_tenant_id FROM Catalog.catalog_category_product_mapping c LEFT JOIN Catalog.catalog_product_attributes cp ON c.product_id = cp.id LEFT JOIN Catalog.catalog_store_attributes cs ON c.product_id = cs.product_id where c.id = ?",[data.id]);
    }


}
