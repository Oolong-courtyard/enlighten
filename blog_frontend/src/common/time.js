export function timeago(dateTimeStamp) {
  //我这里的是timestamp是没有毫秒的
  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  let minute = 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let month = day * 30;

  let now = new Date().getTime();   //获取当前时间毫秒
  //切片去除时间戳中的毫秒
  let diffValue = now.toString().slice(0, 10) - dateTimeStamp;//时间差

  if (diffValue < 0) {
    return;
  }
  let minC = diffValue / minute;  //计算时间差的分，时，天，周，月
  let hourC = diffValue / hour;
  let dayC = diffValue / day;
  let weekC = diffValue / week;
  let monthC = diffValue / month;
  let result
  if (monthC >= 1) {
    //如果为一个月前,就显示具体发布的时间,后台响应的数据是时间戳,js这里将它转换为datetime类型显示
    result = formatDate(dateTimeStamp)
    // result = Date(parseInt(dateTimeStamp)).toLocaleString().replace(/:\d{1,2}$/,' ')
    // result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}


function formatDate(value) {
  //value是不带毫秒的timestamp,为了转换时间正确加上 000
  let date1 = new Date(parseInt(value.toString() + '000'));
  let y = date1.getFullYear(),
    m = date1.getMonth() + 1,
    d = date1.getDate(),
    h = date1.getHours(),
    i = date1.getMinutes(),
    s = date1.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (h < 10) {
    h = '0' + h;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  let t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
  return t;
}
