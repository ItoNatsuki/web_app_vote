<template>
<div id="header">
    <span id="title">FreedomWebPoll</span>
     <formLink/>
</div>
</template>

<script>
import formLink from '@/components/atoms/formLink'
export default{
    components:{
        formLink
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
    width:100%;
    height: 70px;
    background-color: #3f706e;
}
</style>