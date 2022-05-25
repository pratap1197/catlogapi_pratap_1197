import express from 'express';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogAttributeValuesController from "../../Controllers/catalogAttributeValues.controller";
import catalogAttributeValuesSchema from "../../Constants/Schema/catalogAttributeValues.schema";
import catalogAttributesSchema from "../../Constants/Schema/catalogAttributes.schema";
import catalogAttributeController from "../../Controllers/catalogAttribute.controller";

router.post(
    '/add',
     celebrate(catalogAttributeValuesSchema.add),
    catalogAttributeValuesController.add
);

router.get(
    '/all',
    celebrate(catalogAttributeValuesSchema.all),
    catalogAttributeValuesController.all
);

router.put(
    '/update',
    celebrate(catalogAttributeValuesSchema.update),
    catalogAttributeValuesController.update
);

router.get(
    '/getById',
    celebrate(catalogAttributeValuesSchema.getById),
    catalogAttributeValuesController.getById
);

export default router;
