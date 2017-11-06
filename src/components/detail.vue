<template>
  <div class="detail">
    <v-header></v-header>
    <div class="content" v-loading.body="loading">
      <div class="menu">
        <span>
          <span class="menu-title" @click="back"><img src="../assets/back.png" alt="返回"> 返回</span>
          <span class="menu-title" @click="prevPage"><img src="../assets/left.png" alt="上一个"> 上一个</span>
          <span class="menu-title" @click="nextPage"><img src="../assets/right.png" alt="下一个"> 下一个</span>
          <router-link to="/" class='menu-title1' style="color: #fff;text-decoration: none">
            <img src="../assets/home.png" alt="首页"> 首页
          </router-link>
        </span>
        <span ref="button">
          <span v-if="isPlay" @click="play">
            <img src="../assets/pause.png" style="width: 13px;height: 13px;margin-bottom: -1px" alt="暂停"> 暂停
          </span>
          <span v-else @click="play">
            <img src="../assets/play.png" style="width: 13px;height: 13px;margin-bottom: -1px" alt="播放"> 播放
          </span>

        </span>
      </div>
      <div class="wrapper">
        <img v-if="thumb" :src="host + 'Uploads/' + thumb" width="100%" height="100%">
        <audio ref="audio"></audio>
        <!--<div class="learn">
          <div class="learn-btn" @click="learn">书写学习</div>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import header from '@/components/header'

  export default {
    name: 'detail',
    data () {
      return {
        host: 'http://www.wdexam.com/',
        thumb: null,
        loading: false,
        audio: null,
        isPlay: false,
        currentMp3: '',
        index: 0,
        all: [],
        cardId: ''
      }
    },
    components: {
      'v-header': header
    },
    watch: {
      currentMp3 () {
        if (!this.isIOS()) {
          this.$refs.button.childNodes[0].click()
        }
      }
    },
    mounted () {
      let that = this
      let params = new URLSearchParams()
      params.append('id', this.$route.params.id)
      params.append('cid', this.$route.params.cid)
      this.loading = true
      this.axios.post(this.host + 'Api/Pinyin/detail', params).then(function (res) {
        that.loading = false
        if (res.data.status) {
          that.all = res.data.info
          that.all.map((v, index) => {
            if (v.id === that.$route.params.id) {
              that.thumb = v.thumb
              that.index = index
              that.currentMp3 = v.mp3
              that.cardId = v.id
            }
          })
        }
      }).catch(function (res) {
        that.loading = false
      })
    },
    destroyed () {
      this.isPlay = false
    },
    methods: {
      nextPage () {
        if (this.index >= this.all.length - 1) {
          console.log('end')
          return
        }
        this.isPlay = false
        this.index++
        this.thumb = this.all[this.index]['thumb']
        this.currentMp3 = this.all[this.index]['mp3']
        this.cardId = this.all[this.index]['id']
        this.createAudio()
      },
      prevPage () {
        if (this.index <= 0) {
          console.log('first')
          return
        }
        this.isPlay = false
        this.index--
        this.thumb = this.all[this.index]['thumb']
        this.currentMp3 = this.all[this.index]['mp3']
        this.cardId = this.all[this.index]['id']
        this.createAudio()
      },
      back () {
        this.$router.push({path: '/list/' + this.$route.params.cid})
      },
      learn () {
        this.$router.push({path: '/learn/' + this.cardId})
      },
      createAudio () {
        if (!this.audio) {
          this.audio = this.$refs.audio
          this.audio.addEventListener('ended', () => {
            this.isPlay = false
          })
        }
        this.audio.src = this.host + 'Uploads/Mp3/' + this.currentMp3
      },
      play () {
        if (!this.audio) {
          this.createAudio()
        }
        if (!this.isPlay) {
          this.playAudio({audioObj: this.audio, type: true})
          this.isPlay = true
        } else {
          this.playAudio({audioObj: this.audio, type: false})
          this.isPlay = false
        }
      },
      playAudio (parameters) {
        let {audioObj, type} = parameters
        if (type) {
          audioObj.play()
        } else {
          audioObj.pause()
        }
      },
      isIOS () {
        let userAgent = navigator.userAgent
        return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      }
    }
  }
</script>
<style scoped>
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .detail .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .detail .content .menu {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 13px;
    color: #fff;
    background-color: #e68540;
  }

  .detail .content .menu-title {
    margin-right: 8px;
  }

  .detail .content .menu-title img {
    width: 13px;
    height: 13px;
    margin-bottom: -1px;
  }

  .detail .content .menu-title1 img {
    width: 13px;
    height: 13px;
    margin-bottom: -1px;
  }

  .detail .content .wrapper {
    background-color: #fff;
    flex: 1;
    display: flex;
    overflow-y: auto;
  }

  .detail .content .wrapper .learn {
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
    height: auto;
  }

  .detail .content .wrapper .learn .learn-btn {
    width: 100px;
    height: 27px;
    background: url("../assets/learn.png") no-repeat center;
    background-size: 100%;
    margin: 0 auto;
    line-height: 28px;
    color: #ffffff;
    font-size: 14px;
  }
</style>