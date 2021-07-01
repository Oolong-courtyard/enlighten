import React from "react"
import { BrowserRouter } from "react-router-dom"
import ImageShower from "./imageShower"
import Enzyme from "enzyme"
import { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

describe("图片展示组件", () => {
    const container = shallow(<ImageShower />)
    it("图片展示组件快照", () => {
        expect(container.html()).toMatchSnapshot()
    })

    it("重新上传图片", () => {
        container.find(".delete-outline").at(0).simulate("click")
        container.update()
    })
    it("预览图片", () => {
        container.find(".eye-outline").at(0).simulate("click")
        container.update()
        let modal: any = container.find(".imageModal").at(0).props()
        expect(modal.visible).toBe(true)
    })
    it("遮罩层", () => {
        container.find(".imageshower-block").at(0).simulate("mouseover")
        container.update()
        let greyStyle: any = container.find(".grey-block").props().style
        expect(greyStyle.opacity).toBe("0.3")

        container.find(".imageshower-block").at(0).simulate("mouseLeave")
        container.update()
        let greyStyleLeave: any = container.find(".grey-block").props().style
        expect(greyStyleLeave.opacity).toBe("0")
    })
    it("图片弹窗", () => {
        let modal: any = container.find(".imageModal").at(0).props()
        modal.onCancel()
        container.update()
        let modalNew: any = container.find(".imageModal").at(0).props()
        expect(modalNew.visible).toBe(false)
    })

    // container.update()
    // container.find("#targetImage")
    // expect(container.find("#targetImage").length).toBe(1)
    // })

    // it("setGreyShow-onMouseOver", async () => {
    //     await container.find(".imageshower-block").at(0).simulate("mouseover")
    //     const returnVal = await container.props()["data-returnresult"]()[0]
    //     await expect(returnVal).toBe("0.3")
    //     await shallow(<ImageShower />, container)
    //     await container.find(".eye-outline").simulate("click")
    //     const modalStatus = await container.props()["data-returnresult"]()[1]
    //     await expect(modalStatus).toBe(true)
    //     await container.find(".delete-outline").simulate("click")
    // })
    // it("setGreyShow-onMouseLeave", () => {
    //     container.find(".imageshower-block").at(0).simulate("mouseleave")
    //     const returnVal = container.props()["data-returnresult"]()[0]
    //     expect(returnVal).toBe("0")
    // })
})
