<template>
    <div class="message-container mt-0">
        <p class="mb-0">{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'CompMessagem',
    props: {
        msg: String
    }
}
</script>

<style scoped>
    .message-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #000;
        font-weight: 600;
        background-color: #fff;
        border: none;
        box-shadow: 3px 10px 15px -3px rgba(0,0,0,0.1);
        border-radius: 5px;
        padding: 5px;
        max-width: 400px;
        margin: 15px auto;
    }
</style>