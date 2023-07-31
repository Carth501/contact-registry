const serverhost = window.location.hostname;

export const saveRecord = async (record) => {
    const endpoint = "api/create_record";
    console.log(record);
    return await fetch(
        // window.location.protocol + '//' + window.location.host + `/${endpoint}`,
        getServerURL() + `${endpoint}`,
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
    const endpoint = "api/retrieve";
    console.log(uuid);
    return await fetch(
        getServerURL() + `${endpoint}`,
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
        getServerURL() + `${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: record
        }
    )
}

const getServerURL = () => {
    return `https://${serverhost}/`;
}