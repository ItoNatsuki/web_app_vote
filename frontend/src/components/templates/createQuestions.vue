<template>
<section>
    <h3 id="title">作成したい質問内容を入力してください</h3>
    <inputQuestions @submitQuestion="submitQuestion"/>
</section>
</template>

<script>
import inputQuestions from '@/components/molecules/createQuestion'
export default{
    components:{
        inputQuestions
    },
    methods:{
        submitQuestion(payload){
            this.$emit("submitQuestion",payload);
        }
    }
}
</script>
<style scoped>
#title{
    text-align: center;
}
</style>