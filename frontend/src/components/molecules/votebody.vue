<template>
<div id="voteBody">
    <h1 id="title">{{questions.title}}</h1>
    <voteButtons id="voteButtons" :choices="questions.choices" @voteObj = "voteObj"/>
    <br>
    <div id="buttons">
    <button id="refresh" @click="refreshClick">更新</button>
    <modalQR/>
    </div>

</div>

</template>

<script>
import voteButtons from '@/components/molecules/voteButtons'
import modalQR from '@/components/molecules/modalQR'
export default {
    components:{
        voteButtons,
        modalQR
    },
    props:['questions'],
    methods:{
        voteObj(payload){
            this.$emit("vote",payload)
        },
        refreshClick(){
            this.$emit("refreshClick");
        }
    }
}
</script>
<style scoped>
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