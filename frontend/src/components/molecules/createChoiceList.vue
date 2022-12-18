<template>
    <div id="choiceList">
        <div v-for="(choice,index) in choiceList" :key="choice.value">
            <input type="text" :value = choice.value @input="inputAtt($event,index)" >
            <button @click="deleteChoice(index)">削除{{index}}</button>
        </div>
        <button @click="addChoice">追加</button>
    </div>
</template>
<script>
export default {
    props:['choiceList'],
    methods:{
        addChoice(){
            this.$emit("addChoice");
        },
        deleteChoice(index){
            this.$emit("deleteChoice",index)
        },
        inputAtt(e,index){
            this.$emit("inputAtt",index,e.target.value)
        }
    }
}
</script>