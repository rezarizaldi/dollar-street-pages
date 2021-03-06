import * as StreetSettingsActions from './street-settings.actions';
import { StreetSettingsState } from '../../../interfaces';

export const initialState: StreetSettingsState = {
  streetSettings: null
};

export function streetSettingsReducer(state: StreetSettingsState = initialState, action: StreetSettingsActions.Actions): StreetSettingsState {
    switch (action.type) {
        case StreetSettingsActions.GET_STREET_SETTINGS_SUCCESS: {
            return Object.assign({}, state, {streetSettings: action.payload});
        }

        default:
            return state;
    }
}
