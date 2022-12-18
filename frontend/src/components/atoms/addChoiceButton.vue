<template>
<div id="addChoiceButton">
    <label id="addChoiceLabel">
        <input type="button" id="addChoiceButton" name="choice" @click="openAddChoiceModal"><span name="title"  >選択肢を追加</span>
    </label>
</div>
</template>
<script>
export default{
    methods:{
        openAddChoiceModal(){
            this.$emit('openAddChoiceModal')
        }
    }
}
</script>
<style scoped>


[name="title"]{
    width:100%;
    height: 100%;
}

#addChoiceLabel input{
    display: none;

}

#addChoiceLabel span{
    text-align: center;
    display: inline-block;
    color: #333; 
    font-size: 20px; 
    border: 1px solid #333;
    padding: 1% 1%; 
}
#addChoiceButton{
    display: block;
    width: 170px;
    height: 100px;
    margin-bottom: 4%;
}
</style>