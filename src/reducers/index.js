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
import providerHome from './ProviderHomeReducer';
import mealInfo from './MealInfoReducer';
import deliveryTypes from './DeliveryTypesReducer';
import countries from './CountriesReducer';
import changePassword from './ChangePasswordReducer';
import genders from './gendersReducer';
import bill from './BillReducer';
import carts from './CartsReducer';
import cartInfo from './CartInfoReducer';

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
    providerHome,
    mealInfo,
    deliveryTypes,
    countries,
    changePassword,
    genders,
    bill,
    carts,
    cartInfo,
});
