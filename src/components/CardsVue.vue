<template>
    <div>
        <search-vue
            @search="searchCommunities"
        >
        </search-vue>

        <div class="container px-7 mt-5">
            <div class="offset-2 col-8 position">
                <div class="community-item">
                    <div>
                        <AlertMsgVue :msg="msg" v-show="msg"></AlertMsgVue>
                    </div>
                    <h2>{{ notFoundMessage }}</h2>
                    <a href="" class="backBtn" v-show="back">&laquo; voltar</a>
                    <div 
                        v-for="community in communities" 
                        :key="community.id"
                    >
                        <div class="card mb-2 p-4 border-0" :class="{ 'open': community.isOpen }">
                            <h5 class="card-title title" @click="toggleCard(community)">
                                <p class="mb-0"><span>{{ community.name }}</span></p>
                            </h5>
                            <transition>
                                <div v-if="community.isOpen || community.description.length <= 30">
                                    <p>{{ community.description }}</p>
                                    <p 
                                        class="chat" 
                                        v-if="community.chatLink"
                                    >
                                        chat: 
                                        <span 
                                            class="link" 
                                            @click="openChat(community.chatLink)"
                                        >
                                            {{ community.chatLink }}
                                        </span>
                                    </p>
                                </div>
                                <div v-else>
                                    <p>{{ community.description.slice(0, 30) }}...</p>
                                </div>
                            </transition>
                            <div class="d-flex justify-content-between">
                                <div>
                                    criada em: <span>{{ formatCreatedAt(community.createdAt) }}</span>
                                    <img class="m-1" src="@/assets/calendar.svg" />
                                </div>
                            </div>
                        </div><!--card-->
                    </div>
                    <div id="paginacao">
                        <pagination-vue
                            v-if="communities.length"
                            :currentPage="currentPage"
                            :totalPages="totalPages"
                            :pageSize="pageSize"
                            @change-page="changePage"
                            class="paginacaoBtn"
                        >
                        </pagination-vue>
                    </div>
                </div><!--communities-->
            </div>
        </div>
    </div>
</template>

<script>
import AlertMsgVue from '@/components/AlertMsgVue.vue';
import api from '@/services/api.js'
import moment from 'moment';
import PaginationVue from '@/components/pagination/PaginationVue.vue';
import SearchVue from '@/components/SearchVue.vue';

export default {
    name: 'CardsVue',
    components: {
        PaginationVue,
        SearchVue,
        AlertMsgVue
    },
    data() {
        return {
            currentPage: 0,
            pageSize: 3,
            communities: [],
            totalPages: 0,
            totalElements: 6,
            name: '',
            notFoundMessage: '',
            back: false,
            msg: null
        };
    },
    methods: {
        async getCommunities(size = this.pageSize) {
            try {
                const offset = this.currentPage * this.pageSize;
                const { data, error  } = await api
                    .from('community')
                    .select('*')
                    .range(offset, size)
                    .limit(this.pageSize);

                if (error) {
                    this.msg = 'Erro ao buscar comunidades', error;
                    return;
                }

                this.communities = data;
                
                const { data: totalData } = await api
                    .from('community')
                    .select('*')

                this.totalElements = totalData.length;
                this.totalPages = Math.ceil(this.totalElements / this.pageSize);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        },
        changePage(value) {
            this.currentPage = value;
            this.getCommunities()
        },
        async searchCommunities(name) {
            const { data, error } = await api
                .from('community')
                .select('*')
                .ilike('name', `${name}%`)

            if (error) {
                this.msg = 'Erro ao buscar comunidades:', error;
                return;
            }

            this.communities = data;

        },
        toggleCard(community) {
            community.isOpen = !community.isOpen;
        },
        openChat(link) {
            window.open(link, '_blank')
        },
        formatCreatedAt(createdAt) {
            return moment(createdAt).format('DD/MM/YYYY');
        },
    },
    mounted() {
        this.getCommunities()
    }
}
</script>

<style scoped>
.community-item a {
    color: #000;
    cursor: pointer;
    border: none;
    text-decoration: none;
}
.title {
    font-weight: bold;
    cursor: pointer;
}
#paginacao {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.chat {
    font-weight: bold;
}
.link {
    font-weight: 500;
    color: #0D6EFD;
    cursor: pointer;
}
.link:hover {
    text-decoration: underline;
}
.v-enter-from {
    opacity: 0;
}
.v-enter-active {
    transition: opacity 1s;
}
.v-enter-to {
    opacity: 1;
}
.card {
    box-shadow: 3px 10px 15px -3px rgba(0,0,0,0.1);
    border: none;
    min-width: 300px;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: 200px;
}

.open {
  max-height: 1000px;
}

</style>