<template>  
    <div id="resultButtons">
        <div name="choice" v-for="choice in choices" :key="choice.id">
            <result-button :choice="choice" :id="choice.id" />
        </div>
    </div>
</template>
<script>
import resultButton from '@/components/atoms/resultButton'
export default {
    data(){
        return{
            beforeChoice:null
        }
    },
    components:{
        resultButton
    },
    props:[
        'choices'
    ],
    methods:{
    }
}
</script>
<style scoped>
[name="choice"]{
    margin:5% 3% 1% 1%
}
</style>