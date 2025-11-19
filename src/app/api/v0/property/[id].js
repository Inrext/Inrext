
// services/propertyService.js
const axios = require('axios');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v0';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const propertyService = {
  getAllProperties: async (
    search = '',
    page = 1,
    limit = 100,
    parentOnly = "false",
    parentId,
    propertyType,
    status,
    location,
    builderName,
    includeChildren = "false",
    minPrice,
    maxPrice
  ) => {
    const params = { search, page, limit, parentOnly, includeChildren, _t: Date.now() };
    if (parentId) params.parentId = parentId;
    if (propertyType) params.propertyType = propertyType;
    if (status) params.status = status;
    if (location) params.location = location;
    if (builderName) params.builderName = builderName;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    const response = await api.get('/property', { params });
    return response.data;
  },

  getHierarchicalProperties: async (
    search = '',
    status,
    propertyType,
    location,
    builderName,
    minPrice,
    maxPrice
  ) => {
    const params = { hierarchyView: "true", search, _t: Date.now() };
    if (status) params.status = status;
    if (propertyType) params.propertyType = propertyType;
    if (location) params.location = location;
    if (builderName) params.builderName = builderName;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    const response = await api.get('/property', { params });
    return response.data;
  },

  getPropertyById: async (idOrSlug, withChildren = "false") => {
    const response = await api.get(`/property/${idOrSlug}`, {
      params: { withChildren }
    });
    return response.data;
  },

  getPropertyBySlug: async (slug, withChildren = "false") => {
    const response = await api.get(`/property/${slug}`, {
      params: { withChildren }
    });
    return response.data;
  },

  createProperty: async (propertyData) => {
    try {
      const formattedData = {
        ...propertyData,
        propertyType: Array.isArray(propertyData.propertyType) ? propertyData.propertyType : [propertyData.propertyType],
        images: propertyData.images && Array.isArray(propertyData.images)
          ? propertyData.images.map((img) => ({
              url: img.url,
              title: img.title || '',
              description: img.description || '',
              isPrimary: img.isPrimary || false,
              uploadedAt: img.uploadedAt || new Date().toISOString()
            }))
          : [],
        propertyImages: propertyData.propertyImages && Array.isArray(propertyData.propertyImages)
          ? propertyData.propertyImages.map((img) => ({
              url: img.url,
              title: img.title || '',
              description: img.description || '',
              isPrimary: img.isPrimary || false,
              uploadedAt: img.uploadedAt || new Date().toISOString()
            }))
          : [],
        floorPlans: propertyData.floorPlans && Array.isArray(propertyData.floorPlans)
          ? propertyData.floorPlans.map((plan) => ({
              url: plan.url,
              title: plan.title || '',
              description: plan.description || '',
              type: plan.type || '2d',
              uploadedAt: plan.uploadedAt || new Date().toISOString()
            }))
          : [],
        creatives: propertyData.creatives && Array.isArray(propertyData.creatives)
          ? propertyData.creatives.map((creative) => ({
              type: creative.type || 'image',
              url: creative.url,
              title: creative.title || '',
              description: creative.description || '',
              thumbnail: creative.thumbnail || '',
              uploadedAt: creative.uploadedAt || new Date().toISOString()
            }))
          : [],
        videos: propertyData.videos && Array.isArray(propertyData.videos)
          ? propertyData.videos.map((video) => ({
              url: video.url,
              title: video.title || '',
              description: video.description || '',
              thumbnail: video.thumbnail || '',
              type: video.type || 'direct',
              uploadedAt: video.uploadedAt || new Date().toISOString()
            }))
          : [],
        brochureUrls: propertyData.brochureUrls && Array.isArray(propertyData.brochureUrls)
          ? propertyData.brochureUrls.map((brochure) => ({
              title: brochure.title || '',
              url: brochure.url,
              type: brochure.type || 'PDF Document'
            }))
          : [],
        floorPlans: propertyData.floorPlans && Array.isArray(propertyData.floorPlans)
          ? propertyData.floorPlans.map((plan) => ({
              url: plan.url,
              title: plan.title || '',
              description: plan.description || '',
              type: plan.type === 'image/webp' ? 'image' :
                     plan.type === 'application/pdf' ? 'pdf' :
                     plan.type || '2d',
              uploadedAt: plan.uploadedAt || new Date().toISOString()
            }))
          : [],
        residentialProperties: propertyData.residentialProperties && Array.isArray(propertyData.residentialProperties)
          ? propertyData.residentialProperties.map((prop) => ({
              propertyName: prop.propertyName || '',
              propertyDescription: prop.propertyDescription || '',
              price: prop.price || '',
              paymentPlan: prop.paymentPlan || propertyData.paymentPlan,
              bedrooms: prop.bedrooms || 0,
              bathrooms: prop.bathrooms || 0,
              toilet: prop.toilet || 0,
              balcony: prop.balcony || 0,
              carpetArea: prop.carpetArea || '',
              builtUpArea: prop.builtUpArea || '',
              minSize: prop.minSize || '',
              maxSize: prop.maxSize || '',
              sizeUnit: prop.sizeUnit || 'sq.ft.',
              amenities: prop.amenities || [],
              propertyImages: prop.propertyImages && Array.isArray(prop.propertyImages)
                ? prop.propertyImages.map((img) => ({
                    url: img.url,
                    title: img.title || '',
                    description: img.description || '',
                    isPrimary: img.isPrimary || false,
                    uploadedAt: img.uploadedAt || new Date().toISOString()
                  }))
                : [],
              floorPlans: prop.floorPlans && Array.isArray(prop.floorPlans)
                ? prop.floorPlans.map((plan) => ({
                    url: plan.url,
                    title: plan.title || '',
                    description: plan.description || '',
                    type: plan.type === 'image/webp' ? 'image' :
                           plan.type === 'application/pdf' ? 'pdf' :
                           plan.type || '2d',
                    uploadedAt: plan.uploadedAt || new Date().toISOString()
                  }))
                : []
            }))
          : [],
        commercialProperties: propertyData.commercialProperties && Array.isArray(propertyData.commercialProperties)
          ? propertyData.commercialProperties.map((prop) => ({
              propertyName: prop.propertyName || '',
              propertyDescription: prop.propertyDescription || '',
              price: prop.price || '',
              paymentPlan: prop.paymentPlan || propertyData.paymentPlan,
              carpetArea: prop.carpetArea || '',
              builtUpArea: prop.builtUpArea || '',
              minSize: prop.minSize || '',
              maxSize: prop.maxSize || '',
              sizeUnit: prop.sizeUnit || 'sq.ft.',
              amenities: prop.amenities || [],
              propertyImages: prop.propertyImages && Array.isArray(prop.propertyImages)
                ? prop.propertyImages.map((img) => ({
                    url: img.url,
                    title: img.title || '',
                    description: img.description || '',
                    isPrimary: img.isPrimary || false,
                    uploadedAt: img.uploadedAt || new Date().toISOString()
                  }))
                : [],
              floorPlans: prop.floorPlans && Array.isArray(prop.floorPlans)
                ? prop.floorPlans.map((plan) => ({
                    url: plan.url,
                    title: plan.title || '',
                    description: plan.description || '',
                    type: plan.type === 'image/webp' ? 'image' :
                           plan.type === 'application/pdf' ? 'pdf' :
                           plan.type || '2d',
                    uploadedAt: plan.uploadedAt || new Date().toISOString()
                  }))
                : []
            }))
          : [],
        plotProperties: propertyData.plotProperties && Array.isArray(propertyData.plotProperties)
          ? propertyData.plotProperties.map((prop) => ({
              propertyName: prop.propertyName || '',
              propertyDescription: prop.propertyDescription || '',
              price: prop.price || '',
              paymentPlan: prop.paymentPlan || propertyData.paymentPlan,
              ownershipType: prop.ownershipType || 'Freehold',
              landType: prop.landType || 'Residential Plot',
              approvedBy: prop.approvedBy || '',
              boundaryWall: prop.boundaryWall || false,
              minSize: prop.minSize || '',
              maxSize: prop.maxSize || '',
              sizeUnit: prop.sizeUnit || 'sq.ft.',
              amenities: prop.amenities || [],
              propertyImages: prop.propertyImages && Array.isArray(prop.propertyImages)
                ? prop.propertyImages.map((img) => ({
                    url: img.url,
                    title: img.title || '',
                    description: img.description || '',
                    isPrimary: img.isPrimary || false,
                    uploadedAt: img.uploadedAt || new Date().toISOString()
                  }))
                : [],
              floorPlans: prop.floorPlans && Array.isArray(prop.floorPlans)
                ? prop.floorPlans.map((plan) => ({
                    url: plan.url,
                    title: plan.title || '',
                    description: plan.description || '',
                    type: plan.type === 'image/webp' ? 'image' :
                           plan.type === 'application/pdf' ? 'pdf' :
                           plan.type || '2d',
                    uploadedAt: plan.uploadedAt || new Date().toISOString()
                  }))
                : []
            }))
          : []
      };
      const response = await api.post('/property', formattedData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to create property");
    }
  },

  updateProperty: async (idOrSlug, propertyData) => {
    const response = await api.patch(`/property/${idOrSlug}`, propertyData);
    return response.data;
  },

  deleteProperty: async (idOrSlug) => {
    const response = await api.delete(`/property/${idOrSlug}`);
    return response.data;
  },

  getMainProjects: async (search = '', page = 1, limit = 100) => {
    const response = await api.get('/property', {
      params: { search, page, limit, parentOnly: "true" }
    });
    return response.data;
  },

  getSubProperties: async (parentId, search = '', page = 1, limit = 100) => {
    const response = await api.get('/property', {
      params: {
        parentId,
        search,
        page,
        limit,
        action: 'subproperties'
      }
    });
    return response.data;
  },

  getPropertiesWithChildren: async (search = '', page = 1, limit = 100) => {
    const response = await api.get('/property', {
      params: { search, page, limit, includeChildren: "true" }
    });
    return response.data;
  },
};

module.exports = { propertyService };

