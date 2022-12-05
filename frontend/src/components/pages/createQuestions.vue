<template>
<createQuestions  @submitQuestion="submitQuestion" />
</template>

<script>
import createQuestions from '@/components/templates/createQuestions'
export default{
    components:{
        createQuestions
    },
    methods:{
        submitQuestion(payload){
            if(payload.choice.length < 2){
                alert("選択肢は二つ以上作成してください。")
                return;
            }
            if(payload.title === ""){
                alert("タイトルを入力してください")
                return;
            }
            this.$axios_inst.post('/create',{
                title:payload.title,
                choice:payload.choice
            })
            .then(response=>{
                const questionsId = response.data.questionsId;
                window.location.href = `${this.$base_url}/question/vote/${questionsId}`
            })
            .catch(error=>console.log(error));
        }
    }
}
</script>