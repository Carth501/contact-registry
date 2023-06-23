const serverhost = window.location.hostname;
const serverport = 3001;

export const saveRecord = async (record) => {
    const endpoint = "/api/create_record3";
    console.log(record);
    return await fetch(
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
    console.log(uuid);
    return await fetch(
        `http://${serverhost}:${serverport}${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: uuid
        }
    )
}

export const saveClient = async (record) => {
    const endpoint = "/api/newCustomer";
    return await fetch(
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