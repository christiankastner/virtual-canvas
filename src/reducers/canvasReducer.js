const initialState = {
    user_id: localStorage["id"], 
    canvas: {}, 
    canvasShapes: [], 
    myShapes: [],
    myBrush: {
        red: 0,
        green: 0,
        blue: 0,
        weight: 1
    },
    selected: 'paint',
    loadedSong: '',
    admin: ''
}

export default function canvasReducer(state = initialState, action) {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                user_id: action.user_id,
                myShapes: state.canvasShapes.filter(animation => animation.user_id == localStorage["id"])
            }
        case "LOGOUT":
            return {
                ...state,
                user_id: false,
                myShapes: []
            }
        case "LOAD_CANVAS": 
            return {
                ...state,
                canvas: action.canvas,
                canvasShapes: action.canvas.p5_shapes,
                myShapes: action.canvas.p5_shapes.filter(animation => animation.user_id == localStorage["id"]),
                admin: action.canvas.user.id
            }
        case "PATCH_CANVAS":
            return {
                ...state,
                canvas: action.canvas.picture
            }
        case "LOAD_SONG":
            URL.revokeObjectURL(state.loadedSong)
            return {
                ...state,
                loadedSong: {
                    name: action.name,
                    url: action.url
                }
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
        case "SELECT_ANIMATION":
            return {
                ...state,
                selected: action.animation
            }
        case "BRUSH_EDIT":
            return {
                ...state,
                myBrush: action.brush
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