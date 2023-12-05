<template>
    <div class="navbarHeight">
        <nav class="navbar p-0">
            <div class="container">
                <a class="navbar-brand p-0 title" href="/">Tribelink</a>

                <div>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/create">
                                <img class="more" src="@/assets/More.svg" />
                                criar
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.title {
    color: #006f40;
    font-size: 40px;
    font-weight: bold;
}

a {
    color: #006f40;
}

.navbarHeight {
    height: 70px;
}

@media (max-width: 520px) {
    .title {
        font-size: 30px;
    }
    .navbarHeight {
        height: 40px;
    }
}
</style>