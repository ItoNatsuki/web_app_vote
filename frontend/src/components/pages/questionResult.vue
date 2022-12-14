<template>
    <div>
        <question-header></question-header>
        <resultBody :questions="questions" @refreshClick="refreshClick"/>
        <div id="buttonsQ">
            <button type="button" id="newQ" @click="newQ">新しい質問を作成する</button>
        </div>
    </div>
</template>

<script>
import questionHeader from '@/components/molecules/questionHeader'
import resultBody from '@/components/molecules/resultBody'
    export default{
        data(){
            return{
                questions:{},
                topChoiceID:undefined,
            }
        },
        components:{
            resultBody,
            questionHeader
        },
        created(){
            this.$axios_inst.get(`/${this.$route.params.id}`)
            .then(response=>{
                const questionsData = response.data;
                this.questions = questionsData.questions[0];
                /*最多投票選択肢決定ロジック
                const choices = this.questions.choices;
                let topId = choices[0].count
                choices.forEach(o =>{
                    //ToDo

                })
                */

            })
            .catch(error=>console.log(error));
        },
        methods:{
        //更新ボタンの処理
        refreshClick(){
        this.$axios_inst.get(`/${this.$route.params.id}`)
        .then(response=>{
            const questionsData = response.data;
            this.questions = questionsData.questions[0];
        })
        },
        newQ(){
            window.location.href = `http://localhost:8080/#`;
            location.reload();
        }
    }
}
</script>

<style scoped>
#buttonsQ{
    display:flex;
    justify-content: center;
    margin-top:2%;
}
</style>