import React, { useEffect, useState } from "react"
import { PlayCircleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import "../../assets/css/front/swpierComponent.less"

export default function SwpierComponent(props: any) {
    useEffect(() => {
        initSwiper()
    })

    useEffect(() => {
        console.log("swiper", props)
        swiperData()
    }, [props])

    const [swiperArr, setSwiperArr] = useState<any>([1, 2, 3, 4])
    const [initStatus, setInitStatus] = useState<boolean>(false)
    function initSwiper() {
        const galleryThumbs = new Swiper(".gallery-thumbs", {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        })
        const galleryTop = new Swiper(".gallery-top", {
            spaceBetween: 10,
            effect: "fade",
            thumbs: {
                swiper: galleryThumbs,
            },
        })
        setInitStatus(true)
    }
    function swiperData() {
        // let array: any = []
        // props.postData.image_urls.map((item: string) => {
        //     array.push(item)
        // })
        // props.postData.video_urls.map((item: string) => {
        //     array.push(item)
        // })
        if (props.postData !== undefined && props.postData.length !== 0) {
            setSwiperArr(props.postData)
        }
    }

    return (
        <div>
            <div className="swiper-container gallery-top">
                <div className="swiper-wrapper">
                    {swiperArr.map((item: any) => {
                        if (item.file_type == "image") {
                            return <div className="swiper-slide" style={{ backgroundImage: "url(" + item.objectUrl + ")" }}></div>
                        } else if (item.file_type == "video") {
                            return (
                                <div className="swiper-slide">
                                    <video src={item.objectUrl} controls width="100%" height="100%"></video>
                                    {/* <video width="320" height="240" controls>
                                        <source src={item.objectUrl} type="video/mp4" />
                                        您的浏览器不支持 video 标签。
                                    </video> */}
                                </div>
                            )
                        }
                    })}

                    {/* <div className="swiper-slide test1"></div>
                    <div className="swiper-slide test2"></div>
                    <div className="swiper-slide test3"></div>
                    <div className="swiper-slide test4"></div>
                    <div className="swiper-slide test5"></div> */}
                </div>
            </div>
            <div className="target-title">产品简介</div>
            <div>
                <div className="swiper-container small-swiper gallery-thumbs">
                    <div className="swiper-wrapper">
                        {swiperArr.map((item: any) => {
                            if (item.file_type == "image") {
                                return <div className="swiper-slide" style={{ backgroundImage: "url(" + item.objectUrl + ")" }}></div>
                            } else if (item.file_type == "video") {
                                return (
                                    <div className="swiper-slide" style={{ backgroundImage: "url(" + item.videoImageUrl + ")" }}>
                                        <PlayCircleFilled className="playCircleFilled" />
                                    </div>
                                )
                            }
                            // return <div className="swiper-slide" style={{ backgroundImage: "url(" + item.objectUrl + ")" }}></div>
                        })}
                        {/* <div className="swiper-slide test1"></div>
                        <div className="swiper-slide test2"></div>
                        <div className="swiper-slide test3"></div>
                        <div className="swiper-slide test4"></div>
                        <div className="swiper-slide test5"></div> */}
                    </div>
                </div>
                <div className="swiper-button-next swiper-button swiper-button-style swiper-button-right">
                    <RightOutlined />
                </div>
                <div className="swiper-button-prev swiper-button swiper-button-style swiper-button-left">
                    <LeftOutlined />
                </div>
            </div>
        </div>
    )
}
