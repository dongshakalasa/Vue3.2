import { Swipe, SwipeItem, Popup } from 'vant'

let plugins=[
    Popup, Swipe, SwipeItem
]

export default function getVant(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}