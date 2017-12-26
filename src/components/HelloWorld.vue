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
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  import header from '@/components/header'

  const Host = '/Api/Pinyin/'

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
        loading: false
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
      }
    }
  }
</script>

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
