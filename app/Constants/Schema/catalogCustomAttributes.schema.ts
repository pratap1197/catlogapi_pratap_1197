import {Joi, Segments} from "celebrate";
export default {

    add: {
        [Segments.BODY]: {
            product_id: Joi.number().required(),
            attribute_id: Joi.number().required(),
            attribute_value: Joi.string().required().min(1).message("Minimum 1 character required"),
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },


    update: {
        [Segments.BODY]: {
            id: Joi.number().required(),
            product_id : Joi.number(),
            attribute_id : Joi.number(),
            user_id : Joi.number(),
            status:Joi.number().optional().min(0).message("status should be 0 or 1").max(1).message("status should be 0 or 1"),
            attribute_value: Joi.string().required().min(1).message("Minimum 1 character required"),
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

    fetchById:{
        [Segments.QUERY]:{
            id:Joi.number().required()
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },


}
