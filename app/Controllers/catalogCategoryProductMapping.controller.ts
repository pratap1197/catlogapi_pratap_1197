import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
const catalogService = require('../Services/catalog.service')

import LOGGER from "../config/LOGGER";

const add: IController = async (req, res) => {
    let catalogCategoryProductMapping;
    try {
        let status = 1;
        let tenant= req.headers["tenant-id"];
        req.body.tenant_id = tenant;
        req.body.status = status;
        catalogCategoryProductMapping = await catalogService.addCategoryProductMapping(req.body);
    } catch (e) {
        console.log(e)
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : "Duplicate Entry"});
            return;
        }
    }
    if (catalogCategoryProductMapping) {
        res.status(200).json({'Status': 200 ,'Message':" Data added successfully in Category Product Mapping.", "Result" : catalogCategoryProductMapping});
    } else {
        LOGGER.info("error" , catalogCategoryProductMapping)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});
    }
};

const all: IController = async (req, res) => {
    catalogService.fetchAllCategoryProductMapping(req.headers["tenant-id"])
        .then( (categoryProductMapping : any) => {
            if(categoryProductMapping instanceof Error){
                console.log("Catalog Category Product Mapping", categoryProductMapping.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : categoryProductMapping.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message': "Catalog Category Product Mapping data", "Result" : categoryProductMapping});
            }
        }).catch((err: any) => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};

const fetchById: IController = async (req, res) => {
    catalogService.categoryProductMappingFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (catalogProductMapping : any) => {
            if(catalogProductMapping instanceof Error){
                console.log("Catalog Category Product Mapping", catalogProductMapping.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogProductMapping.message});
            }else{
                apiResponse.result(res, catalogProductMapping, httpStatusCodes.OK);
            }
        }).catch((err: any) => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};

const update: IController = async (req, res) => {
    req.body.tenant_id = req.headers["tenant-id"]
    catalogService.updateCategoryProductMapping(req.body)
        .then( (categoryProductMapping : any) => {
            if(categoryProductMapping instanceof Error){
                console.log("Catalog Category Product Mapping", categoryProductMapping.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : categoryProductMapping.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message':" Data updated successfully","Result" : categoryProductMapping });
            }
        }).catch((err: any) => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message':"Bad Request" });

    });
};


export default {
    add,
    all,
    fetchById,
    update
};
