<template>  
    <div id="voteButtons">
        <div name="choice" v-for="choice in choices" :key="choice.id">
            <vote-button :choice="choice" :id="choice.id" @emitVote="emitVote"/>
        </div>
            <modal-add-choice v-if="addChoiceFlg" :addChoiceValue="addChoiceValue" @submitAddChoice="submitAddChoice" @choiceAddInput="choiceAddInput"></modal-add-choice>
    </div>
</template>
<script>
import voteButton from '@/components/atoms/voteButton'
import modalAddChoice from '@/components/molecules/modalAddChoice'
export default {
    data(){
        return{
            beforeChoice:null
        }
    },
    components:{
        voteButton,
        modalAddChoice
    },
    props:[
        'addChoiceFlg',
        'choices',
        'addChoiceValue'
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
        },
        submitAddChoice(){
            this.$emit('submitAddChoice');
        },
        choiceAddInput(value){
            this.$emit('choiceAddInput',value);
        }
    }
}
</script>
<style scoped>
[name="choice"]{
    margin:5% 3% 1% 1%
}
</style>