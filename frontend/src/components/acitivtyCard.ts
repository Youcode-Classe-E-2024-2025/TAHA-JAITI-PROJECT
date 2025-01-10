import { ActivityLog } from "@/types/activityLog";
import { fixDate } from "@/util/formatDate";



export const logCard = (item: ActivityLog) => {
    const element = document.createElement('div');
    element.className = `relative flex items-start`;
    element.innerHTML = `            <!-- Timeline line -->
                    <div class="absolute top-8 left-[17px] w-[2px] h-full bg-purple-500/20"></div>
                    
                    <!-- Icon -->
                    <div class="flex-shrink-0 mr-4">
                        <div class="p-1 rounded-full bg-purple-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="flex-grow">
                        <div class="bg-gray-800 rounded-lg p-4 hover:bg-gray-800/80 transition-colors">
                            <div class="flex items-center justify-between mb-2 gap-10">
                                <span class="text-purple-400 font-semibold">${item.action}</span>
                                <span class="text-gray-400 text-sm">${fixDate(item.created_at)}</span>
                            </div>
                            <p class="text-gray-300 text-sm">${item.details}</p>
                        </div>
                    </div>`;

    return element;
}
