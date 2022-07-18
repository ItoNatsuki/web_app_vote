<template>
    <div id="choiceList">
        <div v-for="(choice,index) in choiceList">
            <input type="text" v-model="choice.value">
            <button @click="deleteChoice(index)">削除</button>
        </div>
        <button @click="addChoice">追加</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            choiceList:[{value:""},{value:""}]
        }
    },
    methods:{
        addChoice(){
            this.choiceList.push({value:""});
        },
        deleteChoice(index){
            this.choiceList.splice(index,1);
        }
    }
}
</script>