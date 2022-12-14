<template>
<div id="header">
    <span id="title">FreedomWebPoll</span>

    <modal-settings  @sendAddChoice="sendAddChoice"></modal-settings>
</div>
</template>

<script>
import modalSettings from '@/components/molecules/modalSettings'
export default{
    components:{
        modalSettings
    },
    methods:{
        sendAddChoice(){
            this.$emit("sendAddChoice")
        }
    }
}
</script>

<style scoped>
#title{
    margin-left: 2%;
    font-size: 225%;
    color: #b2ce55;
}
#header{
    top: 0;
    right: 0; 
    width:100%;
    height: 70px;
    background-color: #3f706e;
}

</style>