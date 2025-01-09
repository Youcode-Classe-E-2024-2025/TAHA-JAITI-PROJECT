type id = number | null;

const getUserId = (): id => {
    const storageId = localStorage.getItem('userId');

    if (storageId){
        const parsedId = JSON.parse(storageId);

        return Number(parsedId);
    }

    return null
};

export default getUserId;