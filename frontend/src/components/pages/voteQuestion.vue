<template>
<div>
    <question-header  :checked="checked" @input="sendAddChoice"></question-header>
    <vote-body id="voteBody" :questions="questions" :addChoiceFlg ="addChoiceFlg" :addChoiceValue="addChoiceValue" 
    @choiceAddInput="choiceAddInput" @submitAddChoice="submitAddChoice" @vote="vote" @refreshClick="refreshClick" />
    <div id="buttonsQ">
        <button id="deleteQ" @click="questionDelete">質問の削除</button>
        <button id="deadline" @click="deadline">質問を締め切る</button>
    </div>
</div>

</template>

<script>
import questionHeader from '@/components/molecules/questionHeader'
import voteBody from '@/components/molecules/votebody'
export default{
    data(){
        return{
            questions:{},
            intervalId:undefined,
            checked:false,
            addChoiceFlg:true,
            addChoiceValue:"",
        }
    },
    components:{
        voteBody,
        questionHeader
    },
    created(){
        this.$axios_inst.get(`/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                const tmp = questionsData.settings[1]; 
                const settingFlgs = Object.values(tmp);
                this.checked = settingFlgs[0];

            })
            .catch(error=>console.log(error.response.data));
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
            this.checked = settingFlgs[0];
        }).catch(error=>{
            window.alert(error)
            clearInterval(this.intervalId);
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
                    .catch(error=>{window.alert(error.response.data)});
                }
            }).catch(error=>{
                window.alert(error.response.data)
                clearInterval(this.intervalId);
                });
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
        //更新
        refreshClick(){
            this.$axios_inst.get(`/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
            }).catch(error=>{
                window.alert(error.response.data);
                clearInterval(this.intervalId);
                });
        },
        //質問の削除
        questionDelete(){
            this.$axios_inst.delete(`/${this.$route.params.id}`)
            .then(response =>{
            window.location.href = `${this.$base_url}/`;
            location.reload();
            }).catch(error=>{
                window.alert(error.response.data);
                clearInterval(this.intervalId);
                });
        },
        deadline(){
            this.$axios_inst.post(`/deadline/${this.$route.params.id}`)
            .then(response =>{
                window.location.href = `${this.$base_url}/question/result/${this.$route.params.id}`;
                location.reload();
            }).catch(error=>{
                window.alert(error.response.data)
                clearInterval(this.intervalId);
                })
        },
        sendAddChoice(){
            this.checked = !(this.checked);
            this.$axios_inst.put(`/setting/addChoice/${this.$route.params.id}`,{
                addChoice:this.checked
            }).catch(error=>console.log(error));
        },
        choiceAddInput(value){
            this.addChoiceValue = value;
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