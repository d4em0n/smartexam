import {SET_PROFILE, UNSET_PROFILE} from '../actions/profile';
export default function profile(state = null, action) {
    switch(action.type) {
        case SET_PROFILE:
            return action.data;
        case UNSET_PROFILE:
            return null;
        default:
            return state;
    }
}
