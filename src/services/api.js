export const API_ROOT = 'https://intense-harbor-90528.herokuapp.com';
export const API_WS_ROOT = 'wss://intense-harbor-90528.herokuapp.com/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const getUser = () => fetch(`${API_ROOT}/users/${localStorage["id"]}`)

const userLogin = (user) => {
    return fetch(`${API_ROOT}/users/login`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({user: user})
  })
}

const userCreate = (user) => {
    return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({user: user})
  })
}

const bookmarkCanvas = (canvasId) => {
    return fetch(`${API_ROOT}/users/${localStorage["id"]}/bookmarks`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            bookmark: {
                user_id: localStorage["id"],
                picture_id: this.props.canvas.id
            }
        })
    })
}

const fetchCanvas = (canvasId) => fetch(`${API_ROOT}/pictures/${this.props.match.params.id}`)

const fetchCanvases = () => fetch(`${API_ROOT}/pictures`)

const newCanvas = (canvas) => {
    return fetch(`${API_ROOT}/pictures`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            picture: canvas,
        })
    })
}

const editCanvas = (canvasId, data) => {
    return fetch(`${API_ROOT}/pictures/${canvasId}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(data)
    })
}

const deleteCanvas = (canvasId) => {
    return fetch(`${API_ROOT}/pictures/${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
}
const newAnimation = (modelName) => {
    return fetch(`${API_ROOT}/${modelName}s`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            [`${modelName}`]: {
                user_id: localStorage["id"],
                picture_id: props.canvas_id,
            }
        })
    })
}

const editAnimation = (animation) => {
    return 
}

export const api = {
    user: {
        getUser,
        userLogin,
        userCreate
    },
    canvas: {
        bookmarkCanvas,
        fetchCanvas,
        fetchCanvases,
        newCanvas,
        editCanvas,
        deleteCanvas
    },
    animation: {
        newAnimation,
        editAnimation: 
    }
}