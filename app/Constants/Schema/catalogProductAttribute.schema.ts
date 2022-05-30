import {Joi, Segments} from "celebrate";
export default {
    add: {
        [Segments.BODY]: {
            id: Joi.number().required(),
            name: Joi.string().min(1).required(),
            description: Joi.string().required(),
            pack_size: Joi.number().required(),
            status: Joi.number().required(),
            images: Joi.string().required(),

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

    getById:{
        [Segments.QUERY]:{
            id:Joi.number().required()
        },
        [Segments.HEADERS]: Joi.object({
            "tenant-id": Joi.number().min(1).required()
        }).unknown()
    },


}
