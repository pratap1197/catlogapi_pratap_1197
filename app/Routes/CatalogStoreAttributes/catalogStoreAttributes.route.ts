import express from 'express';
// import catalogAttributesSchema from '../../Constants/Schema/catalogAttributes.schema';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogAttributeValuesController from "../../Controllers/catalogAttributeValues.controller";
import catalogStoreAttributesController from "../../Controllers/catalogStoreAttributes.controller";
import userSchema from "../../Constants/Schema/User.schema";
import userController from "../../Controllers/User.controller";
import catalogStoreAttributesSchema from "../../Constants/Schema/catalogStoreAttributes.schema";
import catalogProductAttributeSchema from "../../Constants/Schema/catalogProductAttribute.schema";
import catalogProductAttributeController from "../../Controllers/catalogProductAttribute.controller";

router.post(
    '/add',
     celebrate(catalogStoreAttributesSchema.add),
    catalogStoreAttributesController.add
);

router.put(
    '/update',
    celebrate(catalogStoreAttributesSchema.update),
    catalogStoreAttributesController.update
);

router.get(
    '/all',
    celebrate(catalogStoreAttributesSchema.all),
    catalogStoreAttributesController.all
);

router.get(
    '/getById',
    celebrate(catalogStoreAttributesSchema.getById),
    catalogStoreAttributesController.getById
);

export default router;
