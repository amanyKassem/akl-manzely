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
    Toast,
    Input,
    Title, Form, Item, CheckBox,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import * as Animatable from 'react-native-animatable';
import StarRating from "react-native-star-rating";
import COLORS from "../consts/colors";
import Modal from "react-native-modal";

const isIOS = Platform.OS === 'ios';

class DetailsChef extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            isModalInfo                 : false,
            isModalFilter               : false,
            category                    : 'وجبات سريعه',
            categoryId                  : null,
        }
    }

    toggleModalInfo = () => {
        this.setState({ isModalInfo   : !this.state.isModalInfo});
    };

    toggleModalFilter = () => {
        this.setState({ isModalFilter   : !this.state.isModalFilter});
    };

    selectCategoryId(id, name) {
        this.setState({
            checked         : id,
            category        : name
        });
        this.state.categoryId = id;
        this.setState({ isModalFilter   : !this.state.isModalFilter});
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
                            الشيف شعوذه
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.toggleModalInfo()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/info.png')} resizeMode={'contain'}/>
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <Modal isVisible={this.state.isModalInfo} onBackdropPress={() => this.toggleModalInfo()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                        <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20]}>

                            <View style={[styles.paddingVertical_15]}>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.textCenter , styles.SelfCenter]}>
                                    {i18n.t('datapro')}
                                </Text>
                            </View>

                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                <View style={[ styles.marginVertical_10 ]}>
                                    <View style={[ styles.rowRight, styles.marginVertical_5]}>
                                        <Icon style={[styles.textSize_13, styles.text_black_gray, styles.marginHorizontal_5]} type="Feather" name='map-pin' />
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>
                                            شارع الندم التخصصي
                                        </Text>
                                    </View>
                                    <View style={[ styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5 ]}>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>{i18n.t('delver')} : </Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>24 كم</Text>
                                    </View>
                                    <View style={[ styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5 ]}>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>{i18n.t('timedelver')} : </Text>
                                        <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_13]}>استلام من الشيف / علي حسب المسافه</Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </Modal>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_80, styles.right_0, styles.top_0 ]}/>

                    <View style={[ styles.marginVertical_10, styles.overHidden ]}>
                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                    <View style={[ styles.height_80 , styles.flex_25, styles.overHidden, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_5 ]}>
                                        <Image style = {[styles.Width_100 , styles.height_80, styles.Border, styles.border_White]} source={require('../../assets/img/girl.png')}/>
                                    </View>
                                    <View style={[ styles.flex_75 ]}>
                                        <View style={[ styles.rowRight]}>
                                            <Icon
                                                style   = {[styles.text_green, styles.textSize_5, styles.marginHorizontal_5]}
                                                type    = "FontAwesome"
                                                name    = 'circle'
                                            />
                                            <Text style={[styles.textBold, styles.text_black, styles.textSize_13]}>
                                                بيتزا الندم
                                            </Text>
                                        </View>
                                        <Text style={[styles.textBold, styles.text_black, styles.textSize_12, styles.rowRight]}>
                                            #30
                                        </Text>
                                        <View style={[styles.rowRight, styles.marginVertical_5]}>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {3}
                                                fullStarColor   = {COLORS.red}
                                                starSize        = {12}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                        <View style={[ styles.rowRight]}>
                                            <Text style={[styles.textRegular, styles.text_black_gray, styles.textSize_10]}>
                                                جميع انواع الماكولات بجميع انواع المشروبات
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </Animatable.View>
                    </View>

                    <View style={[styles.overHidden, styles.rowGroup]}>
                        <TouchableOpacity onPress={() => this.toggleModalFilter()} style={[ styles.marginVertical_5 , styles.marginHorizontal_15 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.rowGroup, styles.bg_red]}>
                            <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                { this.state.category }
                            </Text>
                            <Icon style={[styles.textSize_14, styles.text_White]} type="AntDesign" name='down' />
                        </TouchableOpacity>
                    </View>

                    <Modal isVisible={this.state.isModalFilter} onBackdropPress={() => this.toggleModalFilter()} style={[ styles.bottomCenter, styles.Width_100 ]}>
                        <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20]}>

                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                <TouchableOpacity
                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                    onPress             = {() => this.selectCategoryId(1, 'وجبات بطيئه')}
                                >
                                    <View style={[styles.overHidden, styles.rowRight]}>
                                        <CheckBox
                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                            color               = {styles.text_red}
                                            selectedColor       = {styles.text_red}
                                            checked             = {this.state.checked === 1}
                                        />
                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                            وجبات بطيئه
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                    onPress             = {() => this.selectCategoryId(2, 'وجبات حاره')}
                                >
                                    <View style={[styles.overHidden, styles.rowRight]}>
                                        <CheckBox
                                            style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                            color               = {styles.text_red}
                                            selectedColor       = {styles.text_red}
                                            checked             = {this.state.checked === 2}
                                        />
                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                            وجبات حاره
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>

                    <View style={[ styles.marginVertical_10 ]}>

                        <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden, styles.Width_100 ]}>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style            = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/1.png')}/>
                                            <TouchableOpacity style = {[ styles.position_A, styles.right_0, styles.top_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.flexCenter ]}>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style            = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/2.png')}/>
                                            <TouchableOpacity style = {[ styles.position_A, styles.right_0, styles.top_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.flexCenter ]}>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                            <View style={[ styles.overHidden, styles.Width_47, styles.marginHorizontal_5, styles.marginVertical_5 ]}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[ styles.Width_100 ]}>
                                    <TouchableOpacity
                                        onPress     = {() => this.props.navigation.navigate('Details')}
                                        style       = {[styles.position_R, styles.Width_100, styles.Border, styles.border_gray, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                                        <View style = {[ styles.Width_100, styles.position_R ]}>
                                            <Image style            = {[styles.Width_100 , styles.height_100]} source={require('../../assets/img/3.png')}/>
                                            <TouchableOpacity style = {[ styles.position_A, styles.right_0, styles.top_0, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.overlay_black, styles.flexCenter ]}>
                                                <Icon
                                                    style       = {[styles.text_gray, styles.textSize_20]}
                                                    type        = "MaterialIcons"
                                                    name        = 'favorite-border'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style = {[ styles.Width_100, styles.marginVertical_5 ]}>
                                            <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                <Text style={[styles.textRegular, styles.text_red, styles.textSize_12]}>برجر لحم</Text>
                                            </View>
                                            <View style={[ styles.rowGroup ]}>
                                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_12]}>10 ر.س</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>

                        </View>


                    </View>

                </Content>

            </Container>

        );
    }
}

export default DetailsChef;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
