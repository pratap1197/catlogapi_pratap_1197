import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
import  catalogService from '../Services/catalog.service';

import LOGGER from "../config/LOGGER";

const add: IController = async (req, res) => {
    let catalogCustomAttribute;
    try {
        let status = 1;
        let tenant= req.headers["tenant-id"];
        req.body.tenant_id = tenant;
        req.body.status = status;
        catalogCustomAttribute = await catalogService.addCatalogCustomAttribute(req.body);
    } catch (e) {
        console.log(e)
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            // @ts-ignore
            res.status(400).json({'Status': 400 ,'Message':" Duplicate Entry"});
            return;
        }
    }
    if (catalogCustomAttribute) {
        res.status(200).json({'Status': 200 ,'Message':"Data added successfully in Catalog Custom Attribute", "Result" : catalogCustomAttribute});
    } else {
        LOGGER.info("error" , catalogCustomAttribute)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});
    }
};


const update: IController = async (req, res) => {
     req.body.tenant_id = req.headers["tenant-id"]
    catalogService.updateCatalogCustomAttributes(req.body)
        .then( (updateCustomAttributes) => {
            if(updateCustomAttributes instanceof Error){
                res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : updateCustomAttributes.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message':" Data updated successfully.", "Result" : updateCustomAttributes});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});

    });
};

const all: IController = async (req, res) => {
    catalogService.fetchAllCatalogCustomAttributes(req.headers["tenant-id"])
        .then( (catalogAttributes) => {
            if(catalogAttributes instanceof Error){
                console.log("Catalog Custom Attributes", catalogAttributes.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttributes.message});

            }else{
                console.log("User 3", catalogAttributes)
                res.status(200).json({'Status': 200 ,'Message': "Catalog Custom Attributes data", "Result" : catalogAttributes});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};

const getById: IController = async (req, res) => {
    catalogService.catalogCustomAttributesFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (catalogCustomAttribute) => {
            if(catalogCustomAttribute instanceof Error){
                console.log("Catalog Custom Attributes", catalogCustomAttribute.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

            }else{
                res.status(200).json({'Status': 200 ,'Message': "Catalog Custom Attributes data", "Result" : catalogCustomAttribute});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};



export default {
    add,
    update,
    all,
    getById,

};
