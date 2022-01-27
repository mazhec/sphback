import request from '@/utils/request'

export const reqSpuList = (page, limit, category3Id) => request.get(`/admin/product/${page}/${limit}?category3Id=${category3Id}`)

// 获取spu信息接口
export const reqSpuInfo = spuId => request.get(`/admin/product/getSpuById/${spuId}`)

// 获取品牌信息
export const reqTradeMarkList = () => request.get(`/admin/product/baseTrademark/getTrademarkList`)

// 获取spu图片
export const reqSpuImgList = spuId => request.get(`/admin/product/spuImageList/${spuId}`)

// 获取销售属性
export const reqBaseSaleAttrList = () => request.get(`/admin/product/baseSaleAttrList`)

// 修改spu|添加spu
export const reqSaveOrUpdateSpuInfo = data => data.id ? request.post(`/admin/product/updateSpuInfo`, data) : request.post(`/admin/product/saveSpuInfo`, data)

// 删除spu
export const reqDeleteSpu = spuId => request.delete(`/admin/product/deleteSpu/${spuId}`)

// 获取图片接口
export const reqImageList = spuId => request.get(`/admin/product/spuImageList/${spuId}`)

export const reqSpuSaleAttrList = spuId => request.get(`/admin/product/spuSaleAttrList/${spuId}`)

export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)

export const reqsaveSkuInfo = data => request.post(`/admin/product/saveSkuInfo`, data)

export const reqkuInfoById = spuId => request.get(`/admin/product/findBySpuId/${spuId}`)
