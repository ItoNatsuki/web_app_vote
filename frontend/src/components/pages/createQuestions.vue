<template>
<div>
    <question-header  :checked="checked" @input="sendAddChoice"></question-header>
    <createQuestions  @submitQuestion="submitQuestion" />
</div>
</template>

<script>
import createQuestions from '@/components/templates/createQuestions'
import questionHeader from '@/components/molecules/questionHeader'
export default{
    data(){
        return{
            checked:false
        }
    },
    components:{
        createQuestions,
        questionHeader
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
                this.$axios_inst.put(`/setting/addChoice/${questionsId}`,{
                    addChoice:this.checked
                })
                    .then(response=>{
                        window.location.href = `${this.$base_url}/question/vote/${questionsId}`
                    }).catch(error=>console.log(error));
            }).catch(error=>console.log(error));
        },
        sendAddChoice(){
            this.checked = !(this.checked)
        }
    }
}
</script>