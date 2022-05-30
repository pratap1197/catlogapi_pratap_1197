import express from 'express';
// import catalogAttributesSchema from '../../Constants/Schema/catalogAttributes.schema';
const router = express.Router();
import { celebrate } from 'celebrate';
import catalogCustomAttributesController from "../../Controllers/catalogCustomAttributes.controller";
import catalogCustomAttributesSchema from "../../Constants/Schema/catalogCustomAttributes.schema";
import catalogAttributesSchema from "../../Constants/Schema/catalogAttributes.schema";
import catalogAttributeController from "../../Controllers/catalogAttribute.controller";
import catalogStoreAttributesSchema from "../../Constants/Schema/catalogStoreAttributes.schema";
import catalogStoreAttributesController from "../../Controllers/catalogStoreAttributes.controller";

router.post(
    '/add',
    celebrate(catalogCustomAttributesSchema.add),
    catalogCustomAttributesController.add
);

router.put(
    '/update',
    celebrate(catalogCustomAttributesSchema.update),
    catalogCustomAttributesController.update
);

router.get(
    '/all',
    celebrate(catalogCustomAttributesSchema.all),
    catalogCustomAttributesController.all
);

router.get(
    '/getById',
    celebrate(catalogCustomAttributesSchema.fetchById),
    catalogCustomAttributesController.getById
);

export default router;
