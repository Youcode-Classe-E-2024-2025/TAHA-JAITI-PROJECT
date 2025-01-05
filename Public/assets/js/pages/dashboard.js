import { fetchStats } from "../api/stats";

export const statPage = () => {
    const element = document.createElement('canvas');
    element.width = 400;
    element.height = 200;
    element.id = 'taskStats'

    renderStats();

    return element
};


const renderStats = async () => {
    const stats = await fetchStats();

    console.log(stats);
    
};

