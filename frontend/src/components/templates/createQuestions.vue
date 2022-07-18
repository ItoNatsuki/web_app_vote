<template>
<section>
    <h3>作成したい質問内容を入力してください</h3>
    <createQuestions/>
</section>
</template>

<script>
import createQuestions from '@/components/molecules/createQuestion'
export default{
    components:{
        createQuestions
    }
}
</script>