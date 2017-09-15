
const log = (args) => {
  console.log(args);
}

class Converter {
  // 返回格式:[{name:foo,title:bar},]

  getNameAndTitle(str) {
    let results = [];
    let lines = str.trim().split('\n');
    lines = lines.map(line => line.trim())
    // log(lines)
    for (let i = 0; i < lines.length; i += 3) {
      results.push({
        name: lines[i],
        title: lines[i + 2],
      })
    }
    return results;
  }
  showJson(json) {
    console.log(JSON.stringify(json, false, 2))
  }

  //resultType ='object'||'array'
  // getItemFunc 将单个{name:foo,title:bar}转成一个结果的函数
  convert(str, resultType = 'object', getItemFunc) {
    let results
    if (resultType === 'object') {
      results = {}
    } else if (resultType === 'array') {
      results = []
    }

    let values = this.getNameAndTitle(str);
    for (let i = 0; i < values.length; i++) {
      let { name, title } = values[i];
      if (resultType === 'object') {
        results[name] = getItemFunc(name, title)
      } else if (resultType === 'array') {
        results.push(getItemFunc(name, title))
      }

    }
    this.showJson(results)
    return results;
  }

  list(str) {
    return this.convert(str, 'object', (name, title) => {
      const item = { name, title }
      if (title.endsWith('金额') || title.endsWith('费')) {
        item.render = '|dataRender.renderMoney()|'
      } else if (title.endsWith('日期')) {
        item.render = '|dataRender.renderMoment()|'
      }
      return item
    })
  }
  form(str) {
    return this.convert(
      str,
      'object',
      (name, title) => ({
        name,
        title,
        tag: 'Input',
        default: null,
        rules: [{ required: false, message: '不能为空' }],
      }))
  }
  filter(str) {
    return this.convert(str, 'array', (name, title) => ({
      name,
      tag: 'Input',
      // initValue: undefined,
      title,
    }))
  }
}


const str = ` 
id
xxx
资方id
creditorCode
 true string
资方编码
name
 true string
资方名称
idCardAuth
 true boolean
需要实名认证
needContract
 true boolean
需要合同
needPicture
 true boolean
需要身份证照片
overdue
 true boolean
支持延期
payBack
 true boolean
是否要求已还款
supportDelay
 true boolean
允许逾期订单
createdAt
 true number
时间戳
excelColumnArray
 true array[object]
excel报表字段配置
isDirect
 true boolean
是否直投方
loanChannel
 true string
放款渠道
userGradeMax
 true number
芝麻分最大值
userGradeMin
 true number
芝麻分最小值
userMobileFormat
 true boolean
用户手机号是否脱敏
relativeMobileFormat
 true boolean
亲属手机号是否脱敏
colleagueMobileFormat
 true boolean
同事手机号是否脱敏
minAge
xxx
最小年龄(含)
 `;


let c = new Converter();
// c.filter(str);
log(`import dataRender from '../../../utils/QueenAnt/dataRender';`)
log('export default')
c.list(str);
// c.list(str)



// chickenToListParams(str);
// chickenToFormParams(str);
// chickenToFilterParams(str);