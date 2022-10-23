<template>
<div>
    <vote-body :questions="questions" @vote="vote" @refreshClick="refreshClick" />
    <div id="buttonsQ">
        <button id="deleteQ" @click="questionDelete">質問の削除</button>
        <button id="deadline" @click="deadline">質問を締め切る</button>
    </div>
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
            .catch(error=>console.log(error.response.data));
    },
    //投票状況確認用ポーリング処理
    mounted(){
        this.intervalId = setInterval(()=>{
        axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
        .then(response=>{
            const questionsData = response.data;
            this.questions = questionsData.questions[0];
        }).catch(error=>{
            window.alert(error.response.data)
            });    
        },3000)
    },
    //ページ遷移時、setInterval削除
    beforeDestroy(){
        clearInterval(this.intervalId);
    },
    methods:{
        vote(payload){
            //投票ボタンが押された際のAPI問い合わせ
            axios.put(`http://localhost:3000/apis/vote/add/${this.$route.params.id}`,{id:payload.voteChoiceId})
            .then(response => {
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                //投票していた選択肢がある場合のキャンセル処理
                if(payload.beforeChoiceId){
                    axios.put(`http://localhost:3000/apis/vote/sub/${this.$route.params.id}`,{id:payload.beforeChoiceId})
                    .then(response =>{
                        const questionsData = response.data;
                        this.questions = questionsData.questions[0];
                    })
                    .catch(error=>{window.alert(error.response.data)});
                }
            }).catch(error=>{window.alert(error.response.data)});
        },
        //更新
        refreshClick(){
            axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
            }).catch(error=>{window.alert(error.response.data)});
        },
        //質問の削除
        questionDelete(){
            axios.delete(`http://localhost:3000/apis/${this.$route.params.id}`)
            .then(response =>{
                window.location.href = `http://localhost:8080/#/`;
            }).catch(error=>{window.alert(error.response.data)});
        },
        deadline(){
            axios.post(`http://localhost:3000/apis/deadline/${this.$route.params.id}`)
            .then(response =>{
                window.location.href = `http://localhost:8080/#/question/result/${this.$route.params.id}`;
            }).catch(error=>{window.alert(error.response.data)})
        }
    },

    }
</script>
<style scoped>
#buttonsQ{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    margin-top: 2%;
}
#deleteQ,#deadline{
    margin-left: 2%;
}
</style>