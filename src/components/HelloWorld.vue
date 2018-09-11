<template>
  <div class="hello">
    <v-header></v-header>
    <div class="content">
      <ul v-loading.body="loading">
        <li :class="item.pid == '41'?'parent':'child'"
            v-for="(item, index) in msg"
            @click="item.pid != '0' && item.level != '2'  && click($event)"
            :cid="item.id"
            :title="item.title">
          {{ item.title }}
        </li>
      </ul>
      <div class="img-container" @click="videoPlay">
        <img src="../assets/pyk.png" alt="">
      </div>
    </div>
    <mu-chip v-if="closeDisplay" color="#E68540" @click="openSimpleDialog" class='b-button' @delete="bClose" delete>
      <mu-avatar :size="50">
        <img src="../assets/hengheng50.png" style="border-radius: 5px;border: 1px #c8c8c8 solid;box-shadow: 1px 1px 5px #626262;" />
      </mu-avatar>
    </mu-chip>
    <mu-dialog :open.sync="openSimple" @close="closeSimpleDialog">
      <router-link :to="{ name:'/adIndex',params: { adID: adID }}">
        <img :src="bImgurl" class="b-img"/>
      </router-link>
      <!--<mu-button class="b-close" slot="actions" flat color="primary" @click="closeSimpleDialog">×</mu-button>-->
      <div class="b-close" slot="actions" flat color="primary" @click="closeSimpleDialog">×</div>
    </mu-dialog>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  import header from '@/components/header'

  const Host = 'http://www.wenyunjy.com/Api/Pinyin/'
  // const Host1 = 'http://www.bdwenyunjy.com/Api/Pinyin/'
  // const Host2 = 'http://www.bdwenyunjy.com/'
  const Host1 = '/'

  export default {
    name: 'HelloWorld',
    components: {
      'v-footer': footer,
      'v-header': header
    },
    data () {
      return {
        msg: '',
        isParent: true,
        loading: false,
        openSimple: false,
        closeDisplay: false,
        bImgurl: 'static/img/404.jpg',
        adID: ''
      }
    },
    created () {
      this.loading = true
      let url = Host + 'all'
      this.post(url, '', res => {
        this.loading = false
        if (res.status) {
          this.msg = res.info.tree
          if (res.info.ad) {
            this.closeDisplay = true
            this.adID = res.info.ad.id
            this.bImgurl = Host1 + res.info.ad.thumb
          } else {
            this.closeDisplay = false
            this.bImgurl = '/static/img/404.jpg'
          }
        } else {
          console.log(res.info)
        }
      })
    },
    mounted () {
      let year = window.localStorage.getItem('year')
      let month = window.localStorage.getItem('month')
      let day = window.localStorage.getItem('day')
      let data = new Date()
      let nowYear = data.getFullYear()
      let nowMonth = data.getMonth() + 1
      let nowDay = data.getDate()
      if (year && month && day) {
        if (nowYear > year || nowMonth > month || nowDay > day) {
          window.localStorage.setItem('status', 0)
        } else {
          window.localStorage.setItem('status', 1)
        }
      } else {
        window.localStorage.setItem('status', 0)
      }
      let status = parseInt(window.localStorage.getItem('status'))
      if (status) {
        this.openSimple = false
      } else {
        this.openSimple = true
      }
    },
    methods: {
      post (url, data, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
        let obj = new XMLHttpRequest()
        obj.open('POST', url, true)
        obj.onreadystatechange = function () {
          if (+obj.readyState === 4 && (+obj.status === 200 || +obj.status === 304 || +obj.status === 0)) {  // 304未修改
            fn.call(this, JSON.parse(obj.responseText))
          }
        }
        obj.send(data)
      },
      click (el) {
        let cid = el.target.getAttribute('cid')
        this.$router.push({path: '/list/' + cid})
      },
      videoPlay () {
        this.$router.push({path: '/introduce'})
      },
      openSimpleDialog () {
        this.openSimple = true
        this.closeDisplay = false
      },
      closeSimpleDialog () {
        this.openSimple = false
        this.closeDisplay = true
        let data = new Date()
        let nowYear = data.getFullYear()
        let nowMonth = data.getMonth() + 1
        let nowDay = data.getDate()
        window.localStorage.setItem('year', nowYear)
        window.localStorage.setItem('month', nowMonth)
        window.localStorage.setItem('day', nowDay)
      },
      bClose () {
        this.closeDisplay = false
      }
    }
  }
</script>
<style>
  .b-img{
    width: 100%;
  }
  .mu-dialog-wrapper .mu-dialog-body{
    padding: 10px 10px 10px !important;
  }
  .mu-dialog-wrapper .mu-dialog-actions{
    margin-top: -20px !important;
    min-height: 0px !important;
    height: 0px !important;
  }
  .mu-chip-delete-icon{
    margin-bottom: 40px!important;
    margin-right: -20px!important;
    margin-left: 10px!important;
    width: 18px;
    position: relative;
    right: 48px;
    bottom: 10px;
  }
  .mu-chip .mu-avatar:first-child {
    margin-left: -12px!important;
    margin-right: -26px!important;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style-type: none;
  }

  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .b-button{
    height: 50px;
    position: fixed;
    bottom: 100px;
    display: flex;
    align-items: center;
    right: 10px;
    z-index: 10;
    border: solid 1px #e0e0e0;
    border-radius: 50%;
  }

  .b-close{
    position: relative;
    right: 45%;
    width: 25px;
    height: 25px;
    top: 45px;
    border-radius: 15px;
    text-align: center;
    line-height: 23px;
    font-size: 25px;
    color: #eee;
    border: 1px solid #eee;
  }

  .hello .content {
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-top: -15px;
  }

  .hello .content ul {
    margin: 0;
    padding: 0;
  }

  .hello .content ul li {
    padding: 10px;
  }

  .hello .content .parent {
    font-weight: bold;
    font-size: 16px;
    background-color: #e68540;
    color: #ffffff;
    margin: 15px 0 5px 0;
  }

  .hello .content .child {
    background-color: #fff;
    margin: 3px;
    border-radius: 3px;
  }

  .hello .img-container {
    width: 50%;
    height: auto;
    text-align: center;
    align-self: center;
    background-color: transparent;
  }

  .hello .img-container img {
    width: 100%;
    height: auto;
  }
</style>
