import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
import LOGGER from "../config/LOGGER";
import  catalogService from '../Services/catalog.service';
import userService from "../Services/User.service";



const add: IController = async (req, res) => {
    let catalogStoreAttribute;
    try {
        let status = 1;
        let tenant= req.headers["tenant-id"];
        req.body.tenant_id = tenant;
        req.body.status = status;
        catalogStoreAttribute = await catalogService.addCatalogStoreAttribute(req.body);
    } catch (e) {
        console.log(e)
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            // @ts-ignore
            res.status(400).json({'Status': 400 ,'Message':" Duplicate Entry"});
            return;
        }
    }
    if (catalogStoreAttribute) {
        res.status(200).json({'Status': 200 ,'Message':"Data added successfully in Catalog Store Attribute", "Result" : catalogStoreAttribute});
    } else {
        LOGGER.info("error" , catalogStoreAttribute)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});
    }
};

const update: IController = async (req, res) => {
    req.body.tenant_id = req.headers["tenant-id"]
    catalogService.updateCatalogStoreAttributes(req.body)
        .then( (catalogStoreAttribute) => {
            if(catalogStoreAttribute instanceof Error){
                console.log("Catalog Store Attribute", catalogStoreAttribute.message)
                res.status(400).json({'Status': 400 ,'Message':" Bad Request", "Result" : catalogStoreAttribute.message});
            }else{
                res.status(200).json({'Status': 200 ,'Message':"Data updated successfully", "Result" : catalogStoreAttribute});
            }
        }).catch(err => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request"});
    });
};

const all: IController = async (req, res) => {
    catalogService.fetchAllCatalogStoreAttribute(req.headers["tenant-id"])
        .then( (catalogStoreAttribute) => {
            if(catalogStoreAttribute instanceof Error){
                console.log("Catalog Store Attribute", catalogStoreAttribute.message)
                res.status(400).json({'Status': 400 ,'Message':" Bad Request", "Result" : catalogStoreAttribute.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message':"Catalog Store Attributes Data", "Result" : catalogStoreAttribute});
            }
        }).catch(err => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request"});

    });
};

const getById: IController = async (req, res) => {
    catalogService.catalogStoreFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (catalogStoreAttribute) => {
            if(catalogStoreAttribute instanceof Error){
                console.log("Catalog Store Attribute", catalogStoreAttribute.message)
                res.status(400).json({'Status': 400 ,'Message':" Bad Request", "Result" : catalogStoreAttribute.message});
            }else{
                res.status(200).json({'Status': 200 ,'Message':"Catalog Store Attributes Data", "Result" : catalogStoreAttribute});
            }
        }).catch(err => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request"});

    });
};




export default {
    add,
    update,
    all,
    getById
};
