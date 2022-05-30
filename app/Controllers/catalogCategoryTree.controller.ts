import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
import  catalogService from '../Services/catalog.service';
import LOGGER from "../config/LOGGER";
import customerService from "../Services/Customer.service";

const add: IController = async (req, res) => {
    let catalogCategoryTree: any;
    try {
        let tenant = req.headers["tenant-id"];
        let status = 1;
        req.body.status = status;
        catalogCategoryTree = await catalogService.addCatalogCategoryTree(req, tenant);
        if (catalogCategoryTree instanceof Error) {
            console.log("Catalog Category Tree", catalogCategoryTree)
            res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

        } else {
            let result= catalogCategoryTree
            res.status(200).json({'status': 200,'Message':" Data added successfully in catalog_category_tree ","Result" : result});
        }
    } catch (e:any) {
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : "Duplicate Entry"});
        }
        else{
            console.log("controller ->", e)
            res.status(400).json({"Status" : 400, "Message" : "Bad Request" })
        }
        return;
    }
};

const all: IController = async (req, res) => {
    catalogService.fetchAllCatalogCategoryTree(req.headers["tenant-id"])
        .then( (catalogCategoryTree) => {
            if(catalogCategoryTree instanceof Error){
                console.log("Catalog Category Tree", catalogCategoryTree.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

            }else{
                res.status(200).json({'status': 200,'Message':" Catalog Category Tree Data ","Result" : catalogCategoryTree});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};

const update : IController = async (req, res) => {
    try {
        let updateCategoryTree = await catalogService.updateCatalogCategoryTree(req);
        if (updateCategoryTree instanceof Error) {
            console.log("Category Catalog Tree", updateCategoryTree)
            res.status(400).json({'Status': 400 ,'Message': "Bad Request"});
        } else {
            res.status(200).json({'status': 200,'Message':" Data updated successfully ","Result" : updateCategoryTree});
        }
    } catch (e) {
        console.log("controller ->", e)
        res.status(400).json({"Status" : 400, "Message" : "Bad Request" })
        return;
    }
};

const getById: IController = async (req, res) => {
    catalogService.catalogCatalogTreeFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (categoryTree) => {
            if(categoryTree instanceof Error){
                console.log("Catalog Category Tree", categoryTree.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request"});
            }else{
                res.status(200).json({'status': 200,'Message':"Catalog Category Tree data ","Result" : categoryTree});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({"Status" : 400, "Message" : "Bad Request" })
    });
};


export default {
    add,
    all,
    update,
    getById
}
