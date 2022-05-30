import httpStatusCodes from 'http-status-codes';
import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import constants from "../Constants";
import  catalogService from '../Services/catalog.service';
import LOGGER from "../config/LOGGER";
import userService from "../Services/User.service";

const add: IController = async (req, res) => {
    let catalogProductAttribute: any;
    try {
        let status = 1;
        let tenant = req.headers["tenant-id"];
        req.body.status = status
        catalogProductAttribute = await catalogService.addCatalogProductAttribute(req, tenant);
        if (catalogProductAttribute instanceof Error) {
            console.log("Catalog Product Attribute", catalogProductAttribute)
            res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : catalogProductAttribute.message});
        } else {
            res.status(200).json({'Status': 200 ,'Message':"Data added successfully in Catalog Product Attribute.", "Result" : catalogProductAttribute});

        }
    } catch (e:any) {
        console.log("controller ->", e)
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            res.status(400).json({'Status': 400 ,'Message':" Duplicate Entry."});
        }
        else{
            res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : e.message});
        }
        return;
    }
};

const all: IController = async (req, res) => {
    catalogService.fetchAllCatalogProductAttribute(req.headers["tenant-id"])
        .then( (catalogProductAttribute) => {
            if(catalogProductAttribute instanceof Error){
                console.log("Catalog Product Attribute", catalogProductAttribute.message)
                res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : catalogProductAttribute.message});

            }else{
                res.status(200).json({'Status': 200 ,'Message':" Data from Catalog Product Attribute", "Result" : catalogProductAttribute});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});

    });
};

const update : IController = async (req, res) => {
    try {
        let updatedCatalogProductAttribute = await catalogService.updateCatalogProductAttribute(req);
        if (updatedCatalogProductAttribute instanceof Error) {
            console.log("Catalog Product Attribute", updatedCatalogProductAttribute)
            res.status(400).json({'Status': 400 ,'Message':" Bad Request."});
        } else {
            res.status(200).json({'Status': 200 ,'Message':" Data updated successfully","Result" : updatedCatalogProductAttribute});
        }
    } catch (e) {
        console.log("controller ->", e)
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});
        return;
    }
};

const getById: IController = async (req, res) => {
    catalogService.catalogProductFetchById(Number(req.query.id), Number( req.headers["tenant-id"]))
        .then( (catalogProductAttribute) => {
            if(catalogProductAttribute instanceof Error){
                console.log("Catalog Product Attribute", catalogProductAttribute.message)
                res.status(400).json({'Status': 400 ,'Message':" Bad Request.", "Result" : catalogProductAttribute.message});
            }else{
                res.status(200).json({'Status': 200 ,'Message':" Catalog Product Attribute Data", "Result" : catalogProductAttribute});
            }
        }).catch(err => {
        console.log("Error  ->", err);
        res.status(400).json({'Status': 400 ,'Message':" Bad Request."});

    });
};


export default {
    add,
    all,
    update,
    getById
}
