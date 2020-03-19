export const API_ROOT = 'https://intense-harbor-90528.herokuapp.com';
export const API_WS_ROOT = 'wss://intense-harbor-90528.herokuapp.com/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const getUser = () => fetch(`${API_ROOT}/users/${localStorage["id"]}`)

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

export const api = {
    user: {
        getUser
    },
    canvas: {
        bookmarkCanvas,
        fetchCanvas
    }
}