import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => request.get(`/admin/product/baseTrademark/${page}/${limit}`)

// 添加品牌
export const reqAddOrUpdateTradeMark = tradeMark => tradeMark.id ? request.put(`/admin/product/baseTrademark/update`, tradeMark) : request.post(`/admin/product/baseTrademark/save`, tradeMark)

// 根据id查询品牌 /admin/product/baseTrademark/get/{id}
export const reqTradeMarkById = id => request.get(`/admin/product/baseTrademark/get/${id}`)

// 删除tradeMark
export const reqDelTradeMarkById = id => request.delete(`/admin/product/baseTrademark/remove/${id}`)
