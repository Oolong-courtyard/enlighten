export default {
    //获取地址栏参数
    getQueryString(props: any, name: string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        var r = props.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    },
    //生成随机字符串
    randomString(len: number) {
        len = len || 32
        var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678" /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length
        var pwd = ""
        let i: number
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
    },
    // 时间戳转日期时间
    /*
     ** 时间戳转换成指定格式日期
     ** eg.
     ** dateFormat(11111111111111, 'Y年m月d日 H时i分')
     ** → "2322年02月06日 03时45分"
     */
    dateFormat(timestamp: number, formats?: string) {
        console.log(timestamp)
        // formats格式包括
        // 1. Y-m-d
        // 2. Y-m-d H:i:s
        // 3. Y年m月d日
        // 4. Y年m月d日 H时i分
        formats = formats || "Y年m月d日 H:i"

        const zero = function (value: any) {
            if (value < 10) {
                return "0" + value
            }
            return value
        }
        timestamp = timestamp * 1000
        const myDate = timestamp ? new Date(timestamp) : new Date()
        const year = myDate.getFullYear() + ""
        const month = zero(myDate.getMonth() + 1)
        const day = zero(myDate.getDate())
        const hour = zero(myDate.getHours())
        const minite = zero(myDate.getMinutes())
        const second = zero(myDate.getSeconds())

        formats = formats.replace(/Y/gi, year)
        formats = formats.replace(/m/gi, month)
        formats = formats.replace(/d/gi, day)
        formats = formats.replace(/H/gi, hour)
        formats = formats.replace(/i/gi, minite)
        formats = formats.replace(/s/gi, second)

        return formats
    },
    // 数据清洗
    cleanData(obj: any) {
        // 循环当前数据，去除空数据
        Object.keys(obj).forEach((key: any) => {
            if (typeof obj[key] === "object") {
                // 当前参数为对象类型
                if (Object.prototype.toString.call(obj[key]) == "[object Array]") {
                    //    如果当前参数是数组对象，数组长度为空，也将要删除
                    if (!obj[key].length) {
                        delete obj[key]
                    }
                } else {
                    let nowJson = this.cleanData(obj[key])
                    let jsonLen = this.getJSONOBJParamsLen(obj[key])
                    if (!jsonLen) {
                        delete obj[key]
                    }
                }
            } else if (typeof obj[key] === "string") {
                if (obj[key] == "") {
                    delete obj[key]
                }
            }
        })
        return obj
    },
    //获取json对象参数长度
    getJSONOBJParamsLen(JSONObj: any) {
        let count = 0
        Object.keys(JSONObj).forEach((objKey: any) => {
            count++
        })
        return count
    },
    // 数据更新，删除null值
    deleteDataNull(data: any) {
        Object.keys(data).forEach((dataKey: any) => {
            if (data[dataKey] == null) {
                delete data[dataKey]
            }
        })
        return data
    },
}
