import {Joi, Segments} from "celebrate";



export default {
    add: {
        [Segments.BODY]: {
            name: Joi.string().min(1).required(),
            position: Joi.string().required(),
            parent_id: Joi.number().required(),
            status: Joi.number().required(),
            image: Joi.string().required(),

        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },

    all: {
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()

    },

    update: {
        [Segments.BODY]: {
            name: Joi.string().min(1).required(),
            position: Joi.string().required(),
            parent_id: Joi.number().required(),
            status: Joi.number().required(),
            image: Joi.string().required()
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.string().min(1).required()
        }).unknown()
    },

    getById: {
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()

    },


}
