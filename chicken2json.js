const str = ` 
planId
true string
投资计划id
code
false string
投资编号
mobile
false string
投资人手机号
status
false string
投资状态
investStart
false string
投资时间(起), yyyy-MM-dd
investEnd
false string
投资时间(止), yyyy-MM-dd
quitStart
false string
退出时间(起), yyyy-MM-dd
quitEnd
false string
退出时间(止), yyyy-MM-dd`;

const log = (args) => {
  console.log(args);
}

class ConverterOld {
  constructor() {

  }

  list(str) {
    let result = {};
    let lines = str.split('\n');
    log(lines.length);
    for (let i = 0; i < lines.length; i += 1) {
      let line = lines[i];
      let parts = line.split(/\s+/g);
      let resultItem = {
        name: parts[0],
      };
      parts.splice(0, 3);
      resultItem.title = parts.join('');
      let name = resultItem.name;
      result[name] = resultItem;
    }
    log(JSON.stringify(result, null, 2));
    return result;
  }

  form(str) {
    let result = {};
    let lines = str.split('\n');
    log(lines.length);
    for (let i = 0; i < lines.length; i += 1) {
      let line = lines[i];
      let parts = line.split(/\s+/g);
      let resultItem = {
        name: parts[0],
        tag: 'Input',
        default: null,
        rules: [{ required: false, message: '不能为空' }],
      };
      parts.splice(0, 3);
      resultItem.title = parts.join('');

      let name = resultItem.name;
      result[name] = resultItem;
    }
    log(JSON.stringify(result, null, 2));
    return result;
  }

  filter(str) {
    let result = [];
    let lines = str.split('\n');
    log(lines.length);
    for (let i = 0; i < lines.length; i += 1) {
      let line = lines[i];
      let parts = line.split(/\s+/g);
      let resultItem = {
        name: parts[0],
        tag: 'Input',
        initValue: null,
        // rules: [{ required: false, message: '不能为空' }],
      };
      parts.splice(0, 3);
      resultItem.title = parts.join('');
      result.push(resultItem);
    }
    log(JSON.stringify(result, null, 2));
    return result;
  }
}

class Converter {
  // 返回格式:[{name:foo,title:bar},]
  getNameAndTitle(str) {
    let results = [];
    const lines = str.replace(/^\s+|\s+$/g, '').split('\n');
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
    return this.convert(str, 'object', (name, title) => ({ name, title }))
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

let c = new Converter();
c.filter(str);





// chickenToListParams(str);
// chickenToFormParams(str);
// chickenToFilterParams(str);