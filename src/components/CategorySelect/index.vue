<template>
  <div>
    <el-form :model="cForm" :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" :disabled="disable" placeholder="请选择" @change="handle1">
          <el-option v-for="category1 in list1" :key="category1.id" :label="category1.name" :value="category1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" :disabled="disable" placeholder="请选择" @change="handle2">
          <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" :disabled="disable" placeholder="请选择" @change="handle3">
          <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button :disabled="disable" type="primary">查询</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    disable: {
      type: Boolean
    }
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List() {
      try {
        const res = await this.$API.attr.reqCategory1List()
        // console.log(res)
        if (res.code === 200) this.list1 = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async handle1(id) {
      this.$emit('getCategoryId', { categoryId: id, level: 1 })
      try {
        const res = await this.$API.attr.reqCategory2List(id)
        // console.log(res)
        if (res.code === 200) {
          this.list2 = []
          this.list3 = []
          this.cForm.category2Id = ''
          this.cForm.category3Id = ''
          this.list2 = res.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    async handle2(id) {
      this.$emit('getCategoryId', { categoryId: id, level: 2 })
      try {
        const res = await this.$API.attr.reqCategory3List(id)
        if (res.code === 200) {
          this.list3 = []
          this.cForm.category3Id = ''
          this.list3 = res.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    handle3(id) {
      this.$emit('getCategoryId', { categoryId: id, level: 3 })
    }
  }
}
</script>

<style>

</style>
