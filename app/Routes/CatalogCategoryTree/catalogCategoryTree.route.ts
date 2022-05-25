import express from 'express';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogCategoryTreeController from "../../Controllers/catalogCategoryTree.controller";
import customerSchema from "../../Constants/Schema/Customer.schema";
import customerController from "../../Controllers/Customer.controller";
 import catalogCategoryTreeSchema from "../../Constants/Schema/catalogCategoryTree.schema";
import catalogAttributesSchema from "../../Constants/Schema/catalogAttributes.schema";
import catalogAttributeController from "../../Controllers/catalogAttribute.controller";

router.post(
    '/add',
      // celebrate(catalogCategoryTreeSchema.add),
    catalogCategoryTreeController.add
);

router.get(
    '/all',
     celebrate(catalogCategoryTreeSchema.all),
    catalogCategoryTreeController.all
);

router.put(
    '/update',
    // celebrate(catalogCategoryTreeSchema.update),
    catalogCategoryTreeController.update
);

router.get(
    '/getById',
    celebrate(catalogCategoryTreeSchema.getById),
    catalogCategoryTreeController.getById
);
export default router;
