<template>
    <div id="modalSetting">
        <div id="iconWrapper">
            <img id="settingIcon" src="@/assets/img/setting.png" alt="settingIcon" @click="openModal">
        </div>
        <div id="overlay" v-show="showContent">
            <div id="content">
                <div id="settingChoice">
                    <input type="checkbox" id="addChoice" name="addChoice"  @click="sendAddChoice">
                    <label for="addChoice">投票者にも選択肢を追加させる</label>
                    <button id="close" @click="closeModal">閉じる</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                showContent:false
            };
        },
        methods:{
            openModal(){
                this.showContent = true;
            },
            closeModal(){
                this.showContent = false;
            },
            sendAddChoice(){
                this.$emit("sendAddChoice")
            }
        }
    }
</script>
<style scoped>
#iconWrapper{
    width:fit-content;
    height: auto;
}
#settingIcon{
    position: absolute;
    top:0;
    margin-left: 80%;
    margin-top: 5px;
    width:auto;
    height: 60px;
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
#close{
    margin:5% 0 5% 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
