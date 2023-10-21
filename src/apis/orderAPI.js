export const orderAPI = {
    getSuppliers: async function (payload) {
        const response = await fetch("http://localhost:8000/allSuppliers");
        return response.json();
    },
    getPurchaseOrder: async function (payload) {
        const response = await fetch("http://localhost:8000/getPurchaseOrder", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return response.json();
    },
    getUserAddedInfo: async function (payload) {
        const response = await fetch("http://localhost:8000/getUserAddedInfo");
        return response.json();
    },
    getDescription: async function (payload) {
        const response = await fetch("http://localhost:8000/getDescription", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return response.json();
    },
    addOrder: async function (payload) {
        const response = await fetch("http://localhost:8000/addOrder", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return response.json();
    },
}