<template>
  <el-card class="clearfix">
    <div slot="header" class="header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts />
        </el-col>
        <el-col :span="12">
          <LineCharts />
        </el-col>
      </el-row>
      <el-table
        style="margin-top: 20px;"
        border
        :data="tableData"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="date"
          label="排名"
        />
        <el-table-column
          prop="name"
          label="搜索关键字"
        />
        <el-table-column
          prop="address"
          sortable
          label="用户数"
        />
        <el-table-column
          prop="address"
          sortable
          label="周涨幅"
        />
      </el-table>
      <el-pagination
        style="text-align: right; margin-top: 10px;"
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
  </el-card>
</template>

<script>
import LineCharts from './LineCharts'
export default {
  components: {
    LineCharts
  },
  data() {
    return {
      tableData: [{ date: 1 }]
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
