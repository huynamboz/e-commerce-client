<template>
    <div class="search-container">
        <div class="icon-search">
        <i class="fi fi-rr-search"></i>
        </div>
        <input type="text" placeholder="search" class="search-input">
    </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.btn-search{
    color: white;
    border: none;
    margin: 0;
    width: 20px;
    height: 20px;
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
    padding: 0 20px;
    display: flex;
    border: 1.5px solid #afb6cf;
    align-items: center;
    border-radius: 6px;
    width: 500px;
    height: 35px;
}
.icon-search{
    margin-top: 5px;
    font-size: 20px;
    color: #afb6cf;
}
</style>