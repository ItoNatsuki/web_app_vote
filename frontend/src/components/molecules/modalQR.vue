<template>
    <div id="modalButton">
        <button id="modal" @click="openModal">QRコード</button>
        <div id="overlay" v-show="showContent">
            <div id="content">
                <qrcode id="qr"/>
                <button id="close" @click="closeModal">閉じる</button>
            </div>
        </div>
    </div>
</template>

<script>
import qrcode from'@/components/atoms/qrcode'
export default{
    data(){
        return{
            showContent: false
        };
    },
    components:{
        qrcode
    },
    methods:{
        openModal(){
            this.showContent = true;
        },
        closeModal(){
            this.showContent = false;
        }
    }
}

</script>

<style scoped>
#overlay{
    z-index:1;

    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}
#content{
    background-color:rgb(207, 207, 207);
    padding:2%;
}
#qr,#close,#urlCopy{
    margin:5% 0 5% 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>