// 扩展全局变量
export declare global {
    interface IUserCommon {
        indexId: number
        product_type: string
        content_id: string
        content_name: string
        content_type: string
        publisher: string
        key?: string
        name?: string
        dataIndex?: string
        title?: string | React.ReactNode
    }
    interface PublisherFilterList {
        text: string
        value: string
    }
    interface IUserInfo extends IUserCommon {
        record_id: string
        created_date: string
    }
    interface IContents extends IUserCommon {
        record_id: string
        status: string
        release_date: string
        release_manager: string
        cancel_date: string
        cancel_manager: string
        save_date: string
    }
    interface TagList {
        title?: string
        dataIndex?: number
        id: number
        text: string
        slug: string
        description: string
        key?: string
        name?: string
        term_id?: string
        product_type?: string
        content_type?: string
    }
    interface UserList {
        id?: number
        title?: string
        dataIndex?: number
        user_id_short: string
        email: string
        phone: string
        nickname: string
        user_type: string
    }
    // Router
    interface iRouterViewProps {
        location?: any;
        // 进入路由之前的钩子
        beforeEnter?: (path: string) => void;
    }
}
