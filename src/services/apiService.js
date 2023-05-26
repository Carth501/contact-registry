
export const apiService = async () => {

}

export const saveRecord = async (record) => {
    const serverhost = window.location.hostname;
    const serverport = 3001;
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