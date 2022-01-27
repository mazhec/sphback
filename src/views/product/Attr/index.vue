<template>
  <div>
    <el-card style="margin-bottom: 20px;">
      <CategorySelect :disable="!isShowTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button :disabled="attrList.length === 0" style="margin-bottom: 20px;" type="primary" icon="el-icon-plus" @click="addAttr">添加属性</el-button>
        <el-table :data="attrList" border>
          <el-table-column type="index" label="序号" align="center" width="70" />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column prop="" label="属性值列表" width="">
            <template slot-scope="{ row }">
              <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success" style="margin-right: 10px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="180" align="center">
            <template slot-scope="{ row }">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrInfo.attrName" type="primary" icon="el-icon-plus" @click="addAttrValue">添加属性值</el-button>
        <el-button>取消</el-button>
        <el-table border style="margin: 20px 0;" :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80" />
          <el-table-column prop="" label="属性值名称" width="">
            <template slot-scope="{ row, $index }">
              <el-input v-show="row.flag" :ref="`attrInput${$index}`" v-model="row.valueName" size="mini" placeholder="请输入属性值名称" @keydown.native.enter="showSpan(row, $index)" @blur="showSpan(row, $index)" />
              <span v-show="!row.flag" style="display: block; width: 100%;" @click="showInput(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}？`"
                @onConfirm="attrValueDelete($index)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button :disabled="attrInfo.attrValueList.length === 0" type="primary" @click="addOrUpdateAttr">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [
          // {
          //   attrId: '',
          //   valueName: ''
          // }
        ],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
    // 更新或添加属性
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      // 发请求
      try {
        const res = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        if (res.code === 200) {
          // console.log(res)
          this.$message.success('保存成功')
          this.isShowTable = true
          this.getAttrList()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除属性值
    attrValueDelete(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 显示span
    showSpan(row, index) {
      if (row.valueName.trim() === '') {
        // this.$message.info('请输入正常的属性值')
        return
      }

      const isRepat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) return row.valueName === item.valueName
      })
      if (isRepat) {
        this.attrInfo.attrValueList.splice(index, 1)
        this.$message.info('该属性已存在')
        return
      }
      row.flag = false
    },
    // 显示input
    showInput(row, index) {
      console.log('showInput')
      row.flag = true
      this.$nextTick(() => {
        this.$refs['attrInput' + index].focus()
      })
    },
    // 修改属性
    handleEdit(row) {
      // console.log(row)
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        // item.flag = false
        this.$set(item, 'flag', false)
      })
    },
    // 添加属性
    addAttr() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: '',
        attrValueList: [
          // {
          //   attrId: '',
          //   valueName: ''
          // }
        ],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs['attrInput' + (this.attrInfo.attrValueList.length - 1)].focus()
      })
    },
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.attrList = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.attrList = []
      } else {
        this.category3Id = categoryId
        this.getAttrList()
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      try {
        const res = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
        // console.log(res)
        if (res.code === 200) {
          this.attrList = res.data
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
