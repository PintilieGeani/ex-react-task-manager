export const initialState = {
    tasks: [],
    loading: true
}

export function taskReducer(state, action) {
    switch (action.type) {
        case "LOAD_TASKS":
            return { ...state, tasks: action.payload, loading: false }
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] }
        case "REMOVE_TASK":
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            }
        case "REMOVE_MULTIPLE_TASKS":
            return {
                ...state,
                tasks: state.tasks.filter(task => !action.payload.includes(task.id))
            }
        default: return state
    }

} 