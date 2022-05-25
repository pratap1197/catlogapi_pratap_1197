import express from 'express';
import catalogAttributesSchema from '../../Constants/Schema/catalogAttributes.schema';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogAttributeController from "../../Controllers/catalogAttribute.controller";
import catalogStoreAttributesSchema from "../../Constants/Schema/catalogStoreAttributes.schema";
import catalogStoreAttributesController from "../../Controllers/catalogStoreAttributes.controller";
import catalogCategoryTreeSchema from "../../Constants/Schema/catalogCategoryTree.schema";
import catalogCategoryTreeController from "../../Controllers/catalogCategoryTree.controller";

router.post(
    '/add',
    celebrate(catalogAttributesSchema.add),
    catalogAttributeController.add
);

router.put(
    '/update',
    celebrate(catalogAttributesSchema.update),
    catalogAttributeController.update
);

router.get(
    '/all',
    celebrate(catalogAttributesSchema.all),
    catalogAttributeController.all
);

router.get(
    '/getById',
    celebrate(catalogAttributesSchema.getById),
    catalogAttributeController.getById
);

export default router;
