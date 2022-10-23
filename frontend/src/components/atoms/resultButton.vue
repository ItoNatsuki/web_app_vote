<template>
<div id="voteButton">
    <label id="voteLabel">
        <input type="radio" :id="id" name="choice" disabled><span name="subject"  >{{choice.content}}</span><br><span id ="count" name="count">{{choice.count}}</span>
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
    }
}
</script>
<style scoped>


[name="subject"]{
    width:100%;
    height: 50%;
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
#voteButton{
    display: block;
    width: 170px;
    height: 100px;
    margin-bottom: 4%;
}
</style>