import apiService from "../api-service/api-service";

export const productApi = apiService.injectEndpoints({

  endpoints: (builder) => ({
    // Post a new product
    postNewProduct: builder.mutation({
      query: (formData) => ({
        url: `products/create-product?locationFolder=product-images`,
        method: "POST",
        body: formData,
      }),
    }),


    // Get all products with filters
   getAllProducts: builder.query({
     query: (filters) => ({
         url: `${filters ? `products/all-products?${filters}` : 'products/all-products'}`,
         method: 'GET',
     }),
   }),

    // Get tranding-products
    getTrandingProducts: builder.query({
      query: () => ({
        url: `products/tranding-products`,
        method: "GET",
      }),
    }),

    // Get new-featured-best-deal-on-sell-products
    getNewFeaturedBestDealAndOnSellProducts: builder.query({
      query: () => ({
        url: `products/new-featured-best-deal-on-sell-products`,
        method: "GET",
      }),
    }),
    
    // Get product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `products/single/${id}`,
        method: "GET",
      }),
    }),

    // Update product by ID
    updateProductById: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Update product with images by ID
    updateProductWithImageById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `products/update-with-images/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    // Delete product by ID
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `products/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // Get featured products
    getFeaturedProducts: builder.query({
      query: () => ({
        url: `products/featured`,
        method: "GET",
      }),
    }),

    // Get products by category
    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `products/category/${categoryId}`,
        method: "GET",
      }),
    }),

    // Get products by tags
    getProductsByTags: builder.mutation({
      query: (tags) => ({
        url: `products/tags`,
        method: "POST",
        body: tags,
      }),
    }),

    // Get products by brand
    getProductsByBrand: builder.query({
      query: (brand) => ({
        url: `products/brand/${brand}`,
        method: "GET",
      }),
    }),

    // Update stock
    updateStock: builder.mutation({
      query: ({ id, stockData }) => ({
        url: `products/${id}/stock`,
        method: "PATCH",
        body: stockData,
      }),
    }),

    // Update ratings and reviews
    updateRatingsAndReviews: builder.mutation({
      query: ({ id, ratingsData }) => ({
        url: `products/update/${id}/ratings`,
        method: "PATCH",
        body: ratingsData,
      }),
    }),
  }),
});
