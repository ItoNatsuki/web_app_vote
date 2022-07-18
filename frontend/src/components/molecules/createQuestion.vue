<template>
    <div>
            <input  id="title" type="text" placeholder="質問のタイトル">  
            <createChoiceList/>
    </div>
</template>
<script>
import createChoiceList from'@/components/molecules/createChoiceList'
export default {
    components:{createChoiceList}
}
</script>
<style >
input{
    margin: 2%;
}
</style>