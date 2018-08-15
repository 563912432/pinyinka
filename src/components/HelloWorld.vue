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
    <!--<div id="b-button" @click="openSimpleDialog" :class="['b-button',closeDisplay?'display-none':'display-show']">-->
      <!--<div class="b-close" @click.stop="bClose">×</div>-->
    <!--</div>-->

    <mu-chip v-show="closeDisplay" color="#E68540" id="b-button" @click="openSimpleDialog" class='b-button' @delete="bClose" delete>
      <mu-avatar :size="32">
        <img src="../assets/hengheng.png">
      </mu-avatar>
    </mu-chip>

    <mu-dialog width="360" :open.sync="openSimple">
      <img src="../assets/logo.png"/>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  import header from '@/components/header'

  // const Host = '/Api/Pinyin/'
  const Host = 'http://www.meili.com/Api/Pinyin/'

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
        closeDisplay: true
      }
    },
    created () {
      this.loading = true
      let url = Host + 'all'
      this.post(url, '', res => {
        this.loading = false
        if (res.status) {
          this.msg = res.info
        } else {
          console.log(res.info)
        }
      })
    },
    mounted () {
      let height = window.screen.height
      let marginTop = height / 2 - 100
      document.getElementById('b-button').style.top = marginTop + 'px'
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
        window.localStorage.setItem('status', 1)
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
        // $('.b-button').css('display', 'none')
        this.closeDisplay = false
      },
      closeSimpleDialog () {
        this.openSimple = false
        // $('.b-button').css('display', 'block')
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
        // $('.b-button').css('display', 'none')
        this.closeDisplay = false
      }
    }
  }
</script>
<style>
  .mu-chip-delete-icon{
    margin-bottom: 30px!important;
    margin-right: -20px!important;
    margin-left: 10px!important;
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
    height: 32px;
    position: fixed;
    display: flex;
    align-items: center;
    right: 10px;
    z-index: 10;
    border: solid 1px #e0e0e0;
  }

  .b-close{
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 4px;
    text-align: center;
    line-height: 10px;
    border: 1px solid #a1a1a1;
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
