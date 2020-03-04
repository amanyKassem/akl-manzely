import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import contactInfo from './ContactInfoReducer';
import questions from './QuestionsReducer';
import notifications from './NotificationsReducer';
import bankAcoounts from './BankAcoountsReducer';
import banks from './BanksReducer';
import categories from './CategoriesReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    contactInfo,
    questions,
    notifications,
    bankAcoounts,
    banks,
    categories,
});
