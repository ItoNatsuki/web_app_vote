<template>
    <div>
        <resultBody :questions="questions" @refreshClick="refreshClick"/>
    </div>
</template>

<script>
import resultBody from '@/components/molecules/resultBody'
    export default{
        data(){
            return{
                questions:{},
                topChoiceID:undefined,
            }
        },
        components:{
            resultBody
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
        }
    }
}
</script>

<style scoped>

</style>