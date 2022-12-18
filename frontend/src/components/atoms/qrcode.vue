<template>
        <div id="content">
            <div id="qrcode"></div>
        </div>
</template>

<script>
export default{
    mounted(){
        new window.QRCode(document.getElementById("qrcode"),{
            text:`${this.$base_url}/vote/${this.$route.params.id}`,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
}
</script>

<style scoped>
    #qrcode,#content{
        width:128px;
        height: 128px;
        margin:none;
    }
</style>