import BaseModel from "../BaseModel";

export class catalogCategoryTreeModel extends BaseModel {
    constructor() {
        super();
    }

    async add(catalogCategoryTreeData: any) {
        let addCatalogCategoryTree = await this._executeQuery("insert into catalog_category_tree set ?", [catalogCategoryTreeData]);
        return addCatalogCategoryTree;
    }

    async all(catalogCategoryTreeData:any){
        return await this._executeQuery("select * from catalog_category_tree", [catalogCategoryTreeData]);
    }

    async update(updatedCatalogCategoryTreedata:any,id:number,tenant:number){
        return await this._executeQuery("update catalog_category_tree set ? where id = ? and tenant_id = ?", [updatedCatalogCategoryTreedata,id,tenant]);
    }

    async fetchById(id:number, tenant_id:number){
        return  await this._executeQuery("select * from catalog_category_tree where id = ?",[id,tenant_id] )
        // console.log("model data--->",userResult);

    }

}
