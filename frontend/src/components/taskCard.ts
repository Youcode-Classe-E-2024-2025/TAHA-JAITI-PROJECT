import { Task } from "@/types/task";




const taskCard = (task: Task) => {
    const element = document.createElement('div');
    element.className = 'tasks bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer';
    
}