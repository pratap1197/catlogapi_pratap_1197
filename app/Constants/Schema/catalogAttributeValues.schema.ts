import {Joi, Segments} from "celebrate";
export default {

    add: {
        [Segments.BODY]: {
            id: Joi.number().required(),
            attribute_id: Joi.number().messages({'any.only':'Must be a number'}).required().messages({'any.only':'Attribute Id is required'}),
            user_id: Joi.number().optional().messages({'any.only':'Must be a number'}),
            value : Joi.number().optional().messages({'any.only':'Must be a number'}).required().messages({'any.only':'Value is required'}),
            status: Joi.number().optional().messages({'any.only':'Must be a number'}).min(0).messages({'any.only':"status should be 0 or 1"}).max(1).messages({'any.only':"status should be 0 or 1"})
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },

    all: {
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()

    },

    update: {
        [Segments.BODY]: {
            id: Joi.number().required().messages({'any.only':'Must be a number','number.empty':'Id is required'}),
            attribute_id: Joi.number().optional().messages({'any.only':'Must be a number'}),
            user_id: Joi.number().optional().messages({'any.only':'Must be a number'}),
            value : Joi.number().optional().messages({'any.only':'Must be a number'}),
            status: Joi.number().optional().min(0).messages({'number.empty':'Id is required','any.only' :"status should be 0 or 1"}).max(1).messages({ 'number.empty':'Id is required','any.only' :"status should be 0 or 1"})
        },
        [Segments.HEADERS]:Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },

    getById:{
        [Segments.QUERY]:{
            id:Joi.number().required().messages({'number.empty':'Id is required','any.only' :"Must be a number"})
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },



}
