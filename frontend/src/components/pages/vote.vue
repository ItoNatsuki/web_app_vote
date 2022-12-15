<template>
<div>
<vote-header></vote-header>
    <vote-body :questions="questions" :addChoiceFlg ="addChoiceFlg" :addChoiceValue="addChoiceValue" 
    @choiceAddInput="choiceAddInput" @submitAddChoice="submitAddChoice" @vote="vote" @refreshClick="refreshClick"/>
</div>

</template>

<script>
import voteHeader from '@/components/molecules/voteHeader'
import voteBody from '@/components/molecules/votebody'
export default{
    data(){
        return{
            questions:{},
            intervalId:undefined,
            addChoiceFlg:false,
            addChoiceValue:""
        }
    },
    components:{
        voteBody,
        voteHeader
    },
    created(){
        //画面構築用質問データ問い合わせ
            this.$axios_inst.get(`/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                if(this.questions.deadlineFlag){
                    window.location.href = `${this.$base_url}/vote/result/${this.$route.params.id}`
                }
            })
            .catch(error=>console.log(error));
    },
    //投票状況確認用ポーリング処理
    mounted(){
        this.intervalId = setInterval(()=>{
        
        this.$axios_inst.get(`/${this.$route.params.id}`)
        .then(response=>{
            const questionsData = response.data;
            this.questions = questionsData.questions[0];
            const tmp = questionsData.settings[1]; 
            const settingFlgs = Object.values(tmp);
            this.addChoiceFlg = settingFlgs[0];
            if(this.questions.deadlineFlag){
                window.location.href = `${this.$base_url}/vote/result/${this.$route.params.id}`
            }
        }).catch(err=>{
            window.alert(err.response.data);
            clearInterval(this.intervalId);
        })
        },3000)
    },
    //ページ遷移時、setInterval削除
    beforeDestroy(){
        clearInterval(this.intervalId);
    },
    methods:{
        //投票ボタンが押された際のAPI問い合わせ
        vote(payload){
            this.$axios_inst.put(`/vote/add/${this.$route.params.id}`,{id:payload.voteChoiceId})
            .then(response => {
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                //投票していた選択肢がある場合のキャンセル処理
                if(payload.beforeChoiceId){
                    this.$axios_inst.put(`/vote/sub/${this.$route.params.id}`,{id:payload.beforeChoiceId})
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
        this.$axios_inst.get(`/${this.$route.params.id}`)
        .then(response=>{
            const questionsData = response.data;
            this.questions = questionsData.questions[0];
                if(this.questions.deadline){
                    window.location.href = `${this.$base_url}/vote/result/${this.$route.params.id}`
                }
        })
        },
        submitAddChoice(){
            this.$axios_inst.put(`/addChoice/${this.$route.params.id}`,{content:this.addChoiceValue})
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                this.addChoiceValue = ""
            }).catch(error=>{
                if(error.response.status === 404){
                    window.alert(error.response.data);
                    clearInterval(this.intervalId);
                    return;
                }
            })
        },
        choiceAddInput(value){
            this.addChoiceValue = value;
        }
    }
}
</script>