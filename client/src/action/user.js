// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    const url = "/users/check-session";
    fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.text();
        }
    })
    .then(text => {
        if (text) {
            app.setState({ email: text });
        }
    })
    .catch(error => {
        console.log(error);
    });
};

export const checkAdmin = (app) => {
    const url = "/getInfo";

    fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        if (json) {
            app.setState({ isAdmin: json.isAdmin });
        }
    })
    .catch(error => {
        console.log(error);
    });
}
