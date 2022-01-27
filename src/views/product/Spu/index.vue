<template>
  <div>
    <el-card style="margin-bottom: 20px;">
      <CategorySelect :disable="scene !== 0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button :disabled="!category3Id" type="primary" icon="el-icon-plus" style="margin-bottom: 20px;" @click="addSpu">添加SPU</el-button>
        <el-table border :data="records">
          <el-table-column type="index" align="center" label="序号" width="80" />
          <el-table-column prop="spuName" label="spu名称" width="" />
          <el-table-column prop="description" label="spu描述" width="" />
          <el-table-column label="操作" width="">
            <template slot-scope="{ row }">
              <el-tooltip class="item" effect="dark" content="添加SKU" placement="top">
                <el-button type="success" size="mini" icon="el-icon-plus" @click="addSku(row)" />
              </el-tooltip>
              <HintButton type="warning" size="mini" icon="el-icon-edit" title="修改SPU" @click.native="update(row)" />
              <HintButton type="info" size="mini" icon="el-icon-info" title="查看当前spu的sku列表" @click.native="handle(row)" />
              <el-tooltip class="item" effect="dark" :row="row" content="删除spu" placement="top">
                <el-popconfirm
                  :title="`确定删除${row.spuName}？`"
                  @onConfirm="deleteSpu(row.id)"
                >
                  <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" />
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center;"
          :current-page="page"
          :page-sizes="[2, 4, 6]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        />
      </div>
      <SpuForm v-show="scene === 1" ref="spu" @ChangeScene="ChangeScene" />
      <SkuForm v-show="scene === 2" ref="sku" @ChangeScene="ChangeScene" />
    </el-card>
    <el-dialog :title="`${spuName}的列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table v-loading="loading" :data="spuInfoList">
        <el-table-column property="skuName" label="名称" />
        <el-table-column property="price" label="价格" />
        <el-table-column property="weight" label="重量" />
        <el-table-column property="skuDefaultImg" label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 40%;" alt="">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      disable: true,
      page: 1,
      limit: 2,
      records: [],
      total: 0,
      scene: 0,
      dialogTableVisible: false,
      spuInfoList: [],
      spuName: '',
      loading: true
    }
  },
  methods: {
    close(done) {
      this.spuInfoList = []
      this.loading = true
      done()
    },
    async handle(row) {
      this.dialogTableVisible = true
      this.spuName = row.spuName
      try {
        const res = await this.$API.spu.reqkuInfoById(row.id)
        if (res.code === 200) {
          this.spuInfoList = res.data
          this.loading = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    // 删除spu
    async deleteSpu(spuId) {
      try {
        const res = await this.$API.spu.reqDeleteSpu(spuId)
        console.log(res)
        if (res.code === 200) this.$message.success('删除成功')
        this.getSpuList(this.records.length > 1 ? this.page : (this.page > 1 ? this.page - 1 : 1))
      } catch (err) { console.log(err) }
    },
    ChangeScene(type) {
      this.scene = 0
      type === 'update' ? this.getSpuList(this.page) : this.getSpuList()
    },
    // 修改某一个spu
    update(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 当前页改变时的回调
    // handleCurrentChange(page) {
    //   // console.log(page)
    //   this.getSpuList(page)
    // },
    // 每页显示大小发生变化时的回调
    handleSizeChange(size) {
      this.limit = size
      this.getSpuList()
    },
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.records = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.records = []
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    async getSpuList(page = 1) {
      this.page = page
      try {
        const res = await this.$API.spu.reqSpuList(this.page, this.limit, this.category3Id)
        // console.log(res)
        if (res.code === 200) {
          this.records = res.data.records
          this.total = res.data.total
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
