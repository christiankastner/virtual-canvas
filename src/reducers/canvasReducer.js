const initialState = {
    user_id: localStorage["id"], 
    canvas: {}, 
    canvasBursts: [], 
    myBursts: [], 
    canvasShapes: [], 
    myShapes: [],
    selected: '',
    loadedSong: '',
    admin: ''
}

export default function canvasReducer(state = initialState, action) {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                user_id: action.user_id,
                myBursts: state.canvasBursts.filter(animation => animation.user_id == localStorage["id"]),
                myShapes: state.canvasShapes.filter(animation => animation.user_id == localStorage["id"])
            }
        case "LOGOUT":
            return {
                ...state,
                user_id: false,
                myBursts: [],
                myShapes: []
            }
        case "LOAD_CANVAS": 
            return {
                ...state,
                canvas: action.canvas,
                canvasBursts: action.canvas.animate_mos,
                canvasShapes: action.canvas.p5_shapes,
                myBursts: action.canvas.animate_mos.filter(animation => animation.user_id == localStorage["id"]),
                myShapes: action.canvas.p5_shapes.filter(animation => animation.user_id == localStorage["id"]),
                admin: action.canvas.user.id
            }
        case "PATCH_CANVAS":
            return {
                ...state,
                canvas: action.canvas.picture
            }
        case "LOAD_SONG":
            return {
                ...state,
                loadedSong: action.url
            }
        case "HTTP_NEW_BURST":
            return {
                ...state,
                myBursts: [...state.myBursts, action.animation]
            }
        case "HTTP_EDIT_BURST":
            const myBursts = state.myBursts.map(animation => {
                if (animation.id === action.animation.id) {
                    return action.animation
                } else {
                    return animation
                }       
            })
            return {
                ...state,
                myBursts: [...myBursts]
            }
        case "HTTP_DELETE_BURST":
            return {
                ...state,
                myBursts: state.myBursts.filter(animation => animation.id !== action.animation_id)
            }
        case "HTTP_NEW_SHAPE":
            return {
                ...state,
                myShapes: [...state.myShapes, action.animation]
            }
        case "HTTP_EDIT_SHAPE":
            const myShapes = state.myShapes.map(animation => {
                if (animation.id === action.animation.id) {
                    return action.animation
                } else {
                    return animation
                }})
            return {
                ...state,
                myShapes: [...myShapes]
            }
        case "HTTP_DELETE_SHAPE":
            return {
                ...state,
                myShapes: [...state.myShapes.filter(animation => animation.id !== action.animation_id)]
            }
        case "CHANNEL_POST_SHAPE":
            return {
                ...state,
                canvasShapes: [...state.canvasShapes, action.animation.p5_shape]
            }
        case "CHANNEL_PATCH_SHAPE":
            const canvasShapes = state.canvasShapes.map(animation => {
                if (animation.id === action.animation.p5_shape.id) {
                    return action.animation.p5_shape
                } else {
                    return animation
                }
            })
            return {
                ...state,
                canvasShapes: [...canvasShapes]
            }
        case "CHANNEL_DELETE_SHAPE":
            return {
                ...state,
                canvasShapes: [...state.canvasShapes.filter(animation => animation.id !== action.animation_id)]
            }
        case "CHANNEL_POST_BURST":
            return {
                ...state,
                canvasBursts: [...state.canvasBursts, action.animation.animate_mo]
            }
        case "CHANNEL_PATCH_BURST":
            // const unalteredBursts = state.canvasBursts.filter(animation => animation.id !== action.animation.animate_mo.id)
            const canvasBursts = state.canvasBursts.map(animation => {
                if (animation.id === action.animation.animate_mo.id) {
                    return action.animation.animate_mo
                } else {
                    return animation
                }
            })
            return {
                ...state,
                canvasBursts: [...canvasBursts]
            }
        case "CHANNEL_DELETE_BURST":
            return {
                ...state,
                canvasBursts: [...state.canvasBursts.filter(animation => animation.id !== action.animation_id)]
            }
        case "SELECT_ANIMATION":
            return {
                ...state,
                selected: action.animation
            }
        case "REMOVE_CANVAS":
            return {
                ...state,
                canvas: {},
                myAnimations: [],
                canvasAnimations: [],
                selected: '',
                loadedSong: '',
                admin: ''
            }
        default: return state
    }
}