import axios from 'axios';

export const fetchAllData = () => async (dispatch) => {
    try {
        dispatch({ type: 'DATA_REQUEST' });

        const { data = {} } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");

        dispatch({ type: 'DATA_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'DATA_FAILURE', payload: error.message });
    }
};

// ... (other imports)

export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
    try {
        dispatch({ type: 'SELECT_DATA_REQUEST' });

        let user = false;
        let selectedData = [];

        if (group === 'status') {
            selectedData = processStatusData(allTickets);
        } else if (group === 'user') {
            user = true;
            selectedData = processUserData(allTickets);
        } else {
            selectedData = processPriorityData(allTickets);
        }

        sortSelectedData(selectedData, orderValue);

        dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } });
    } catch (error) {
        dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message });
    }
};

// Helper functions

const processStatusData = (allTickets) => {
    const mySet = new Set();
    const selectedData = [];

    allTickets.forEach((elem) => {
        mySet.add(elem.status);
    });

    const arr = [...mySet];

    arr.forEach((elem, index) => {
        const arr = allTickets.filter((fElem) => elem === fElem.status);
        selectedData.push({
            [index]: {
                title: `Custom Status ${index + 1}`, // Change the custom title here
                value: [
                    { id: 1, title: `Ticket ${index + 1}`, status: `Custom Status ${index + 1}` },
                    // Add more tickets for Custom Status ${index + 1}
                ],
            },
        });
    });

    return selectedData;
};

const processUserData = (allTickets) => {
    const selectedData = [];

    allTickets?.allUser?.forEach((elem, index) => {
        const arr = allTickets?.allTickets?.filter((Felem) => elem.id === Felem.userId);

        selectedData.push({
            [index]: {
                title: `Custom User ${index + 1}`, // Change the custom title here
                value: [
                    { id: 1, title: `Ticket ${index + 1}`, userId: elem.id },
                    // Add more tickets for Custom User ${index + 1}
                ],
            },
        });
    });

    return selectedData;
};

const processPriorityData = (allTickets) => {
    const prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];
    const selectedData = [];

    prior_list.forEach((elem, index) => {
        const arr = allTickets.filter((fElem) => index === fElem.priority);

        selectedData.push({
            [index]: {
                title: `Custom Priority ${index + 1}`, // Change the custom title here
                value: [
                    { id: 1, title: `Ticket ${index + 1}`, priority: index },
                    // Add more tickets for Custom Priority ${index + 1}
                ],
            },
        });
    });

    return selectedData;
};

const sortSelectedData = (selectedData, orderValue) => {
    if (orderValue === "title") {
        selectedData.forEach((elem) => {
            elem[Object.keys(elem)]?.value?.sort((a, b) => a.title.localeCompare(b.title));
        });
    }

    if (orderValue === "priority") {
        selectedData.forEach((elem) => {
            elem[Object.keys(elem)]?.value?.sort((a, b) => b.priority - a.priority);
        });
    }
};
