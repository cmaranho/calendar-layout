import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";

//pages
import Home from './src/pages/Home'

const AppNavigator = createStackNavigator(
    {
        Home: Home
    },

    {
        initialRouteName: "Home",

        defaultNavigationOptions: {
            header: null,
        },
        
        mode: 'modal',

    }
);

export default createAppContainer(AppNavigator);