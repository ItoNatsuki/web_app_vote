<template>
<vote-body :questions="questions" @vote="vote" @refreshClick="refreshClick"/>
</template>

<script>
import voteBody from '@/components/molecules/votebody'
import axios from "axios";
export default{
    data(){
        return{
            questions:{},
            intervalId:undefined
        }
    },
    components:{
        voteBody
    },
    created(){
        //画面構築用質問データ問い合わせ
            axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
            })
            .catch(error=>console.log(error));
    },
    //投票状況確認用ポーリング処理
    mounted(){
        this.intervalId = setInterval(()=>{
        axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
        .then(response=>{
            const questionsData = response.data;
            this.questions = questionsData.questions[0];
        })},3000)
    },
    //ページ遷移時、setInterval削除
    beforeDestroy(){
        clearInterval(this.intervalId);
    },
    methods:{
        //投票ボタンが押された際のAPI問い合わせ
        vote(payload){
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
                    .catch(error=>console.log(error.response.body));
                }
            }).catch(error=>console.log(error.response.body));
        },
        //更新ボタンの処理
        refreshClick(){
        axios.get(`http://localhost:3000/apis/${this.$route.params.id}`)
        .then(response=>{
            const questionsData = response.data;
            this.questions = questionsData.questions[0];
        })
        }
    }
}
</script>