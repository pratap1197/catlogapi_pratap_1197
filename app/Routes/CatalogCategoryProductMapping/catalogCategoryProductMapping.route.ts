import express from 'express';
// import catalogAttributesSchema from '../../Constants/Schema/catalogAttributes.schema';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogCategoryProductMappingController from "../../Controllers/catalogCategoryProductMapping.controller";
import catalogCategoryProductMappingSchema from "../../Constants/Schema/catalogCategoryProductMapping.schema";
import catalogAttributesSchema from "../../Constants/Schema/catalogAttributes.schema";
import catalogAttributeController from "../../Controllers/catalogAttribute.controller";

router.post(
    '/add',
    celebrate(catalogCategoryProductMappingSchema.add),
    catalogCategoryProductMappingController.add
);

router.get(
    '/all',
    celebrate(catalogCategoryProductMappingSchema.all),
    catalogCategoryProductMappingController.all
);

router.get(
    '/getById',
    celebrate(catalogCategoryProductMappingSchema.getById),
    catalogCategoryProductMappingController.fetchById
);

router.put(
    '/update',
    celebrate(catalogCategoryProductMappingSchema.update),
    catalogCategoryProductMappingController.update
);

export default router;
