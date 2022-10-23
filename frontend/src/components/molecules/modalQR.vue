<template>
    <div id="overlay">
        <div id="content">
            <div id="qrcode"></div>
        </div>
    </div>
</template>

<script>
import qr from '@/lib/qrcode'
export default{
    created(){
            let qR = qr("qrcode",{
            text:window.location,
            width:128,height:128,
            colorDark:"#000000",
            colorLight:"#ffffff",
            correctLevel:QRCode.correctLevel.H
        });
    }
}
</script>

<style scoped>
</style>