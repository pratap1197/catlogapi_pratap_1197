import LOGGER from "../config/LOGGER";
import {CustomerModel} from "../Models/Customer/Customer.model";
import moment from 'moment';
import * as path from "path";
import * as fs from "fs";
const {v4 : uuidv4} = require('uuid');
import formidable from "formidable";
import {uploadFile}  from "../utilities/s3FileStore";
import Hashing from "../utilities/Hashing";
import Encryption from "../utilities/Encryption";
import {catalogAttributesModel} from "../Models/CatalogAttributes/catalogAttributes.model";
import {catalogStoreAttributeModel} from "../Models/CatalogStoreAttributes/catalogStoreAttributes.model";
import {catalogAttributeValueModel} from "../Models/CatalogAttributeValue/catalogAttributeValue.model";
import {catalogCustomAttributesModel} from "../Models/CatalogCustomAttributes/catalogCustomAttributes.model";
import {catalogCategoryProductMappingModel} from "../Models/CatalogCategoryProductMapping/catalogCategoryProductMapping.model";
import {catalogCategoryTreeModel} from "../Models/CatalogCategoryTree/catalogCategoryTree.model";
import {catalogProductAttributeModel} from "../Models/CatalogProductAttribute/catalogProductAttribute.model";
import {UserModel} from "../Models/User/User.model";


let config = require("../config");

const addCatalogAttribute = async (data : any) => {
    let catalogAttribute = await new catalogAttributesModel().add(data);
    return data;
};

const addCatalogCustomAttribute = async (data : any) => {
    let CatalogStoreAttribute = await new catalogCustomAttributesModel().add(data);
    return data;
};


const addCatalogStoreAttribute = async (data : any) => {
    let CatalogStoreAttribute = await new catalogStoreAttributeModel().add(data);
    return data;
};

const addCatalogAttributeValue = async (data : any) => {
    let CatalogAttributeValue = await new catalogAttributeValueModel().add(data);
    return data;
};


const addCategoryProductMapping= async (data : any) => {
    let categoryProductMapping = await new catalogCategoryProductMappingModel().add(data);
    console.log("Catalog Category Product Mapping Data->>>>", categoryProductMapping);
    return data;
};

const addCatalogCategoryTree = async (req:any,tenant:any) =>{
    try{
        let catalogCategoryTreeData, fields, s3Path;
        let response = await processForm(req);
        if(response instanceof Error) throw response;
        // @ts-ignore
        fields = response.fields;
        // @ts-ignore
        s3Path = response.s3Path;
        console.log("response", response);
        let catalogTree:any = {};
        if(fields.name == undefined || fields.name == null || fields.name == "") throw new Error("Name is required");
        catalogTree.name=fields.name;
        if(fields.parent_id == undefined || fields.parent_id == null) throw new Error("Parent_id is  required");
        catalogTree.parent_id=fields.parent_id;
        if(fields.position == undefined || fields.position == null) throw new Error("Position is required");
        catalogTree.position=fields.position;
        if(fields.status == undefined || fields.status == null) throw new Error("Status is required");
        catalogTree.status=fields.status;
        if(tenant == undefined || tenant == null || tenant == "") throw new Error("Tenant id is  required");
        catalogTree.tenant_id=tenant;
        if(s3Path.image == undefined || s3Path.image == null || s3Path.image == "") throw new Error("Image is required");
        catalogTree.image=s3Path.image;

        let catalogCategoryTree = await new catalogCategoryTreeModel().add(catalogTree)
        return catalogTree;

    }catch(e){
        console.log("Exception ->", e);
        throw e;
    }
}

const fetchAllCatalogCategoryTree = async (tenant_id : any) =>{
    let catalogCatalogTreeData;
    catalogCatalogTreeData = await new catalogCategoryTreeModel().all(tenant_id)
    if (catalogCatalogTreeData == null) throw new Error("No Records");
    for(let i=0;i< catalogCatalogTreeData.length;i++) {
        catalogCatalogTreeData[i].image= config.baseUrl + "/" + catalogCatalogTreeData[i].image;
    }
    return catalogCatalogTreeData;
}

const updateCatalogCategoryTree = async (req:any) =>{
    try{
        let updatedCatalogCategoryTree, fields, s3Path
        let updatedResponse = await  processForm(req);
        if(updatedResponse instanceof Error) throw updatedResponse;
        // @ts-ignore
        fields = updatedResponse.fields;
        // @ts-ignore
        s3Path = updatedResponse.s3Path;
        // @ts-ignore
        let tenant = req.headers["tenant-id"];
        let id=Number(fields.id);
        let updatedCatalogCategory : any = {};

        if(fields.name !== undefined && fields.name !== null && fields.name !== "") updatedCatalogCategory.name=fields.name;

        if(fields.parent_id !== undefined && fields.parent_id !== null  && fields.mobile !== "") updatedCatalogCategory.parent_id=fields.parent_id;

        if(fields.position !== undefined && fields.position !== null  && fields.mobile !== "") updatedCatalogCategory.position=fields.position;

        if(fields.status !== undefined && fields.status !== null && fields.status !== "") updatedCatalogCategory.status=fields.status;

        if(s3Path !== undefined && s3Path !== null && s3Path!== "") updatedCatalogCategory.image = s3Path.image;
        updatedCatalogCategoryTree = await new catalogCategoryTreeModel().update(updatedCatalogCategory,id,tenant)
        if (!updatedCatalogCategoryTree) throw new Error("Update Catalog category tree failed");
        return updatedCatalogCategoryTree;
    }catch(e){
        console.log("Exception ->", e);
        throw e;
    }
}

const addCatalogProductAttribute = async (req:any,tenant:any) =>{
    try{
        let catalogProductAttributeData, fields, s3Path;
        console.log("Tenant-id", tenant)
        let response = await processForm(req);
        if(response instanceof Error) throw response;
        // @ts-ignore
        fields = response.fields;
        console.log("Fields--->", fields)
        // @ts-ignore
        s3Path = response.s3Path;
        console.log("response", response);
        let catalogProduct:any = {};
        if(fields.id == undefined || fields.id == null) throw new Error("id required");
        catalogProduct.id=fields.id;
        if(fields.name == undefined || fields.name == null || fields.name == "") throw new Error("name required");
        catalogProduct.name=fields.name;
        if(fields.user_id == undefined || fields.user_id == null || fields.user_id == "") throw new Error("User Id is required");
        catalogProduct.user_id=fields.user_id;
        if(tenant == undefined || tenant == null || tenant == "") throw new Error("Tenant is required");
        catalogProduct.tenant_id=tenant;
        if(fields.description == undefined || fields.description == null || fields.description == "") throw new Error("description required");
        catalogProduct.description=fields.description;
        if(fields.pack_size == undefined || fields.pack_size == null || fields.pack_size =="") throw new Error("position required");
        catalogProduct.pack_size=fields.pack_size;
        if(fields.status == undefined || fields.status == null) throw new Error("status is required");
        catalogProduct.status=fields.status;

        if(s3Path.image == undefined || s3Path.image == null || s3Path.image == "") throw new Error("img required");
        catalogProduct.image=s3Path.image;

        let catalogProductAttribute = await new catalogProductAttributeModel().add(catalogProduct)
        return catalogProduct;
    }catch(e){
        console.log("Exception ->", e);
        throw e;
    }
}

const fetchAllCatalogProductAttribute = async (tenant_id : any) =>{
    let catalogProductAttributeData;
    catalogProductAttributeData = await new catalogProductAttributeModel().all(tenant_id)
    if (catalogProductAttributeData == null) throw new Error("No Records");
    for(let i=0;i< catalogProductAttributeData.length;i++) {
        catalogProductAttributeData[i].image= config.baseUrl + "/" + catalogProductAttributeData[i].image;
    }
    return catalogProductAttributeData;
}

const updateCatalogProductAttribute = async (req:any) =>{
    try{
        let updatedCatalogCategoryTree, fields, s3Path
        let updatedResponse = await  processForm(req);
        if(updatedResponse instanceof Error) throw updatedResponse;
        // @ts-ignore
        fields = updatedResponse.fields;
        // @ts-ignore
        s3Path = updatedResponse.s3Path;
        // @ts-ignore
        console.log("updatedResponse", updatedResponse);
        let tenant = req.headers["tenant-id"];
        let id=Number(fields.id);
        let updatedCatalogProduct : any = {};

        if(fields.name !== undefined && fields.name !== null && fields.name !== "") updatedCatalogProduct.name=fields.name;

        if(fields.description !== undefined && fields.description !== null  && fields.description !== "") updatedCatalogProduct.description=fields.description;

        if(fields.pack_size !== undefined && fields.pack_size !== null  && fields.pack_size !== "") updatedCatalogProduct.pack_size=fields.pack_size;

        if(fields.status !== undefined && fields.status !== null && fields.status !== "") updatedCatalogProduct.status=fields.status;

        if(s3Path !== undefined && s3Path !== null && s3Path!== "") updatedCatalogProduct.image = s3Path.image;
        console.log("s3 path at service----->",s3Path.image)
        updatedCatalogCategoryTree = await new catalogProductAttributeModel().update(updatedCatalogProduct,id,tenant)
        if (!updatedCatalogCategoryTree) throw new Error("Update Failed");
        return updatedCatalogCategoryTree;
    }catch(e){
        console.log("Exception ->", e);
        throw e;
    }
}

const updateCatalogStoreAttributes = async (data:any) => {
    try {
        console.log("In Service")
        let updateCatalogStoreAttributes = await new catalogStoreAttributeModel().update(data);
        if (updateCatalogStoreAttributes.length == 0) throw new Error("User did not update");
        return updateCatalogStoreAttributes;
    }
    catch (e){
        return e;
    }
}

const updateCatalogAttributes = async (data:any) => {
    try {
        let catalogAttribute = await new catalogAttributesModel().update(data);
        if (catalogAttribute.length == 0) throw new Error("Record doesn't match to update");
        return catalogAttribute;
    }
    catch (e){
        return e;
    }
}

const fetchAllCatalogStoreAttribute = async (tenant_id : any) =>{
    let catalogStoreAttributeData;
    catalogStoreAttributeData = await new catalogStoreAttributeModel().all(tenant_id)
    if (catalogStoreAttributeData == null) throw new Error("details did not match");
    return catalogStoreAttributeData;
}

const catalogProductFetchById = async (id: number, tenant_id: number) => {
    try {
        let catalogProductAttribute = await new catalogProductAttributeModel().getById(id, tenant_id);
        if (catalogProductAttribute.length == 0) throw new Error("No Record found");
        // console.log("customer----->",customer);
        return catalogProductAttribute[0];
    }
    catch (e){
        throw e;
    }
}

const catalogStoreFetchById = async (id: number, tenant_id: number) => {
    try {
        let catalogStore = await new catalogStoreAttributeModel().fetchById(id, tenant_id);
        if (catalogStore.length == 0) throw new Error("No Record Found");
        // console.log("customer----->",customer);
        return catalogStore[0];
    }
    catch (e){
        throw e;
    }
}

const updateCatalogCustomAttributes = async (data:any) => {
    try {
        let updateCatalogCustomAttributes = await new catalogCustomAttributesModel().update(data);
        if (updateCatalogCustomAttributes.length == 0) throw new Error("Update Failed");
        return updateCatalogCustomAttributes;
    }
    catch (e){
        return e;
    }
}

const fetchAllCatalogAttributes = async (tenant_id : any) =>{
    let catalogAttribute;
    catalogAttribute = await new catalogAttributesModel().all(tenant_id)
    if (catalogAttribute == null) throw new Error("No Records");
    return catalogAttribute;
}

const catalogAttributesFetchById = async (id: number, tenant_id: number) => {
    try {
        let catalogAttribute = await new catalogAttributesModel().getById(id, tenant_id);
        if (catalogAttribute.length == 0) throw new Error("No record found");
        // console.log("customer----->",customer);
        return catalogAttribute[0];
    }
    catch (e){
        throw e;
    }
}

const fetchAllCatalogAttributesValues = async (tenant_id : any) =>{
    let catalogAttributeValue;
    catalogAttributeValue = await new catalogAttributeValueModel().all(tenant_id)
    if (catalogAttributeValue == null) throw new Error("No Records found");
    return catalogAttributeValue;
}

const updateCatalogAttributesValues = async (data:any) => {
    try {
        let updateCatalogAttributesValues = await new catalogAttributeValueModel().update(data);
        if (updateCatalogAttributesValues.length == 0) throw new Error("Record doesn't match to update");
        return updateCatalogAttributesValues;
    }
    catch (e){
        return e;
    }
}
const catalogAttributesValuesFetchById = async (id: number, tenant_id: number) => {
    try {
        let catalogAttributeValue = await new catalogAttributeValueModel().getById(id, tenant_id);
        if (catalogAttributeValue.length == 0) throw new Error("No Record Found");
        return catalogAttributeValue[0];
    }
    catch (e){
        throw e;
    }
}

const fetchAllCategoryProductMapping = async (tenant_id : any) =>{
    let categoryProductMapping;
    categoryProductMapping = await new catalogCategoryProductMappingModel().all(tenant_id)
    if (categoryProductMapping == null) throw new Error("No Records");
    return categoryProductMapping;
}

const categoryProductMappingFetchById = async (id: number, tenant_id: number) => {
    try {
        let categoryProductMapping = await new catalogCategoryProductMappingModel().fetchById(id, tenant_id);
        if (categoryProductMapping.length == 0) throw new Error("No User found");
        return categoryProductMapping[0];
    }
    catch (e){
        throw e;
    }
}

const updateCategoryProductMapping = async (data:any) => {
    try {
        let categoryProductMapping = await new catalogCategoryProductMappingModel().update(data);
        if (categoryProductMapping.length == 0) throw new Error("User did not update");
        return categoryProductMapping;
    }
    catch (e){
        return e;
    }
}

const catalogCatalogTreeFetchById = async (id: number, tenant_id: number) => {
    try {
        let catalogCatalogTreeData = await new catalogCategoryTreeModel().fetchById(id, tenant_id);
        if (catalogCatalogTreeData.length == 0) throw new Error("No User found");
        for(let i=0;i< catalogCatalogTreeData.length;i++) {
            catalogCatalogTreeData[i].image= config.baseUrl + "/" + catalogCatalogTreeData[i].image;
        }
        // console.log("customer----->",customer);
        return catalogCatalogTreeData[0];
    }
    catch (e){
        throw e;
    }
}

const fetchAllCatalogCustomAttributes = async (tenant_id : any) =>{
    let catalogCustomAttribute;
    catalogCustomAttribute = await new catalogCustomAttributesModel().all(tenant_id)
    if (catalogCustomAttribute == null) throw new Error("No Records");
    return catalogCustomAttribute;
}

const catalogCustomAttributesFetchById = async (id: number, tenant_id: number) => {
    try {
        let customAttribute = await new catalogCustomAttributesModel().getById(id, tenant_id);
        if (customAttribute.length == 0) throw new Error("No Record Found");
        return customAttribute[0];
    }
    catch (e){
        throw e;
    }
}


const processForm = async(req : any) => {
    let s3Path:any = {};
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req, async (err: any, fields: any, files: any) => {
            try {
                const images:any = Object.keys(files)
                console.log("Key value of images----->",images);
                if (images.length == 0) resolve({fields: fields, s3Path: s3Path});
                for (let i = 0; i < images.length; i++) {
                    // upload file to s3Bucket
                    let name : string = "images/"+images[i]+"/"+  moment().unix() + "."+ files[images[i]].originalFilename.split(".").pop()
                    const result = await uploadFile(files[images[i]], name);
                    if (result == 0 && result == undefined) throw new Error("file upload to s3 failed");
                    console.log(images[i])
                    s3Path[images[i]] = result.key;
                }
                console.log(s3Path)
                resolve({fields: fields, s3Path: s3Path});
            }catch(e)
            {
                throw e
            }
        });
    });
}

export default {
    addCatalogAttribute,
    addCatalogStoreAttribute,
    addCatalogAttributeValue,
    addCategoryProductMapping,
    addCatalogCategoryTree,
    addCatalogProductAttribute,
    fetchAllCatalogCategoryTree,
    updateCatalogCategoryTree,
    fetchAllCatalogProductAttribute,
    updateCatalogProductAttribute,
    updateCatalogStoreAttributes,
    updateCatalogAttributes,
    fetchAllCatalogStoreAttribute,
    catalogProductFetchById,
    catalogStoreFetchById,
    updateCatalogCustomAttributes,
    fetchAllCatalogAttributes,
    catalogAttributesFetchById,
    fetchAllCatalogAttributesValues,
    updateCatalogAttributesValues,
    catalogAttributesValuesFetchById,
    fetchAllCategoryProductMapping,
    categoryProductMappingFetchById,
    updateCategoryProductMapping,
    catalogCatalogTreeFetchById,
    fetchAllCatalogCustomAttributes,
    catalogCustomAttributesFetchById,
    addCatalogCustomAttribute
}
