<template>
    <div id="modalAddChoice">
        <add-choice-button @openAddChoiceModal="openAddChoiceModal"></add-choice-button>
        <div id="overlay" v-show="showContent">
            <div id="content">
                <span id="modalTitle">追加したい選択肢を入力してください</span>
                <div id="inputBox">
                    <input type="text" id="choiceInput" :value="addChoiceValue" @input="choiceAddInput">
                    <button id="submit" @click="submitAddChoice">送信</button>
                </div>
                <button id="close" @click="closeAddChoiceModal">閉じる</button>
            </div>
        </div>
    </div>
</template>
<script>
import addChoiceButton from '@/components/atoms/addChoiceButton'
export default{
    data(){
        return{
            showContent:false
        }
    },
    props:[
        'addChoiceValue'
    ],
    components:{
        addChoiceButton
    },
    methods:{
        openAddChoiceModal(){
            this.showContent = true;
        },
        closeAddChoiceModal(){
            this.showContent = false;
        },
        choiceAddInput(e){
            const value = e.target.value;
            this.$emit('choiceAddInput',value);
        },
        submitAddChoice(){
            this.$emit('submitAddChoice');
            this.showContent = false;
        }
    }
}
</script>
<style>
#modalAddChoice{
    height: fit-content;
    width: auto;
    margin:5% 3% 1% 1%
}
#overlay{
    z-index:1;

    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}
#content{
    background-color:rgb(207, 207, 207);
    padding:2%;
}
#modalTitle{
    font-size: 120%;
}
#choiceInput{
    font-size: 125%;
    margin:5%;
    width:80%;
    height: auto;
}
#inputBox{
    display: flex;
    align-items: center;
    justify-content: center;
}
#submit{
    height:auto;
    width: 25%;
}
#close{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 40%;
}
</style>