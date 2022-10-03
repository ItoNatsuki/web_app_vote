<template>
    <label id="voteButton">
        <input type="radio" :id="id" name="choice" @change="emitVote"><span name="subject"  >{{choice.content}}</span><br><span id ="count" name="count">{{choice.count}}</span>
    </label>
</template>
<script>
export default{
    props:[
        'id',
        'choice'
    ],
    methods:{
        emitVote(e){
            this.$emit("emitVote",e.target.id);
        }
    }
}
</script>
<style scoped>
label input{
    display: none;
}
label span{
    display: inline-block;
    color: #333; 
    font-size: 14px; 
    border: 1px solid #333;
    width: 10%;
    padding: 20px 20px; 
}
label input:checked + span{
    color: #FFF; 
    background: rgb(99, 99, 99); 
    border: 1px solid rgb(99, 99, 99); 
}
#count{
    margin-bottom: 5%;
}
</style>