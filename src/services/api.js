// export const API_ROOT = 'https://intense-harbor-90528.herokuapp.com';

//development
export const API_ROOT = 'http://localhost:3000'
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

const fetchCanvas = (canvasId) => fetch(`${API_ROOT}/pictures/${canvasId}`)

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
    return fetch(`${API_ROOT}/pictures/${canvasId}`, {
        method: 'DELETE',
        headers: HEADERS
    })
}
const newAnimation = (modelName, canvasId) => {
    return fetch(`${API_ROOT}/${modelName}s`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            [`${modelName}`]: {
                user_id: localStorage["id"],
                picture_id: canvasId,
            }
        })
    })
}

const editP5 = (shapeId, data) => {
    return fetch(`${API_ROOT}/p5_shapes/${shapeId}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(data)}
    )
}

const deleteP5 = (shapeId) => {
    return fetch(`${API_ROOT}/p5_shapes/${shapeId}`, {
        method: "DELETE",
        headers: HEADERS
    })
}

const editMojs = (burstId, data) => {
    return fetch(`${API_ROOT}/animate_mos/${burstId}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(data)})
}

const deleteMojs = (burstId) => {
    return fetch(`${API_ROOT}/animate_mos/${burstId}`, {
        method: "DELETE",
        headers: HEADERS
    })
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
    },
    p5: {
        editP5,
        deleteP5
    },
    mojs: {
        editMojs,
        deleteMojs
    }
}