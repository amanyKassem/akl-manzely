import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, I18nManager} from "react-native";

import Home                     from "../components/Home";
import Language                 from "../components/Language";
import Login                    from "../components/Login";
import ChooseUser               from "../components/ChooseUser";
import Register                 from "../components/Register";
import ForgetPassword           from "../components/ForgetPassword";
import NewPassword              from "../components/NewPassword";
import ActivtionAccount         from "../components/ActivtionAccount";
import Details                  from "../components/Details";
import MapLocation              from "../components/MapLocation";
import FilterSearch             from "../components/FilterSearch";
import DetailsChef              from "../components/DetailsChef";
import Notification             from "../components/Notification";
import Cart                     from "../components/Cart";
import About                    from "../components/About";
import Terms                    from "../components/Terms";
import Faq                      from "../components/Faq";
import Offers                   from "../components/Offers";
import Favorite                 from "../components/Favorite";
import DetailsCart              from "../components/DetailsCart";
import Payment                  from "../components/Payment";
import FormPayment              from "../components/FormPayment";
import ConfirmPayment           from "../components/ConfirmPayment";
import Profile                  from "../components/Profile";
import EditProfile              from "../components/EditProfile";
import MyOrders                 from "../components/MyOrders";
import DetailsOrder             from "../components/DetailsOrder";
import CallUs                   from "../components/CallUs";
import Setting                  from "../components/Setting";
import BankAccounts             from "../components/BankAccounts";
import FormBank                 from "../components/FormBank";
import ViewProduct              from "../components/ViewProduct";
import TermsAddProduct          from "../components/TermsAddProduct";
import EditShop                 from "../components/EditShop";
import AddProduct               from "../components/AddProduct";
import NewProduct               from "../components/NewProduct";
import InitScreen               from "../components/InitScreen";
import ShareApp                 from "../components/ShareApp";
import Credit                   from "../components/Credit";
import EditBankAcc              from "../components/EditBankAcc";
import DrawerCustomization      from "./DrawerCustomization";

const width = Dimensions.get('window').width;
const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    Profile             : Profile,
    MyOrders            : MyOrders,
    Offers              : Offers,
    Favorite            : Favorite,
    BankAccounts        : BankAccounts,
    Credit              : Credit,
    About               : About,
    Faq                 : Faq,
    ShareApp            : ShareApp,
    Terms               : Terms,
    CallUs              : CallUs,
    Setting             : Setting,
},
    {
    initialRouteName    : 'Home',
    drawerPosition      : I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '100%',
    contentComponent    : drawerCust
});

const AppNavigator = createStackNavigator({
    InitScreen : {
        screen : InitScreen,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    Credit : {
        screen : Credit,
        navigationOptions: {
            header: null
        }
    },
    AddProduct : {
        screen : AddProduct,
        navigationOptions: {
            header: null
        }
    },
    ShareApp : {
        screen : ShareApp,
        navigationOptions: {
            header: null
        }
    },
    ViewProduct : {
        screen : ViewProduct,
        navigationOptions: {
            header: null
        }
    },
    editBankAcc : {
        screen : EditBankAcc,
        navigationOptions: {
            header: null
        }
    },
    Setting : {
        screen : Setting,
        navigationOptions: {
            header: null
        }
    },
    Register : {
        screen : Register,
        navigationOptions: {
            header: null
        }
    },
    FormPayment : {
        screen : FormPayment,
        navigationOptions: {
            header: null
        }
    },
    FormBank : {
        screen : FormBank,
        navigationOptions: {
            header: null
        }
    },
    FilterSearch : {
        screen : FilterSearch,
        navigationOptions: {
            header: null
        }
    },
    EditProfile : {
        screen : EditProfile,
        navigationOptions: {
            header: null
        }
    },
    DetailsCart : {
        screen : DetailsCart,
        navigationOptions: {
            header: null
        }
    },
    DetailsOrder : {
        screen : DetailsOrder,
        navigationOptions: {
            header: null
        }
    },
    DetailsChef : {
        screen : DetailsChef,
        navigationOptions: {
            header: null
        }
    },
    Details : {
        screen : Details,
        navigationOptions: {
            header: null
        }
    },
    NewProduct : {
        screen : NewProduct,
        navigationOptions: {
            header: null
        }
    },
    EditShop : {
        screen : EditShop,
        navigationOptions: {
            header: null
        }
    },
    TermsAddProduct : {
        screen : TermsAddProduct,
        navigationOptions: {
            header: null
        }
    },
    Profile : {
        screen : Profile,
        navigationOptions: {
            header: null
        }
    },
    BankAccounts : {
        screen : BankAccounts,
        navigationOptions: {
            header: null
        }
    },
    Language : {
        screen : Language,
        navigationOptions: {
            header: null
        }
    },
    CallUs : {
        screen : CallUs,
        navigationOptions: {
            header: null
        }
    },
    MyOrders : {
        screen : MyOrders,
        navigationOptions: {
            header: null
        }
    },
    ConfirmPayment : {
        screen : ConfirmPayment,
        navigationOptions: {
            header: null
        }
    },
    Payment : {
        screen : Payment,
        navigationOptions: {
            header: null
        }
    },
    Favorite : {
        screen : Favorite,
        navigationOptions: {
            header: null
        }
    },
    Offers : {
        screen : Offers,
        navigationOptions: {
            header: null
        }
    },
    Faq : {
        screen : Faq,
        navigationOptions: {
            header: null
        }
    },
    Terms : {
        screen : Terms,
        navigationOptions: {
            header: null
        }
    },
    About : {
        screen : About,
        navigationOptions: {
            header: null
        }
    },
    Cart : {
        screen : Cart,
        navigationOptions: {
            header: null
        }
    },
    Notification : {
        screen : Notification,
        navigationOptions: {
            header: null
        }
    },
    MapLocation : {
        screen : MapLocation,
        navigationOptions: {
            header: null
        }
    },
    ActivtionAccount : {
        screen : ActivtionAccount,
        navigationOptions: {
            header: null
        }
    },
    NewPassword : {
        screen : NewPassword,
        navigationOptions: {
            header: null
        }
    },
    ForgetPassword : {
        screen : ForgetPassword,
        navigationOptions: {
            header: null
        }
    },
    ChooseUser : {
        screen : ChooseUser,
        navigationOptions: {
            header: null
        }
    },

});

export default createAppContainer(AppNavigator);
