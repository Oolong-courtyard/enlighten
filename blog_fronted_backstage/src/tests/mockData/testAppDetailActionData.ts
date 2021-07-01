export const RES_SUCCESS = {
    code: 100,
    detail: {
        status: "success",
    },
    message: "success",
}
export const GET_APP_DETAIL_ACTION_TAG_TERMS = {
    code: 100,
    message: "success",
    detail: {
        terms: [
            { content_type: "application", description: "test测试1", product_type: "any_backup_cloud", slug: "dsd", term_id: "bf0004fbe28a435b88bb07154cb0c836", text: "测试测试" },
            { content_type: "application", description: "fdfgf", product_type: "any_backup_cloud", slug: "dsd", term_id: "bf0004fbe28a435b88bb07154cb0c836", text: "测试测试" },
        ],
    },
}
export const GET_APP_DETAIL_ACTION_GROUP_TERMS = {
    code: 100,
    message: "success",
    detail: {
        terms: [
            { content_type: "application", description: "test测试", product_type: "any_backup_cloud", slug: "dsd", term_id: "bf0004fbe28a435b88bb07154cb0c836", text: "测试测试" },
            { content_type: "application", description: "fdfgf", product_type: "any_backup_cloud", slug: "dsd", term_id: "bf0004fbe28a435b88bb07154cb0c836", text: "测试测试" },
        ],
    },
}

export const GET_APP_DETAIL = {
    code: 100,
    message: "success",
    detail: {
        content_id: "f8ddade0c66c41e680a614a02e8d7bfb",
        record_id: "4db2acd0-d553-4339-a1d9-477fae56fee2",
        product_type: "any_share_cloud",
        content_name: "ys测试应用0011111",
        publisher: "test",
        description: "123",
        content_type: "application",
        version: "0.0.1",
        product_info: "456",
        logo_url: "https://developers-test.obs.cn-east-2.myhuaweicloud.com/medias/images/7b743276-60e9-416d-b472-09bb79689472_2020-07-21:09:10:46.jpeg",
        thumbnail_url: "test",
        preview_media_urls: { value: [{ indexId: 1, file_name: "2.jpeg", progress: 100, file_type: "image", objectUrl: "https://developers-test.obs.cn-east-2.myhuaweicloud.com/medias/images/e2dd01e7-0af2-4a0d-bd0b-4b04292d5e81_2020-07-21:09:10:52.jpeg" }] },
        support_info: { email: "overflowys@163.com", phone: "18221824120" },
        file_list: [{ file_id: "94c88e6190d941bda61660e72c9664b3", file_name: "2.jpeg" }],
    },
}

export const GET_EDIT_TAG = { code: 100, message: "success", detail: { relations: { record_id: "e565db2916394b12b67e40a14a795813", term_type: "tag", terms: [{ term_id: "32a9b3b5f78e4dc6a2bbd7b8f124cada", slug: "life", text: "生活", description: "请问企鹅去" }] } } }
export const GET_EDIT_GROUP = { code: 100, message: "success", detail: { relations: { record_id: "e565db2916394b12b67e40a14a795813", term_type: "group", terms: [{ term_id: "829246d42cb84d738ff3f908cbb35f8d", slug: "news", text: "新闻", description: "哒哒大事" }] } } }
