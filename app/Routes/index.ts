import  {Router} from 'express';
import userRoute from './User/User.route';
import customerRoute from './Customer/Customer.route';
import catalogAttributesRoute from "./CatalogAttributes/catalogAttributes.route";
import catalogAttributeValuesRoute from "./CatalogAttributeValues/catalogAttributeValues.route";
import catalogStoreAttributesRoute from "./CatalogStoreAttributes/catalogStoreAttributes.route";
import catalogCustomAttributesRoute from "./CatalogCustomAttributes/catalogCustomAttributes.route";
import catalogCategoryProductMappingRoute from "./CatalogCategoryProductMapping/catalogCategoryProductMapping.route";
import catalogCategoryTreeRoute from "./CatalogCategoryTree/catalogCategoryTree.route";
import catalogProductAttributeRoute from "./CatalogProductAttribute/catalogProductAttribute.route";

const router = Router();

router.use('/User', userRoute);
router.use('/Customer', customerRoute);
router.use('/CatalogAttributes', catalogAttributesRoute);
router.use('/CatalogAttributeValue', catalogAttributeValuesRoute);
router.use('/CatalogStoreAttributes', catalogStoreAttributesRoute);
router.use('/CatalogCustomAttributes', catalogCustomAttributesRoute);
router.use('/CatalogCategoryProductMapping', catalogCategoryProductMappingRoute);
router.use('/CatalogCategoryTree', catalogCategoryTreeRoute);
router.use('/CatalogProductAttribute', catalogProductAttributeRoute);


export default router;
