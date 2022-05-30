import {Joi, Segments} from "celebrate";
export default {
    add: {
        [Segments.BODY]: {
            id: Joi.number().required(),
            product_id: Joi.number().required().messages({'any.only':'Must be a number', 'number.empty': 'Product Id is required'}),
            user_id: Joi.number().messages({'any.only':'Must be a number'}),
            position : Joi.number().required().messages({'any.only':'Must be a number', 'number.empty': 'Position is required'}),
            category_id : Joi.number().required().messages({'any.only':'Must be a number', 'number.empty': 'Category Id is required'}),
            status: Joi.number().optional().min(0).message("status should be 0 or 1").max(1).message("status should be 0 or 1")

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

    getById:{
        [Segments.QUERY]:{
            id:Joi.number().required().messages({'any.only':'Must be a number', 'number.empty': 'Id is required'})
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },

    update: {
        [Segments.BODY]: {
            id: Joi.number().required().messages({'any.only':'Must be a number', 'number.empty': 'Id is required'}),
            product_id: Joi.number().optional().messages({'any.only':'Must be a number'}),
            user_id: Joi.number().optional().messages({'any.only':'Must be a number'}),
            position : Joi.number().optional().messages({'any.only':'Must be a number'}),
            category_id : Joi.number().optional().messages({'any.only':'Must be a number'}),
            status: Joi.number().optional().min(0).messages({'number.empty':'Id is required','any.only' :"status should be 0 or 1"}).max(1).messages({'number.empty':'Id is required','any.only' :"status should be 0 or 1"})
        },
        [Segments.HEADERS]:Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },



}
