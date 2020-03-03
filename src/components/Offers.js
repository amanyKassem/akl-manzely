import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, FlatList,} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Right,
    Title, CheckBox,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import StarRating from "react-native-star-rating";
import COLORS from "../consts/colors";
import Modal from "react-native-modal";
import Terms from "./Terms";

class Offers extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity
                onPress     = {() => this.props.navigation.navigate('FilterCategory')}
                key         = { item.index }
                style       = {[styles.position_R, styles.Width_50, styles.bg_red]}>
                <Animatable.View animation="zoomIn" easing="ease-out" delay={500}>
                    <Text>hello</Text>
                </Animatable.View>
            </TouchableOpacity>
        );
    };

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('offers')}</Text>) ,
        drawerIcon      : (<Image style={[styles.headImage]} source={require('../../assets/img/discount.png')} resizeMode={'contain'}/>)
    });

    render() {

        return (
            <Container>

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/left.png')} resizeMode={'contain'}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                            { i18n.t('offers') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_80, styles.right_0, styles.top_0 ]}/>

                    <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100 ]}>

                        <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                <TouchableOpacity
                                    onPress     = {() => this.props.navigation.navigate('Details')}
                                    style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                    <View style = {[ styles.Width_100, styles.position_R ]}>
                                        <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                        <View style={[ styles.position_A, styles.top_10, styles.left_0, styles.overlay_black, styles.flexCenter, styles. paddingVertical_5, styles.paddingHorizontal_10 ]}>
                                            <Text style={[ styles.text_White, styles.textBold, styles.textSize_12 ]}>30 %</Text>
                                        </View>
                                        <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                            <View style     = {[ styles.rowRight ]}>
                                                <Icon
                                                    style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                    type    = "FontAwesome"
                                                    name    = 'circle'
                                                />
                                                <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                    اسم الشيف
                                                </Text>
                                            </View>
                                            <TouchableOpacity>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                        <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                            <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                            <Animatable.View animation="fadeInLeft" easing="ease-out" delay={600} style={[ styles.Width_100 ]}>
                                <TouchableOpacity
                                    onPress     = {() => this.props.navigation.navigate('Details')}
                                    style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                    <View style = {[ styles.Width_100, styles.position_R ]}>
                                        <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/2.png')}/>
                                        <View style={[ styles.position_A, styles.top_10, styles.left_0, styles.overlay_black, styles.flexCenter, styles. paddingVertical_5, styles.paddingHorizontal_10 ]}>
                                            <Text style={[ styles.text_White, styles.textBold, styles.textSize_12 ]}>30 %</Text>
                                        </View>
                                        <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                            <View style     = {[ styles.rowRight ]}>
                                                <Icon
                                                    style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                    type    = "FontAwesome"
                                                    name    = 'circle'
                                                />
                                                <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                    اسم الشيف
                                                </Text>
                                            </View>
                                            <TouchableOpacity>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                        <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                            <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={700} style={[ styles.Width_100 ]}>
                                <TouchableOpacity
                                    onPress     = {() => this.props.navigation.navigate('Details')}
                                    style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                    <View style = {[ styles.Width_100, styles.position_R ]}>
                                        <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/3.png')}/>
                                        <View style={[ styles.position_A, styles.top_10, styles.left_0, styles.overlay_black, styles.flexCenter, styles. paddingVertical_5, styles.paddingHorizontal_10 ]}>
                                            <Text style={[ styles.text_White, styles.textBold, styles.textSize_12 ]}>30 %</Text>
                                        </View>
                                        <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                            <View style     = {[ styles.rowRight ]}>
                                                <Icon
                                                    style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                    type    = "FontAwesome"
                                                    name    = 'circle'
                                                />
                                                <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                    اسم الشيف
                                                </Text>
                                            </View>
                                            <TouchableOpacity>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                        <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                            <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                            <Animatable.View animation="fadeInLeft" easing="ease-out" delay={800} style={[ styles.Width_100 ]}>
                                <TouchableOpacity
                                    onPress     = {() => this.props.navigation.navigate('Details')}
                                    style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                    <View style = {[ styles.Width_100, styles.position_R ]}>
                                        <Image style = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/2.png')}/>
                                        <View style={[ styles.position_A, styles.top_10, styles.left_0, styles.overlay_black, styles.flexCenter, styles. paddingVertical_5, styles.paddingHorizontal_10 ]}>
                                            <Text style={[ styles.text_White, styles.textBold, styles.textSize_12 ]}>30 %</Text>
                                        </View>
                                        <View style         = {[ styles.Width_100, styles.position_A, styles.right_0, styles.bottom_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.rowGroup ]}>
                                            <View style     = {[ styles.rowRight ]}>
                                                <Icon
                                                    style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                    type    = "FontAwesome"
                                                    name    = 'circle'
                                                />
                                                <Text style={[styles.textRegular, styles.text_White, styles.textSize_10]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">
                                                    اسم الشيف
                                                </Text>
                                            </View>
                                            <TouchableOpacity>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                        <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                            <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_12]}>25 كم</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default Offers;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
