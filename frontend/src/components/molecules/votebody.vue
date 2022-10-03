<template>
<div id="voteBody">
    <h1>{{questions.title}}</h1>
    <voteButtons :choices="questions.choices" @voteObj = "voteObj"/>
    <br>
    <button @click="refreshClick">更新</button>
</div>

</template>

<script>
import voteButtons from '@/components/molecules/voteButtons'
export default {
    components:{
        voteButtons
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
<style >
</style>