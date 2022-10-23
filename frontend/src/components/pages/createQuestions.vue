<template>
<createQuestions  @submitQuestion="submitQuestion" />
</template>

<script>
import createQuestions from '@/components/templates/createQuestions'
import axios from "axios";
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
            axios.post('http://localhost:3000/apis/create',{
                title:payload.title,
                choice:payload.choice
            })
            .then(response=>{
                const questionsId = response.data.questionsId;
                window.location.href = `http://localhost:8080/#/question/vote/${questionsId}`
            })
            .catch(error=>console.log(error));
        }
    }
}
</script>