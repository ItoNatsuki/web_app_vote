<template>
<div>
    <h1>404NotFound</h1>
    <h2>申し訳ございませんが、該当ページが見つからなかったため５秒後トップページに遷移します。</h2><br>
    <a href="`${this.$base_url}`">自動的に遷移しない場合はこちらをクリックしてください。</a>
</div>
</template>

<script>
export default{
    created(){
        setTimeout(()=>{
            window.location.href = `${this.$base_url}`;
            location.reload();
        },5000);
    }
}
</script>