<template>
<div id="voteBody">
    <h1 id="result">集計結果</h1>
    <h2 id="title">質問：{{questions.title}}</h2>
    <resultButtons id="voteButtons" :choices="questions.choices" />
    <br>
    <div id="buttons">
    <button id="refresh" @click="refreshClick">更新</button>
    <modalQR/>
    </div>

</div>

</template>

<script>
import resultButtons from '@/components/molecules/resultButtons'
import modalQR from '@/components/molecules/modalQR'
export default {
    components:{
        resultButtons,
        modalQR
        
    },
    props:['questions'],
    methods:{
        refreshClick(){
            this.$emit("refreshClick");
        }
    }
}
</script>
<style scoped>
#result{
    text-align: center;
}
#title{
    text-align: center;
}
#voteButtons{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
#buttons{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
}
#refresh{
    margin-right:2%;
}
</style>