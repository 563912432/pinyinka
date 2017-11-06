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
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  import header from '@/components/header'

  const Host = 'http://www.wdexam.com/Api/Pinyin/'

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
      let that = this
      this.loading = true
      this.axios({
        url: Host + 'all',
        method: 'post'
      }).then(function (res) {
        that.loading = false
        switch (res.data.status) {
          case 0:
            console.log(res.data.info)
            break
          case 1:
            that.msg = res.data.info
            break
        }
      }).catch(function (error) {
        setTimeout(function () {
          that.loading = false
          console.log('error' + error)
        }, 1000)
      })
    },
    methods: {
      click (el) {
        let cid = el.target.getAttribute('cid')
        this.$router.push({path: '/list/' + cid})
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
</style>
