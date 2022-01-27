<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称" label-width="80px">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" min="0" placeholder="价格(元)" type="number" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="价格(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" placeholder="规格描述" type="textarea" rows="10" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px" style="margin-top: -20px;">
          <el-form-item v-for="attrInfo in attrInfoList" :key="attrInfo.id" :label="attrInfo.attrName" style="margin-top:20px;">
            <el-select v-model="attrInfo.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="attrValue in attrInfo.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attrInfo.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id" :label="spuSaleAttr.saleAttrName">
            <el-select v-model="spuSaleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                :label="spuSaleAttrValue.saleAttrValueName"
                :value="`${spuSaleAttr.id}:${spuSaleAttrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="spuImageList" @selection-change="selectionChange">
          <el-table-column type="selection" align="center" label="" width="" />
          <el-table-column prop="imgUrl" label="图片" width="">
            <template slot-scope="{ row }">
              <img style="width: 20%;" :src="row.imgUrl">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="" />
          <el-table-column prop="" label="操作">
            <template slot-scope="{ row, $index }">
              <el-button v-show="row.isDefault === 0" type="primary" :row="row" size="mini" @click="setDefault($index)">设为默认</el-button>
              <el-button v-show="row.isDefault === 1" type="success" size="mini" plain>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      spu: {},
      imgList: [],
      skuInfo: {
        category3Id: '',
        price: '',
        spuId: '',
        tmId: '',
        weight: '',
        skuName: '',
        skuDefaultImg: '',
        skuDesc: '',
        skuAttrValueList: [
          // {
          //   attrId: '',
          //   attrName: '',
          //   id: '',
          //   skuId: '',
          //   valueId: '',
          //   valueName: ''
          // }
        ],
        skuImageList: [
          // {
          //   id: '',
          //   imgName: '',
          //   imgUrl: '',
          //   isDefault: '',
          //   skuId: '',
          //   spuImgId: ''
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   id: '',
          //   saleAttrId: '',
          //   saleAttrName: '',
          //   saleAttrValueId: '',
          //   saleAttrValueName: '',
          //   skuId: '',
          //   spuId: ''
          // }
        ]
      }
    }
  },
  methods: {
    async save() {
      // this.attrInfoList.forEach(item => {
      //   if (item.attrIdAndValueId) {
      //     const [attrId, valueId] = item.attrIdAndValueId.split(':')
      //     this.skuInfo.skuAttrValueList.push({ attrId, valueId })
      //   }
      // })
      // this.spuSaleAttrList.forEach(item => {
      //   if (item.attrIdAndValueId) {
      //     const [attrId, valueId] = item.attrIdAndValueId.split(':')
      //     this.skuInfo.skuSaleAttrValueList.push({ attrId, valueId })
      //   }
      // })
      this.skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => { if (item.attrIdAndValueId) { const [attrId, valueId] = item.attrIdAndValueId.split(':'); prev.push({ attrId, valueId }) } return prev }, [])
      this.skuInfo.skuSaleAttrValueList = this.spuSaleAttrList.reduce((prev, item) => { if (item.attrIdAndValueId) { const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':'); prev.push({ saleAttrId, saleAttrValueId }) } return prev }, [])
      this.skuInfo.skuImageList = this.imgList.map(item => { return { imgName: item.imgName, imgUrl: item.imgUrl, isDefault: item.isDefault, spuImgId: item.id } })
      try { const res = await this.$API.spu.reqsaveSkuInfo(this.skuInfo); if (res.code === 200) { this.$emit('ChangeScene'); this.$message.success('添加SKU成功') } } catch (err) { console.log(err) }
    },
    handleCancel() {
      this.$emit('ChangeScene')
      Object.assign(this._data, this.$options.data())
    },
    setDefault($index) {
      this.spuImageList.forEach((item, index) => {
        if ($index === index) {
          item.isDefault = 1
          this.skuInfo.skuDefaultImg = item.imgUrl
        } else {
          item.isDefault = 0
        }
      })
    },
    selectionChange(selectList) {
      this.imgList = selectList
    },
    getData(category1Id, category2Id, spu) {
      this.spu = spu
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      // this.skuInfo = {
      //   category3Id: spu.category3Id,
      //   price: '',
      //   spuId: spu.id,
      //   tmId: spu.tmId,
      //   weight: '',
      //   skuName: '',
      //   skuDefaultImg: '',
      //   skuDesc: '',
      //   skuAttrValueList: [
      //     // {
      //     //   attrId: '',
      //     //   attrName: '',
      //     //   id: '',
      //     //   skuId: '',
      //     //   valueId: '',
      //     //   valueName: ''
      //     // }
      //   ],
      //   skuImageList: [
      //     // {
      //     //   id: '',
      //     //   imgName: '',
      //     //   imgUrl: '',
      //     //   isDefault: '',
      //     //   skuId: '',
      //     //   spuImgId: ''
      //     // }
      //   ],
      //   skuSaleAttrValueList: [
      //     // {
      //     //   id: '',
      //     //   saleAttrId: '',
      //     //   saleAttrName: '',
      //     //   saleAttrValueId: '',
      //     //   saleAttrValueName: '',
      //     //   skuId: '',
      //     //   spuId: ''
      //     // }
      //   ]
      // }
      this.$API.spu.reqImageList(spu.id).then(res => {
        console.log(res)
        res.data.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = res.data
      })
      this.$API.spu.reqSpuSaleAttrList(spu.id).then(res => {
        console.log(res)
        this.spuSaleAttrList = res.data
      })
      this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id).then(res => {
        console.log(res)
        this.attrInfoList = res.data
      })
    }
  }
}
</script>

<style>
</style>
