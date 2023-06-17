const serverhost = window.location.hostname;
const serverport = 3001;

export const saveRecord = async (record) => {
    const endpoint = "/api/contact";
    console.log(record);
    await fetch(
        `http://${serverhost}:${serverport}${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: record
        }
    )
}

export const retrieveRecord = async (uuid) => {
    const endpoint = "/api/retrieve";
    await fetch(
        `http://${serverhost}:${serverport}${endpoint}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: {uuid}
        }
    )
}