<template>  
    <div id="voteButtons">
        <div v-for="choice in choices" :key="choice.id">
            <vote-button :choice="choice" :id="choice.id" @emitVote="emitVote"/>
        </div>
    </div>
</template>
<script>
import voteButton from '@/components/atoms/voteButton'
export default {
    data(){
        return{
            beforeChoice:null
        }
    },
    components:{
        voteButton
    },
    props:[
        'choices'
    ],
    methods:{
        emitVote(id){
            const payload={
                voteChoiceId:id
            };
            if(this.beforeChoice !== null){
                payload.beforeChoiceId = this.beforeChoice;
            }
            this.$emit("voteObj",payload);
            this.beforeChoice = id;
        }
    }
}
</script>
<style>
</style>