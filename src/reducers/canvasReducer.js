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
        case "HTTP_EDIT_Burst":
            const newBursts = state.myBursts.filter(animation => animation.id !== action.animation.id)
            return {
                ...state,
                myBursts: [
                    ...newBursts, 
                    action.animation
                ]
            }
        case "CHANNEL_POST_BURST":
            return {
                ...state,
                canvasBursts: [...state.canvasBursts, action.animation.animate_mo]
            }
        case "CHANNEL_PATCH_BURST":
            const unalteredBursts = state.canvasAnimations.filter(animation => animation.id !== action.animation.animate_mo.id)
            return {
                ...state,
                canvasAnimations: [
                    ...unalteredBursts, 
                    action.animation.animate_mo
                ]
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