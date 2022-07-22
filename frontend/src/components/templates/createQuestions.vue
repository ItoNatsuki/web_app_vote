<template>
<section>
    <h3>作成したい質問内容を入力してください</h3>
    <inputQuestions @submitQuestion="submitQuestion"/>
</section>
</template>

<script>
import inputQuestions from '@/components/molecules/createQuestion'
export default{
    components:{
        inputQuestions
    },
    methods:{
        submitQuestion(...array){
            console.log(array);
        }
    }
}
</script>