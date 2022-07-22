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
            axios.post('http://localhost:3000/apis/create',{
                title:payload.title,
                choice:payload.choice
            })
            .then(response=>console.log(response))
            .catch(error=>console.log(error));
        }
    }
}
</script>