import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import contactInfo from './ContactInfoReducer';
import questions from './QuestionsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    contactInfo,
    questions,
});
