<template>
    <div class="search-container">
        <input type="text" placeholder="search" class="search-input">
        <button class="btn-search">Search</button>
    </div>
</template>
<script>
</script>
<style lang="scss" scoped>
button{
    background-color: #0D6EFD;
    color: white;
    border: none;
    margin: 0;
    padding: 10px 20px;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
    }
}
input{
    margin: 0;
    all : unset;
}
.search-input{
    border: none;
    padding: 0px 20px;
    border-radius: 6px;
    width: 100%;
}
.search-container{
    display: flex;
    border: 2px solid #0D6EFD;
    align-items: center;
    border-radius: 6px;
    width: 500px;
    height: 35px;
}
</style>