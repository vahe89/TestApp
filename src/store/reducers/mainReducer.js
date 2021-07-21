import {
    SHOW_MENU,
    HIDE_MENU,
} from '../../actionsTypes'

const initialState = {
    showMenu: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SHOW_MENU: {
            return {
                ...state,
                showMenu: true,
            }
        }
        case  HIDE_MENU: {
            return {
                ...state,
                showMenu: false,
            }
        }

        default: {
            return state;
        }
    }
}
