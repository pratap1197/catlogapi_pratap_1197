import {Joi, Segments} from "celebrate";
export default {
    add: {
        [Segments.BODY]: {
            id: Joi.number().required(),
            user_id : Joi.number().optional().messages({'number.empty':'Must be a number'}),
            name: Joi.string().required().min(1).messages({'any.only':"Minimum 1 character required"}),
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },

    update: {
        [Segments.BODY]: {
            id: Joi.number().required().messages({'any.only':'Must be a number'}),
            user_id: Joi.number().optional().messages({'any.only':'Must be a number'}),
            name: Joi.string().optional().min(1).message("Minimum 1 character required"),
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
            id:Joi.number().required().messages({'any.only':'Must be a number'})
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },



}
