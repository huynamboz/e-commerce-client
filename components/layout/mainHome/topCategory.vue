<template>
    <div class="cate-container">
        <div class="cate-content-main">
            <div class="cate-banner">
                <h1>Sản phẩm công nghệ</h1>
                <button>Xem thêm</button>
            </div>
            <div class="cate-content-list">


                <div class="item-cate-front card-item-sub">
                        <img src="~/assets/img/category/01.png" alt="" class="item-cate-img">
                        <p>Bình đựng nước</p>
                    </div>
                    <div class="item-cate-behind card-item-sub">
                        <img src="~/assets/img/category/02.png" alt="" class="item-cate-img">
                        <p>Tai nghe</p>
                    </div>
                    <div class="item-cate-front card-item-sub">
                        <img src="~/assets/img/category/03.png" alt="" class="item-cate-img">
                        <p>Bình đựng nước</p>
                    </div>
                    <div class="item-cate-behind card-item-sub">
                        <img src="~/assets/img/category/04.png" alt="" class="item-cate-img">
                        <p>Tai nghe</p>
                    </div>
                    <div class="item-cate-front card-item-sub">
                        <img src="~/assets/img/category/05.png" alt="" class="item-cate-img">
                        <p>Bình đựng nước</p>
                    </div>
                    <div class="item-cate-behind card-item-sub">
                        <img src="~/assets/img/category/06.png" alt="" class="item-cate-img">
                        <p>Tai nghe</p>
                    </div>
                    <div class="item-cate-front card-item-sub">
                        <img src="~/assets/img/category/07.png" alt="" class="item-cate-img">
                        <p>Bình đựng nước</p>
                    </div>
                    <div class="item-cate-behind card-item-sub">
                        <img src="~/assets/img/category/08.png" alt="" class="item-cate-img">
                        <p>Tai nghe</p>
                    </div>
                    <div class="item-cate-front card-item-sub">
                        <img src="~/assets/img/category/09.png" alt="" class="item-cate-img">
                        <p>Bình đựng nước</p>
                    </div>
                    <div class="item-cate-behind card-item-sub">
                        <img src="~/assets/img/category/10.png" alt="" class="item-cate-img">
                        <p>Tai nghe</p>
                    </div>


                


            </div>
        </div>


    



    </div>
</template>
<style lang="scss" scoped>
.cate-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.cate-content-main{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 30px;
    border-radius: 9px;
    background-color: #fff;

}
.cate-content-list{
    display: grid;
    grid-template-columns: repeat(5, 1fr);

}
.cate-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
.item-cate-front{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item-cate-behind{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.card-item-sub{
    padding: 20px;
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    border: 1px solid #eaeaea;
    &:hover{
        // make box shadow
        cursor: pointer;
        box-shadow: 0 0 20px 2px rgb(219 219 219 / 47%);
        transition: all 0.3s ease-in-out;
    }
}
.cate-banner{
    background: url(~/assets/img/category/bg2.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 370px;
    width: 370px;
    & > h1{
        margin-top: 20%;
        width: 200px;
        font-weight: 500;
        margin-left: 20px;
    }
    & > button {
        margin-left: 20px;
        margin-top: 20px;
        background: #fff;
        border: 1px solid #eaeaea;
        padding: 10px 20px;
        border-radius: 5px;
        width: 120px;
        font-size: 16px;
        font-weight: 500;
        &:hover{
            background: #eaeaea;
            transition: all 0.3s ease-in-out;
        }
        border: none;
    }
}



.cate-banner-2{
    background: url(~/assets/img/category/bg.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 370px;
    width: 370px;
    & > h1{
        margin-top: 20%;
        width: 200px;
        font-weight: 500;
        margin-left: 20px;
    }
    & > button {
        margin-left: 20px;
        margin-top: 20px;
        background: #fff;
        border: 1px solid #eaeaea;
        padding: 10px 20px;
        border-radius: 5px;
        width: 120px;
        font-size: 16px;
        &:hover{
            background: #eaeaea;
            transition: all 0.3s ease-in-out;
        }
        border: none;
    }
}
</style>