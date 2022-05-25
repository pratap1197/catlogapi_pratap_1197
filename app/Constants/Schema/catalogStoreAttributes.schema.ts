import {Joi, Segments} from "celebrate";
export default {
    add: {
        [Segments.BODY]: {
            product_id: Joi.number().required(),
            user_id: Joi.number(),
            store_id :Joi.number().required(),
            sku_id : Joi.number().required(),
            mrp :  Joi.number().required(),
            cost_price :Joi.number().required(),
            selling_price : Joi.number().required(),
            status: Joi.number().optional().min(0).message("status should be 0 or 1").max(1).message("status should be 0 or 1")
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },

    update: {
        [Segments.BODY]: {
            id: Joi.number().required(),
            product_id: Joi.number(),
            user_id: Joi.number(),
            store_id :Joi.number(),
            sku_id : Joi.number(),
            mrp :  Joi.number(),
            cost_price :Joi.number(),
            selling_price : Joi.number(),
            status: Joi.number().optional().min(0).message("status should be 0 or 1").max(1).message("status should be 0 or 1")
        },
        [Segments.HEADERS]:Joi.object({
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
            id:Joi.number().required()
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },


}
