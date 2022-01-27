<template>
  <div>
    <el-table v-loading="loading" border :data="data">
      <el-table-column type="index" align="center" label="序号" width="80" />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column label="默认图片">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 30%;" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" />
      <el-table-column prop="price" label="价格(元)" />
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="{ row }">
          <el-button v-show="row.isSale === 1" size="mini" type="success" icon="el-icon-bottom" @click="cancelSale(row.id)" />
          <el-button v-show="row.isSale === 0" style="margin-left: 0;" size="mini" type="info" icon="el-icon-top" @click="onSale(row.id)" />
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="$message.info('正在开发中....')" />
          <el-button size="mini" type="info" icon="el-icon-info" @click="getSkuDetail(row.id)" />
          <el-button size="mini" type="danger" icon="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;"
      :current-page="page"
      :page-sizes="[5, 10, 15]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getSpuList"
      @size-change="handleSizeChange"
    />
    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      size="60%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetail.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDetail.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">¥ {{ skuDetail.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag v-for="skuAttrValue in skuDetail.skuAttrValueList" :key="skuAttrValue.id" style="margin-right: 10px;" type="success">{{ skuAttrValue.attrId }}-{{ skuAttrValue.valueId }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="600px" style="width: 600px;">
            <el-carousel-item v-for="skuImage in skuDetail.skuImageList" :key="skuImage.id">
              <img :src="skuImage.imgUrl" style="height: 100%;" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 5,
      total: 10,
      data: [],
      loading: true,
      skuDetail: {},
      drawer: false
    }
  },
  mounted() {
    this.getSpuList()
  },
  methods: {
    async getSkuDetail(skuId) {
      this.drawer = true
      try {
        const res = await this.$API.sku.reqSkuDetail(skuId)
        // console.log(res)
        if (res.code === 200) this.skuDetail = res.data
      } catch (err) { console.log(err) }
    },
    async onSale(skuId) {
      try {
        const res = await this.$API.sku.reqOnSale(skuId)
        if (res.code === 200) {
          this.$message.success('上架成功')
          this.getSpuList(this.page)
        }
      } catch (err) { this.$message.error('上架失败'); console.log(err) }
    },
    async cancelSale(skuId) {
      try {
        const res = await this.$API.sku.reqCancelSale(skuId)
        if (res.code === 200) {
          this.$message.success('下架成功')
          this.getSpuList(this.page)
        }
      } catch (err) { this.$message.error('下架失败'); console.log(err) }
    },
    async getSpuList(page = 1) {
      this.loading = true
      this.page = page
      try {
        const res = await this.$API.sku.reqSkuInfo(this.page, this.limit)
        if (res.code === 200) {
          this.data = res.data.records
          this.total = res.data.total
          this.loading = false
        }
      } catch (err) { console.log(err) }
    },
    handleSizeChange(size) {
      this.limit = size
      this.getSpuList()
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button {
    width: 30px;
    height: 30px;
    background: red;
    border-radius: 50%;
  }
</style>

<style scoped>
  .el-row .el-col-5 {
    font-size: 30px;
    /* font-weight: bold; */
    text-align: right;
    margin: 10px;
  }
  .el-row .el-col-16 {
    font-size: 20px;
    margin: 10px;
  }
</style>
