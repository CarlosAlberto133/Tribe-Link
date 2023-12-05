<template>
    <div id="paginacao">
      <button
        v-if="showPrevious"
        class="item prev"
        @click="changePage(currentPage - 1)"
      >
        &laquo;
      </button>
  
      <button
        v-for="(page, index) in pages"
        :key="index"
        class="item"
        :class="{ current: page === current }"
        @click="changePage(index)"
      >
        {{ page }}
      </button>
  
      <button
        v-if="showNext"
        class="item next"
        @click="changePage(currentPage + 1)"
      >
        &raquo;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "PaginationVue",
    props: {
      currentPage: {
        type: [String, Number],
        default: 0,
      },
      totalPages: {
        type: [String, Number],
        required: true,
      },
      pageSize: {
        type: [String, Number],
        default: 3,
      },
    },
    computed: {
      showPrevious() {
        return this.current > 1;
      },
      showNext() {
        return this.current < this.totalPages;
      },
      current() {
        return this.currentPage ? this.currentPage + 1 : 1;
      },
      pages() {
        const max = 10;
        const qty = this.totalPages;
  
        if (qty <= 1) return [1];
  
        if (qty > max) {
          const firstPages = Array.from(Array(max).keys(), (i) => i + 1);
          const ellipsis = ["..."];
  
          return [...firstPages, ...ellipsis];
        }
  
        return Array.from(Array(qty).keys(), (i) => i + 1);
      },
    },
    methods: {
      changePage(currentPage) {
        this.$emit("change-page", currentPage);
      },
    },
  };
  </script>

<style scoped>
.item {
    padding: 0.5rem 0.75rem;
    border: none;
    cursor: pointer;
    background-color: #F8F9FA;
    color: #0D6EFD;
}
.item:hover {
    text-decoration: underline;
    color: #0D6EFD;
}
.item.current {
    cursor: default;
    text-decoration: underline;
}
.item {
    margin-left: -1px;
    margin-top: 10px;
}

</style>