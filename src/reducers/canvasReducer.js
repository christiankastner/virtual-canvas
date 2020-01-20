const initialState = {
    user_id: '', 
    canvas: {}, 
    canvasBursts: [], 
    myBursts: [], 
    canvasShapes: [], 
    myShapes: [],
    selected: ''
}

export default function canvasReducer(state = initialState, action) {

    switch(action.type) {
        case "LOAD_CANVAS": 
            return {
                ...state,
                canvas: action.canvas,
                canvasBursts: action.canvas.animate_mos,
                canvasShapes: action.canvas.p5_shapes,
                myBursts: action.canvas.animate_mos.filter(animation => animation.user_id == localStorage["id"]),
                myShapes: action.canvas.p5_shapes.filter(animation => animation.user_id == localStorage["id"])
            }
        case "HTTP_NEW_BURST":
            return {
                ...state,
                myBursts: [...state.myBursts, action.animation]
            }
        case "HTTP_EDIT_BURST":
            // const newBursts = state.myBursts.filter(animation => animation.id !== action.animation.id)
            const idBurst = state.myBursts.indexOf(animation => animation.id === action.animation.id)
            return {
                ...state,
                myBursts: [
                    ...state.myBursts.slice(0, idBurst), 
                    action.animation,
                    ...state.myBursts.slice(idBurst + 1)
                ]
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
            // const newShapes = state.myShapes.filter(animation => animation.id !== action.animation.id)
            const idShape = state.myShapes.indexOf(animation => animation.id === action.animation.id)
            return {
                ...state,
                myShapes: [
                    ...state.myShapes.slice(0, idShape),
                    action.animation,
                    ...state.myShapes.slice(idShape + 1)
                ]
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
            const idPShape = state.canvasShapes.indexOf(animation => animation.id === action.animation.p5_shape.id)
            console.log(idPShape)
            return {
                ...state,
                canvasShapes: [
                    ...state.canvasShapes.slice(0, idPShape),
                    action.animation.p5_shape,
                    ...state.canvasShapes.slice(idPShape + 1)
                ]
            }
        case "CHANNEL_DELETE_SHAPE":
            return {
                ...state,
                canvasShapes: [...state.canvasShapes.filter(animation => animation.id !== action.animation_id)]
            }
        case "CHANNEL_POST_BURST":
            return {
                ...state,
                canvasBursts: [...state.canvasBursts, action.animation]
            }
        case "CHANNEL_PATCH_BURST":
            const unalteredBursts = state.canvasBursts.filter(animation => animation.id !== action.animation.animate_mo.id)
            idBurst = state.canvasBursts.indexOf(animation => animation.id === action.animation.animate_mo.id)
            return {
                ...state,
                canvasBursts: [
                    ...state.canvasBursts.slice(0, idBurst), 
                    action.animation.animate_mo,
                    ...state.canvasBursts.slice(idBurst + 1)
                ]
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
                canvas: {},
                myAnimations: [],
                canvasAnimations: [],
                selected: ''
            }
        default: return state
    }
}