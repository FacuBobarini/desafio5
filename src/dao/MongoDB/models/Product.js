import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
const schemaName = "products";
const productSchema = {
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnail: String,
};

class ManagerProductgeMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, schemaName, productSchema);
  }
  async getAllProducts(queryParams, baseUrl) {
    let { limit, page, sort, ...query } = queryParams;
    !limit && (limit = 10);
    !page && (page = 1);
    sort = queryParams.sort ? [["price", queryParams.sort]] : null;

    await this.setConnection();

    try {
      const result = await this.model.paginate(query, { limit, page, sort });
      const { totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } =
        result;

      return {
        status: result.docs ? "success" : "error",
        payload: result.docs,
        totalPages,
        prevPage,
        nextPage,
        page: result.page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? baseUrl + `?page=${result.page - 1}` : null, // Tanto prev como next link son utilizados solo para las vistas(que no lleva params),
        nextLink: hasNextPage ? baseUrl + `?page=${result.page + 1}` : null, // por eso es que no se toma en cuenta el resto de los params
      };
    } catch (error) {
      return error;
    }
  }
}

export const productManager = new ManagerProductgeMongoDB();
