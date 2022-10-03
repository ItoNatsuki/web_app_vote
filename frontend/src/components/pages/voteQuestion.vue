<template>
<div>
    <vote-body :questions="questions" @vote="vote" @refreshClick="refreshClick"/>
    <button @click="questionDelete">質問の削除</button>
</div>

</template>

<script>
import voteBody from '@/components/molecules/votebody'
import axios from "axios";
export default{
    data(){
        return{
            questions:{}
        }
    },
    components:{
        voteBody
    },
    created(){
        axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
            })
            .catch(error=>console.log(error));
    },
    methods:{
        vote(payload){
            axios.put(`http://localhost:3000/apis/vote/add/${this.$route.params.id}`,{id:payload.voteChoiceId})
            .then(response => {
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                if(payload.beforeChoiceId){
                    axios.put(`http://localhost:3000/apis/vote/sub/${this.$route.params.id}`,{id:payload.beforeChoiceId})
                    .then(response =>{
                        const questionsData = response.data;
                        this.questions = questionsData.questions[0];
                    })
                    .catch(error=>{console.log(error)});
                }
            }).catch(error=>{console.log(error)});
        },
        refreshClick(){
            axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
            })
        },
        questionDelete(){
            axios.delete(`http://localhost:3000/apis/${this.$route.params.id}`)
            .then(response =>{
                console.log("aaa")
                window.location.href = `http://localhost:8080/#/`;
            }).catch(error=>console.log(error));
        }
    },

    }
</script>