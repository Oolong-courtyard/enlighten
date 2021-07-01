import React from "react"
import SwpierComponent from "./swpierComponent"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import mockAxios from "../../__mocks__/axios"
Enzyme.configure({ adapter: new Adapter() })

describe("SwiperComponent 组件测试", () => {
    const props = {
        postData: [
            { file_type: "image", objectUrl: "http://xxxx.com/img/test.png" },
            { file_type: "video", objectUrl: "http://xxxx.com/img/test.mp4" },
        ],
    }
    const container = shallow(<SwpierComponent {...props} />)
    it("SwiperComponent 组件快照", () => {
        expect(container.html()).toMatchSnapshot()
    })
    it("SwiperComponent 组件初始化", async () => {
        let mountEle: any
        mountEle = await mount(<SwpierComponent {...props} />)
        await mountEle.update()
        await expect(mountEle.find(".swiper-wrapper").at(0).find(".swiper-slide").length).toBe(2)
    })
    // it("initSwiper functions 测试", () => {
    //     container.props()["data-initswiper"]()
    //     const returnVal = container.props()["data-returnresultvalue"]()
    //     expect(returnVal[1]).toBeTruthy()
    // })
    // it("swiperData functions 测试", () => {
    //     container.props()["data-swiperData"]()
    //     const returnVal = container.props()["data-returnresultvalue"]()
    //     expect(returnVal[0].length).toBe(3)
    // })
})
