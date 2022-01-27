import request from '@/utils/request'

// 查询sku列表
export const reqSkuInfo = (page, limit) => request.get(`/admin/product/list/${page}/${limit}`)

// 上架
export const reqOnSale = skuId => request.get(`/admin/product/onSale/${skuId}`)

// 下架
export const reqCancelSale = skuId => request.get(`/admin/product/cancelSale/${skuId}`)

// 获取sku详情
export const reqSkuDetail = skuId => request.get(`/admin/product/getSkuById/${skuId}`)
