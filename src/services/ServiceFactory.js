import ProductService from "./ProductService";

const ServiceFactory = () => {
  return {
    productService: ProductService(),
  };
};

export default ServiceFactory;
