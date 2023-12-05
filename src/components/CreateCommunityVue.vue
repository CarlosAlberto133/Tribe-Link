<template>
    <div class="container px-7 mt-5">
        <div class="row">
            <div class="offset-2 col-8 mb-2 position">
                <div>
                    <AlertMsgVue :msg="msg" v-show="msg"></AlertMsgVue>
                </div>
                <div class="card p-3">
                    <h2><b>Nova comunidade</b></h2>
                    <form method="post" @submit="createCommunity">
                        <div class="mb-3">
                            <p class="form-label mb-0">Nome da comunidade</p>
                            <span v-show="errorName">*Nome da comunidade obrigatório!</span>
                            <input 
                                type="text" 
                                v-model="name" 
                                class="form-control" 
                                :class="{ errorNameInput: errorNameInput }"
                                id="name"
                            />
                        </div>
                        <div class="mb-3">
                            <p class="form-label mb-0">Descrição da comunidade</p>
                            <span v-show="errorDescription">*Descrição da comunidade obrigatório!</span>
                            <textarea 
                                type="text" 
                                v-model="description" 
                                class="form-control description" 
                                id="description"
                                :class="{ errorDescriptionInput: errorDescriptionInput }"
                                @input="updateDescriptionLength"
                                @keydown="checkRemainingChars($event)"
                            >
                            </textarea>
                            <p 
                                id="description" 
                                class="form-text"
                            >
                                Descreva o nome da comunidade. Máximo de {{ remainingChars }} caracteres
                            </p>
                        </div>
                        <div class="mb-3">
                            <p class="form-label">Link do chat</p>
                            <input 
                                type="text" 
                                v-model="chatLink" 
                                class="form-control" 
                                id="chatLink"
                            />
                            <div 
                                id="emailHelp" 
                                class="form-text"
                            >
                                Link do grupo no Telegram, Discord, ou outro ponto de encontro.
                            </div>
                        </div>
                        <div class="mb-3">
                            <p class="form-label">E-mail do fundador</p>
                            <input 
                                type="email" 
                                v-model="ownerEmail" 
                                class="form-control" 
                                id="ownerEmail" 
                            />
                            <div 
                                id="emailHelp" 
                                class="form-text"
                            >
                                Nunca compartilharemos seu e-mail com mais ninguém.
                            </div>
                        </div>
                        <div class="btnContainer">
                            <div class="checkboxContainer">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-model="checkboxChecked"
                                    @click="startAnimation"
                                    
                                />
                                <p class="nameCheckbox">
                                    Não sou um robô
                                </p>
                                <div :class="{ loading: checkboxLoading }"></div>
                            </div>
                            <button id="disablede" type="submit" :disabled="btnDisabled" class="btn btn-success">
                                <img src="@/assets/moreWhite.svg" />
                                criar
                            </button>
                        </div>
                    </form>
                </div><!--card-->
            </div><!--offset-->
        </div><!--row-->
        <div class="row">
            <div class="offset-2 col-8 mb-5 p-3 back">
                <a href="/">
                    <img src="@/assets/back.svg" />
                    voltar
                </a>
            </div>
        </div>
    </div><!--container-->
</template>

<script>
import api from '@/services/api.js'
import router from '@/router'
import AlertMsgVue from '@/components/AlertMsgVue.vue'

export default {
    name: 'CreateCommunityVue',
    components: {
        AlertMsgVue
    },
    data() {
        return {
            name: '',
            description: '',
            chatLink: '',
            ownerEmail: '',
            msg: '',
            showOwnerEmail: false,
            errorName: false,
            errorDescription: false,
            errorNameInput: false,
            checkboxChecked: false,
            btnDisabled: true,
            checkboxLoading: false,
            errorDescriptionInput: false,
            maxDescriptionLength: 800,
            remainingChars: 800
        }
    },
    methods: {
        checkRemainingChars(event) {
            if (this.remainingChars <= 0 && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
            }
        },
        updateDescriptionLength() {
            this.remainingChars = this.maxDescriptionLength - this.description.length;
            this.remainingChars = Math.max(this.remainingChars, 0);
        },
        async createCommunity(e) {
            e.preventDefault()
                
            if (this.name === "") {
                this.errorName = true
                this.errorNameInput = true
                setTimeout(() => this.errorName = false, 3000)

            } else if (this.name.length < 3) {
                this.msg = "Mínimo de 3 caracteres!"
                setTimeout(() => this.msg = "", 3000)
                this.errorNameInput = true

            } else if (this.description === "") {
                this.errorDescription = true
                this.errorDescriptionInput = true
                setTimeout(() => this.errorDescription = false, 3000)

            } else if (this.description.length < 3) {
                this.msg = "Mínimo de 3 caracteres!"
                this.errorDescriptionInput = true
                setTimeout(() => this.msg = "", 3000)

            } else {
                const { data, error } = await api.from('community').insert([
                    {
                        name: this.name,
                        description: this.description,
                        chatLink: this.chatLink,
                        ownerEmail: this.ownerEmail
                    },
                ]);
                if (error) {
                    this.msg = 'Erro ao buscar comunidades:', error;
                    return;
                }

                this.msg = 'Comunidade criada com sucesso!', data

                setTimeout(() => {
                    this.msg= "",
                    router.push('/');
                }, 3000)

                this.name= '',
                this.description= '',
                this.chatLink= '',
                this.ownerEmail= '',
                this.showOwnerEmail= false,
                this.errorNameInput= false,
                this.errorDescriptionInput= false
                this.remainingChars= 800
            }
        },
        
        startAnimation() {
            this.checkboxLoading = true;
            setTimeout(() => {
                if (this.checkboxChecked === true) {
                    this.checkboxLoading = false;
                    this.btnDisabled = false;
                }
                if (this.checkboxChecked === false) {
                    this.checkboxLoading = false;
                    this.btnDisabled = true;
                }
            }, 2000);
        },
    }
}
</script>

<style scoped>
.card {
    box-shadow: 3px 10px 15px -3px rgba(0,0,0,0.1);
    border: none;
    min-width: 300px;
}
a {
    list-style: none;
}
span {
    color: red;
    font-size: 14px;
}
.errorNameInput,
.errorDescriptionInput {
    border: 1px solid red;
}
.description {
    height: 130px;
    resize: none;
}
.btnContainer {
    display: flex;
    justify-content: space-between;
}
.btn:disabled {
    opacity: 0.5;
}
.checkboxContainer {
    display: flex;
}

.nameCheckbox {
    display: flex;
    align-items: center;
    margin-left: 7px;
}

.loading {
    pointer-events: none;
    opacity: 0.6;
}

.loading::after {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 5px 0 0 10px;
    border-radius: 50%;
    border: 3px solid #ccc;
    border-top-color: #333;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>