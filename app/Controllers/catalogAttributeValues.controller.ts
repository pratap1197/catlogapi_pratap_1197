import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
import LOGGER from "../config/LOGGER";
import  catalogService from '../Services/catalog.service';



const add: IController = async (req, res) => {
    let catalogAttributeValue;
    try {
        let status = 1
        let tenant= req.headers["tenant-id"];
        console.log("tenant", tenant)
        req.body.tenant_id = tenant;
        req.body.status = status;
        catalogAttributeValue = await catalogService.addCatalogAttributeValue(req.body);
    } catch (e) {
        console.log(e)
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : "Duplicate Entry"});

            return;
        }
    }
    if (catalogAttributeValue) {
        res.status(200).json({'Status': 200 ,'Message':" Data added successfully in Catalog Attribute Values.","Result" : catalogAttributeValue });
    } else {
        LOGGER.info("error" , catalogAttributeValue)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});
    }
};

const all: IController = async (req, res) =>{
    catalogService.fetchAllCatalogAttributesValues(req.headers["tenant-id"])
        .then( (catalogAttributeValues) => {
            if(catalogAttributeValues instanceof Error){
                console.log("Catalog Attribute Value", catalogAttributeValues.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttributeValues.message});

            }else{
                console.log("Catalog Attribute Value", catalogAttributeValues)
                res.status(200).json({'Status': 200 ,'Message': "Catalog Attribute Value data", "Result" : catalogAttributeValues});
            }
        }).catch(err => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};

const update: IController = async (req, res) => {
    req.body.tenant_id = req.headers["tenant-id"]
    catalogService.updateCatalogAttributesValues(req.body)
        .then((catalogAttributeValues) => {
            if(catalogAttributeValues instanceof Error){
                console.log("user 2", catalogAttributeValues.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttributeValues.message});

            }else{
                console.log("user 3", catalogAttributeValues)
                res.status(200).json({'Status': 200 ,'Message':" Data updated successfully.","Result" : catalogAttributeValues });
            }
        }).catch(err => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message':"Bad Request" });

    });
};

const getById: IController = async (req, res) => {
    catalogService.catalogAttributesValuesFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (catalogAttributeValue) => {
            if(catalogAttributeValue instanceof Error){
                console.log("Catalog Attribute Value", catalogAttributeValue.message)
                res.status(400).json({'Status': 400 ,'Message': "Bad Request", "Result" : catalogAttributeValue.message});
            }else{
                res.status(200).json({'Status': 200 ,'Message': "Catalog Attribute Value data", "Result" : catalogAttributeValue});
            }
        }).catch(err => {
        LOGGER.info("error" , err)
        res.status(400).json({'Status': 400 ,'Message': "Bad Request"});

    });
};


export default {
    add,
    all,
    update,
    getById
};
