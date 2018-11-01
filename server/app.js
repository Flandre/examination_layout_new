const express = require('express')
const app = express()

app.listen('8233', () => {
  console.log('server started')
  console.log('http://localhost:8233')
})


var optionData = {
  "status_code": "ok",
  "message": {
    "lLeg": [
      {
        "name": "合格",
        "value": "1"
      },
      {
        "name": "不合格",
        "value": "0"
      }
    ],
    "lArm": [
      {
        "name": "合格",
        "value": "1"
      },
      {
        "name": "不合格",
        "value": "0"
      },
      {
        "name": "手指末节残缺",
        "value": "2"
      },
      {
        "name": "左手三指健全,双手手掌完整",
        "value": "4"
      }
    ],
    "rCorrect": [
      {
        "name": "是",
        "value": "1"
      },
      {
        "name": "否",
        "value": "0"
      }
    ],
    "lCorrect": [
      {
        "name": "是",
        "value": "1"
      },
      {
        "name": "否",
        "value": "0"
      }
    ],
    "rLeg": [
      {
        "name": "合格",
        "value": "1"
      },
      {
        "name": "不合格",
        "value": "0"
      }
    ],
    "aid": [
      {
        "name": "有",
        "value": "1"
      },
      {
        "name": "无",
        "value": "0"
      }
    ],
    "obstacle": [
      {
        "name": "有",
        "value": "0"
      },
      {
        "name": "无",
        "value": "1"
      }
    ],
    "rArm": [
      {
        "name": "合格",
        "value": "1"
      },
      {
        "name": "不合格",
        "value": "0"
      },
      {
        "name": "手指末节残缺",
        "value": "2"
      },
      {
        "name": "右手拇指缺失",
        "value": "3"
      }
    ]
  }
}
var examData = {
  "exam": {
    "applyType": "MC1",
    "body": "niF2fbFnemq5saqz.png,F97ESFHFVJ3MgE6F.png,1,1511111167855",
    "color": "1,1511111254678",
    "correction": "1,0,0,1511111111000",
    "createTime": 1520281545680,
    "createTimestamp": 1520281545680,
    "deviceId": "vpe00001",
    "examId": "0010",
    "hearing": "1,1,1511111123666",
    "height": "175,1511111115435",
    "id": 10,
    "infoGenderName": "",
    "infoIdCard": "",
    "infoName": "",
    "infoNation": "",
    "lLimbs": "1,1,1511111116667",
    "lock": false,
    "locker": 1,
    "mdHistory": "1,2,3",
    "photo": "BP6eCVMfNTDmKRUs.png",
    "showExamId": "0010",
    "status": 2,
    "statusName": "提交失败",
    "uLimbs": "jWewedza7qhWhgjt.png,4,3,1511111145678",
    "vehicleType": "C1小型汽车",
    "vision": "5.0,5.0,1511111964555",
    "feedback":"这是备注备注备注"
  },
  "examData": {
    "vision": {
      "left": {
        "correct": 1,
        "value": "5.0"
      },
      "right": {
        "correct": 0,
        "value": "4.8"
      }
    },
    "color": 1,
    "hearing": {
      "left": 1,
      "right": 1,
      "aid": 0
    },
    "body": 1,
    "arm": {
      "left": 4,
      "right": 3
    },
    "height": 190,
    "leg": {
      "left": 1,
      "right": 1
    }
  },
  "status_code": "ok",
  "examImgs": {
    "rBody": "./img/nature3.jpg",
    "uLimbs": "./img/nature4.jpg",
    "lBody": "./img/nature5.jpg"
  },
  "examId": 10,
  "adminId": 6,
  "keyFrameMap": {
    "height": 10,
    "lLimbs": 20,
    "hearing": 30,
    "uLimbs": 40,
    "body": 50,
    "color": 60,
    "vision": 70
  },
  "infoImgs": {
    "license": "./img/nature5.jpg",
    "idcard": "./img/nature6.jpg"
  },
  "monitorImgs": {
    "log_1": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg",],
    "log_2": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg"],
    "log_3": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg",],
    "log_4": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg"],
    "log_5": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg",],
    "log_6": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg"],
    "log_7": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg",],
    "log_8": ["./img/nature1.jpg","./img/nature1.jpg","./img/nature1.jpg"],
  },
  "videoUrl": "",
  "info": {
    "accountId": 1,
    "birthDate": 1529424000000,
    "createTime": 1511111111111,
    "createTimeStamp": 1511111111111,
    "deviceId": "",
    "gender": 1,
    "genderName": "男",
    "id": 1,
    "idPhoto": "4KBh4GKnaVgQKzNU.png",
    "idType": "A",
    "idTypeName": "居民身份证",
    "name": "王梓齐",
    "nation": "汉族",
    "updateTime": 1539655812858,
    "updateTimeStamp": 1539655812858
  }
}
var videoData = {
  "status_code":"ok",
  "playUrl":"http://vjs.zencdn.net/v/oceans.mp4",
  // "message":"找不到该体检记录对应的视频资源"
}
var list = {
  "status_code":"ok",
  "message":[
    // {
    //   "applyType":"C1",
    //   "infoName":"测试三",
    //   "createTime":"2018-08-01 10:24",
    //   "examId":"0003",
    //   "statusName":"待审核",
    //   "lock":true,
    //   "id":4,
    //   "status":2
    // },
    // {
    //   "applyType":"C1",
    //   "infoName":"测试三",
    //   "createTime":"2018-08-01 10:24",
    //   "examId":"0003",
    //   "statusName":"待审核",
    //   "lock":true,
    //   "id":4,
    //   "status":2
    // },
    ]
}

app.get('/admin/home/audit/examination/options', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.send(optionData)
})

app.get('/admin/home/audit/examination/info/4', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.send(examData)
})

app.get('/admin/home/audit/examination/play/preview/10', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.send(videoData)
})

app.get('/admin/home/audit/examination/list/0/100', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.send(list)
})