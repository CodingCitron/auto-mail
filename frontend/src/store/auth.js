import { create } from 'zustand'

// zustand docs: https://docs.pmnd.rs/zustand/getting-started/introduction
// https://github.com/pmndrs/zustand
// https://www.youtube.com/watch?v=fZPgBnL2x-Q
// https://ui.toast.com/posts/ko_20210812
const DEFAULT_PROPS = {
    user: {
        id: null,
        email: null,
        isLogin: false,
    }
}

const store = (set) => ({
    ...DEFAULT_PROPS,
    login: (user) => 
        set((state) => ({
            user: { 
                ...state.user,  
                ...user,
                isLogin: true
            }
        })),
    logout: () => 
        set((state) =>({
            user: {
                ...state.user,
                ...DEFAULT_PROPS.user
            }
        }))
})

export const useAuthStore = create(store)

