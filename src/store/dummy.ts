import { proxy, subscribe } from 'valtio';
import { type DB } from "~/types"

const localSectionsStore = localStorage.getItem('localSectionsStore')

export const sectionsStore = proxy<DB.SectionData[]>(
    !!localSectionsStore ? JSON.parse(localSectionsStore) as DB.SectionData[] : []
)
subscribe(sectionsStore, () => {
    localStorage.setItem('localSectionStore', JSON.stringify(sectionsStore))
})


