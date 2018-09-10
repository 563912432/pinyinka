<template>
  <div class="hello">
    <v-header></v-header>
    <div class="content" v-loading.body="loading">
      <div class="menu">
        <span>
          <router-link to="/" class='menu-title1' style="color: #fff;text-decoration: none">
            <span class="menu-title"><img src="../assets/back.png" alt="返回"> 返回</span>
          </router-link>
        </span>
      </div>
      <div class="cdcontent" v-html="text"></div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  import header from '@/components/header'

  const Host = '/Api/Pinyin/'
  // const Host = 'http://www.bdwenyunjy.com/Api/Pinyin/'

  export default {
    name: "ad-index",
    components: {
      'v-footer': footer,
      'v-header': header
    },
    data () {
      return {
        loading: false,
        text: ''
      }
    },
    created () {
      this.get(Host + '/getAd/id/' + this.$route.params.adID, res => {
        let adres = JSON.parse(res)
        if (adres.status) {
          this.text = adres.info.content
        } else {
          this.text = '暂无内容'
        }
      })
    },
    methods: {
      get (url, fn) { // XMLHttpRequest对象用于在后台与服务器交换数据
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
          if (+xhr.readyState === 4 && (+xhr.status === 200 || +xhr.status === 304 || +xhr.status === 0)) { // readyState == 4说明请求已完成
            fn.call(this, xhr.responseText) // 从服务器获得数据
          }
        }
        xhr.send()
      }
    }
  }
</script>

<style scoped>
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .hello .content{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .hello .content .menu{
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 13px;
    color: #fff;
    background-color: #e68540;
    z-index: 1;
  }

  .hello .content .menu .menu-title1 img{
    width: 13px;
    height: 13px;
    margin-bottom: -1px;
  }

  .hello .content .cdcontent {
    padding: 10px;
    z-index: 1;
    flex: 1;
    display: flex;
    bottom: 100px;
    flex-direction: column;
    overflow-y: auto;
  }

</style>
