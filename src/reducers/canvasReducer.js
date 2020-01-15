const initialState = {canvas: {}, canvasAnimations: [], myAnimations: null, selectAnimation: null}

export default function canvasReducer(state = initialState, action) {
    
    switch(action.type) {
        case "LOAD_CANVAS": 
            return {
                ...state,
                canvas: action.canvas,
                canvasAnimations: action.canvas.animate_mos,
                myAnimations: action.canvas.animate_mos.filter(animation => animation.user_id == localStorage["id"])
            }
        case "HTTP_NEW_ANIMATION":
            return {
                ...state,
                myAnimations: [...state.myAnimations, action.animation]
            }
        case "HTTP_EDIT_ANIMATION":
            return {
                ...state,
                myAnimations: [
                    ...state.myAnimations.filter(animation => animation.id !== action.animation.id), 
                    action.animation
                ],
                selectAnimation: action.animation,
            }
        case "CHANNEL_POST":
            return {
                ...state,
                canvasAnimations: [...state.canvasAnimations, action.animation]
            }
        case "CHANNEL_PATCH":
            return {
                ...state,
                canvasAnimations: [
                    ...state.canvasAnimations.filter(animation => animation.id !== action.animation.id), 
                    action.animation
                ]
            }
        case "SELECT_ANIMATION":
            return {
                ...state,
                selectAnimation: action.animation
            }
        case "REMOVE_CANVAS":
            return {
                canvas: {},
                myAnimations: [],
                canvasAnimations: [],
                selectAnimation: {}
            }
        default: return state
    }
}