<template>
  <div>
    <el-button type="primary" style="margin-bottom: 20px;" icon="el-icon-plus" @click="showDialog">添加</el-button>
    <el-table :data="data" border>
      <el-table-column prop="id" label="序号" align="center" width="80" />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(row.id)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center;"
      :current-page="page"
      :page-sizes="[5, 10, 15]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getPageList"
    />

    <!-- 对话框 -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" style="width: 80%;" :model="tmForm" :rules="rules">
        <el-form-item prop="tmName" label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    const validateTmName = (rule, value, cb) => {
      if (value.length < 2 || value.length > 100) {
        cb(new Error('品牌名称2-100位'))
      } else {
        cb()
      }
    }
    return {
      data: [],
      page: 1,
      limit: 5,
      total: 0,
      dialogFormVisible: false,
      form: {},
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          { validator: validateTmName, trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ]
      }
    }
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList()
  },
  methods: {
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(valid) => {
        console.log(valid)
        if (valid) {
          this.dialogFormVisible = false
          try {
            const res = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
            console.log(res)
            if (res.code === 200) {
              this.$message.success(this.tmForm.id ? '修改成功' : '添加成功')
              this.getPageList(this.page)
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          return false
        }
      })
    },
    showDialog() {
      this.dialogFormVisible = true
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    handleAvatarSuccess(res, file) {
      // console.log('handleAvatarSuccess', res)
      // this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      this.tmForm.logoUrl = 'https://img2.baidu.com/it/u=1295585048,3683561916&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=312'
    },
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager
      const res = await this.$API.tradeMark.reqTradeMarkList(this.page, this.limit)
      this.data = res.data.records
      this.total = res.data.total
      // console.log(res)
    },

    handleSizeChange(pageSize) {
      // console.log(pageSize)
      this.limit = pageSize
      this.page = 1
      this.getPageList()
    },
    handleCurrentChange(page) {
      // console.log(page)
      this.page = page
      this.getPageList()
    },

    // 编辑
    async handleEdit(id) {
      this.dialogFormVisible = true
      try {
        const res = await this.$API.tradeMark.reqTradeMarkById(id)
        if (res.code === 200) this.tmForm = res.data
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    handleDelete(row) {
      this.$confirm(`你确定删除${row.tmName}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          const res = await this.$API.tradeMark.reqDelTradeMarkById(row.id)
          if (res.code === 200) {
            this.$message.success('删除成功!')
            this.getPageList(this.page)
            return
          }
          this.$message.error('删除失败！')
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
