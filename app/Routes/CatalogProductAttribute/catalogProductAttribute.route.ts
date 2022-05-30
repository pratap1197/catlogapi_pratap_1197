import express from 'express';
// import catalogAttributesSchema from '../../Constants/Schema/catalogAttributes.schema';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogAttributeValuesController from "../../Controllers/catalogAttributeValues.controller";
import catalogCategoryTreeController from "../../Controllers/catalogCategoryTree.controller";
import catalogProductAttributeController from "../../Controllers/catalogProductAttribute.controller";
import catalogProductAttributeSchema from "../../Constants/Schema/catalogProductAttribute.schema";
import catalogCategoryTreeSchema from "../../Constants/Schema/catalogCategoryTree.schema";
import userSchema from "../../Constants/Schema/User.schema";
import userController from "../../Controllers/User.controller";

router.post(
    '/add',
     // celebrate(catalogProductAttributeSchema.addCatalogCategoryTree),
    catalogProductAttributeController.add
);

router.get(
    '/all',
    celebrate(catalogProductAttributeSchema.all),
    catalogProductAttributeController.all
);

router.put(
    '/update',
    // celebrate(catalogProductAttributeSchema.updateCatalogCategoryTree),
    catalogProductAttributeController.update
);

router.get(
    '/getById',
    celebrate(catalogProductAttributeSchema.getById),
    catalogProductAttributeController.getById
);

export default router;
