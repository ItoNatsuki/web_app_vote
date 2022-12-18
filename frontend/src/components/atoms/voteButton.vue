<template>
<div id="voteButton">
    <label id="voteLabel">
        <input type="radio" :id="id" name="choice" @change="emitVote"><span name="subject"  >{{choice.content}}</span><br><span id ="count" name="count">{{choice.count}}</span>
    </label>
</div>
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


[name="subject"]{
    width:100%;
    height: 50%;
    word-wrap: break-word;
}

[name="count"]{
    width:100%;
    height:50%;
}
#voteLabel input{
    display: none;
}

#voteLabel span{
    text-align: center;
    display: inline-block;
    color: #333; 
    font-size: 20px; 
    border: 1px solid #333;
    padding: 1% 1%; 
}
#voteLabel input:checked + span{
    color: #FFF; 
    background: rgb(99, 99, 99); 
    border: 1px solid rgb(99, 99, 99); 
}
#voteButton{
    display: block;
    width: 170px;
    height: 100px;
    margin-bottom: 4%;
}
</style>