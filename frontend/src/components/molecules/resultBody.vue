<template>
<div id="voteBody">
    <h1 id="result">集計結果</h1>
    <h2 id="title">質問：{{questions.title}}</h2>
    <resultButtons id="voteButtons" :choices="questions.choices" @voteObj = "voteObj" />
    <br>
    <div id="buttons">
    <button id="refresh" @click="refreshClick">更新</button>
    <button id="qr">QRコード表示</button>
    </div>

</div>

</template>

<script>
import resultButtons from '@/components/molecules/resultButtons'

export default {
    components:{
        resultButtons,
        
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
#refresh,#qr{
    margin-left:2%;
}
</style>