<template>
<div id="header">
    <span id="title">FreedomWebPoll</span>
    <formLink/>
    <modal-settings  @input="sendAddChoice" :checked="checked"></modal-settings>
</div>
</template>

<script>
import modalSettings from '@/components/molecules/modalSettings'
import formLink from '@/components/atoms/formLink'
export default{
    components:{
        modalSettings,
        formLink
    },
    props:[
        'checked'
    ],
    methods:{
        sendAddChoice(){
            this.$emit("input")
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