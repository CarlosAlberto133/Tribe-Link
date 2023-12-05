<template>
    <div class="container px-7 mt-5">
        <div class="offset-2 col-8 mb-5 position">
            <div class="card">
                <form>
                    <div class="input-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Nome da comunidade..." 
                            aria-label="nome da comunidade"
                            v-model="name"
                        >
                        <button 
                            type="button"
                            class="btn btn-success"
                            @click="handleSearch"
                        >
                            <img class="search" src="@/assets/IconSearch.svg" />
                            Buscar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchVue',
    data() {
        return {
            name: '',
            currentPage: 0,
            pageSize: 3
        }
    },
    methods: {
        handleSearch() {
            const { name, currentPage, pageSize } = this
            this.$emit('search', name, currentPage, pageSize)
        }
    }
}
</script>

<style scoped>
.card {
    box-shadow: 3px 10px 15px -3px rgba(0,0,0,0.1);
    border: none;
    min-width: 300px;
}
</style>