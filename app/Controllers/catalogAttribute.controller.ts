import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
const catalogService = require('../Services/catalog.service')

import LOGGER from "../config/LOGGER";

const add: IController = async (req, res) =>  {
    let catalogAttribute;
    try {
        let status=1;
        let tenant= req.headers["tenant-id"];
        req.body.tenant_id = tenant;
        req.body.status = status;
        catalogAttribute = await catalogService.addCatalogAttribute(req.body);
    } catch (e) {
        console.log(e)
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            res.status(400).json({'Status': 400 ,'Message':" Bad Request", "Result" : "Duplicate Data"});
            return;
        }
    }
    if (catalogAttribute) {
        let result = catalogAttribute
        res.status(200).json({'Status': 200 ,'Message':" Data added successfully added in Catalog Attributes.", "Result" : result });
    } else {
        LOGGER.info("error" , catalogAttribute)
        apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
};

const update: IController = async (req, res) => {
     req.body.tenant_id = req.headers["tenant-id"]
    catalogService.updateCatalogAttributes(req.body)
        .then((catalogAttribute: any) => {
            if(catalogAttribute instanceof Error){
                LOGGER.error(catalogAttribute.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttribute.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message':"Catalog Attributes updated successfully" });
            }
        }).catch(() => {
        res.status(400).json({'Status': 400 ,'Message':"Catalog Attributes update Failed" });

    });
};

const all: IController = async (req, res) => {
    catalogService.fetchAllCatalogAttributes(req.headers["tenant-id"])
        .then( (catalogAttribute: any) => {
            if(catalogAttribute instanceof Error){
                console.log("User 2", catalogAttribute.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttribute.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message': "Catalog Attributes data", "Result" : catalogAttribute});
            }
        }).catch((err: any) => {
            LOGGER.error(err)
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};

const getById: IController = async (req, res) => {
    catalogService.catalogAttributesFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (catalogAttribute: any) => {
            if(catalogAttribute instanceof Error){
                LOGGER.error(catalogAttribute.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttribute.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message': "Catalog Attributes data", "Result" : catalogAttribute});
            }
        }).catch((err: any) => {
            LOGGER.error(err)
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};


export default {
    add,
    update,
    all,
    getById
};
