<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="spu名称">
        <el-input v-model="spu.spuName" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="tra in tradeMark" :key="tra.id" :label="tra.tmName" :value="tra.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input v-model="spu.description" type="textarea" rows="10" placeholder="描述" />
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImg"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndAttrName" :disabled="unSelectSaleAttr.length === 0" :placeholder="`还有${unSelectSaleAttr.length}未选择`" style="margin-right: 10px;">
          <el-option v-for="(saleAttr, index) in unSelectSaleAttr" :key="saleAttr.id" :label="saleAttr.name" :value="`${saleAttr.id}:${saleAttr.name}:${index}`" />
        </el-select>
        <el-button :disabled="!attrIdAndAttrName" type="primary" icon="el-icon-puls" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border style="margin-top: 20px;" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="saleAttrName" label="属性名" width="" />
          <el-table-column prop="" label="属性名称列表" width="">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :type="tag.type"
                style="margin-right: 10px;"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                :ref="$index"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                style="width: 30%;"
                @keydown.native.enter="$refs[$index].blur()"
                @blur="handleInputConfirm(row)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row, $index)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" size="mini" icon="el-icon-delete" :row="row" @click="spu.spuSaleAttrList.splice($index, 1)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="$emit('ChangeScene')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      attrIdAndAttrName: '',
      spu: {
        category3Id: '',
        description: '',
        tmId: '',
        spuName: '',
        spuImageList: [
          // {
          //   imgName: '',
          //   imgUrl: '',
          //   spuId: 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: '',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     // {
          //     //   baseSaleAttrId: 0,
          //     //   id: 0,
          //     //   isChecked: '',
          //     //   saleAttrName: '',
          //     //   saleAttrValueName: '',
          //     //   spuId: 0
          //     // }
          //   ]
          // }
        ]
      },
      tradeMark: [],
      baseSaleAttr: [],
      spuImg: []
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.baseSaleAttr.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => item1.baseSaleAttrId + '' !== item.id + '')
      })
    }
  },
  // mounted() {
  //   console.log(typeof this.spu)
  // },
  methods: {
    initSpuInfo() {
      this.spu = {
        category3Id: '',
        description: '',
        tmId: '',
        spuName: '',
        spuImageList: [
        ],
        spuSaleAttrList: [
        ]
      }
    },
    addSpuData(category3Id) {
      this.initSpuInfo()
      this.spu.category3Id = category3Id
      this.$API.spu.reqTradeMarkList().then(res => {
        // console.log('reqTradeMarkList', res)
        this.tradeMark = res.data
      })
      this.$API.spu.reqBaseSaleAttrList().then(res => {
        // console.log('reqBaseSaleAttrList', res)
        this.baseSaleAttr = res.data
      })
    },
    // 修改或添加spu
    async addOrUpdateSpu() {
      console.log(this.spu)
      this.spu.spuImageList = this.spuImg.map(item => {
        const imageList = {
          imgName: item.name,
          imgUrl: item.response && item.response.data || item.url
        }
        // if (this.spu.id) imageList.spuId = this.spu.id
        // if (item.id) imageList.id = item.id
        return imageList
      })
      // console.log(this.spu.spuImageList)
      console.log(this.spu.spuImageList)
      try {
        const res = await this.$API.spu.reqSaveOrUpdateSpuInfo(this.spu)
        console.log(res)
        if (res.code === 200) {
          this.spu.id ? this.$message.success('修改成功') : this.$message.success('添加成功')
          this.$emit('ChangeScene', this.spu.id ? 'update' : 'add')
          // this.spu = {
          //   category3Id: '',
          //   description: '',
          //   tmId: '',
          //   spuName: '',
          //   spuImageList: [
          //   ],
          //   spuSaleAttrList: [
          //   ]
          // }
        }
      } catch (err) {
        console.log(err)
      }
    },
    handleInputConfirm(row) {
      // inputValue
      /*
        {
          baseSaleAttrId: 0,
          id: 0,
          isChecked: '',
          saleAttrName: '',
          saleAttrValueName: '',
          spuId: 0
        }
      */
      const { baseSaleAttrId, saleAttrName, inputValue } = row
      const isExist = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue.trim())
      if (inputValue.trim() === '') {
        this.$message.info('属性值不能为空')
      } else if (isExist) {
        this.$message.info('该属性已存在')
      } else {
        const saleAttrValue = {
          baseSaleAttrId: baseSaleAttrId,
          saleAttrName: saleAttrName,
          saleAttrValueName: inputValue.trim(),
          spuId: this.spu.id
        }
        row.spuSaleAttrValueList.push(saleAttrValue)
      }
      row.inputVisible = false
    },
    // 显示input
    showInput(row, index) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      // row.inputVisible = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 点击tag关闭按钮删除tag
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    // 添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndAttrName = ''
    },
    // 文件上传成功
    handleUploadSuccess(res, file, fileList) {
      // console.log(res, file, fileList)
      this.spuImg = fileList
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.spuImg = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    initSpuData(spu) {
      this.$API.spu.reqSpuInfo(spu.id).then(res => {
        // console.log('reqSpuInfo', res)
        this.spu = res.data
      })
      this.$API.spu.reqTradeMarkList().then(res => {
        // console.log('reqTradeMarkList', res)
        this.tradeMark = res.data
      })
      this.$API.spu.reqSpuImgList(spu.id).then(res => {
        // console.log('reqSpuImgList', res)
        res.data.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImg = res.data
      })
      this.$API.spu.reqBaseSaleAttrList().then(res => {
        // console.log('reqBaseSaleAttrList', res)
        this.baseSaleAttr = res.data
      })

      // console.log('发送请求', spu)
      // try {
      //   const spuInfoRes = await this.$API.spu.reqSpuInfo(spu.id)
      //   console.log('spuInfoRes', spuInfoRes)
      // } catch (err) {
      //   console.log(err)
      // }
      // try {
      //   const tradeMarkRes = await this.$API.spu.reqTradeMarkList()
      //   console.log('tradeMarkRes', tradeMarkRes)
      // } catch (err) {
      //   console.log(err)
      // }
      // try {
      //   const spuImgRes = await this.$API.spu.reqSpuImgList(spu.id)
      //   console.log('spuImgRes', spuImgRes)
      // } catch (err) {
      //   console.log(err)
      // }
      // try {
      //   const baseSaleAttrRes = await this.$API.spu.reqBaseSaleAttrList(spu.id)
      //   console.log('baseSaleAttrRes', baseSaleAttrRes)
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
}
</script>

<style>

</style>
