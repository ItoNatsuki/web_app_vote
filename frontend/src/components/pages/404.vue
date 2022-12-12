<template>
<div>
    <h1>404NotFound</h1>
    <h2>申し訳ございませんが、該当ページが見つからなかったため５秒後トップページに遷移します。</h2><br>
    <a href="http://localhost:8080/#/">自動的に遷移しない場合はこちらをクリックしてください。</a>
</div>
</template>

<script>
export default{
    created(){
        setTimeout(()=>{
            window.location.href = `http://localhost:8080/#/`;
        },5000);
    }
}
</script>