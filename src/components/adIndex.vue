<template>
  <div class="hello">
    <v-header></v-header>
    <div class="cdcontent" id="cdcontent" v-html="text"></div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  import header from '@/components/header'

  const Host1 = 'http://www.bdwenyunjy.com/'

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
      this.get(Host1 + 'Api/Pinyin/getAd/id/' + this.$route.params.adID, res => {
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
  .hello .cdcontent {
    padding: 10px;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
