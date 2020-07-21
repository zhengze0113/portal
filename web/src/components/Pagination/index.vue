<template>
  <div>
    <el-pagination
      class="tr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="metadata.number"
      :page-sizes="[5,10, 20, 50]"
      :page-size="10"
      layout="total,sizes,prev,pager,next,jumper"
      :total="metadata.totalElements"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableChange: {
      type: Function,
      default: null
    },
    metadata: {
      type: Object,
      default: () => ({ totalElements: 0, number: 1 })
    }
  },
  data() {
    return {};
  },
  watch: {
    metadata: function(val) {}
  },
  methods: {
    // 每页的条数
    handleSizeChange(size) {
      this.tableChange({ rows: size, page: 1 });
    },
    // 换页的
    handleCurrentChange(page) {
      this.metadata.page = page;
      this.tableChange(this.metadata);
    }
  }
};
</script>
<style lang="scss">
</style>
