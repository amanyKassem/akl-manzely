import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity,} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title, Right, Icon, Form, Item, Input, CheckBox, Toast
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import Modal from "react-native-modal";
import { NavigationEvents } from "react-navigation";

class NewProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectFilter                : false,
            filter                      : i18n.t('producer'),
            filterId                    : null,
            name                        : '',
            nameStatus                  : 0,

        }
    }

    activeInput(type) {

        if (type === 'name' || this.state.name !== '') {
            this.setState({nameStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'name' && this.state.name === '') {
            this.setState({nameStatus: 0})
        }

    }

    validate = () => {
        let isError     = false;
        let msg         = '';


        if (this.state.filterId === null) {
            isError     = true;
            msg         = i18n.t('kindpro');
        } else if (this.state.name.length <= 0) {
            isError     = true;
            msg         = i18n.t('namepro');
        }
        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center',
                }
            });
        }
        return isError;
    };

    onEditPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            this.props.navigation.navigate('Home');
        }

    }

    toggleModalFilter = () => {
        this.setState({ selectFilter: !this.state.selectFilter});
    };

    selectfilterId(id, name) {
        this.setState({
            filterId         : id,
            filter           : name
        });
        this.setState({ selectFilter: !this.state.selectFilter});
    }

    componentWillMount() {

        this.setState({spinner: true});

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={[styles.headImage]} source={require('../../assets/img/left.png')} resizeMode={'contain'}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_red, styles.textSize_16, styles.textLeft, styles.Width_100, styles.paddingHorizontal_5, styles.paddingVertical_0]}>
                            { i18n.t('addpro') }
                        </Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.Width_100 , styles.paddingVertical_10]}>

                        <View style={[ styles.marginVertical_10, styles.Width_90, styles.flexCenter, styles.bg_White, styles.paddingHorizontal_10 ]}>

                            <Form style={[styles.flexCenter, styles.marginVertical_10, styles.Width_100]}>

                                <View style={[styles.overHidden, styles.rowGroup]}>
                                    <TouchableOpacity onPress={() => this.toggleModalFilter()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, (this.state.filterId !== null ? styles.border_red :  styles.border_gray )]}>
                                        <Text style={[styles.textRegular, styles.textSize_14, (this.state.filterId !== null ? styles.text_red :  styles.text_black )]}>
                                            { this.state.filter }
                                        </Text>
                                        <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />
                                    </TouchableOpacity>
                                </View>

                                <Modal isVisible={this.state.selectFilter} onBackdropPress={() => this.toggleModalFilter()}>
                                    <View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>

                                        <View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                                {i18n.t('producer')}
                                            </Text>
                                        </View>

                                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectfilterId(1, 'لحم')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.filterId === 1}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        لحم
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                onPress             = {() => this.selectfilterId(2, 'برجر')}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style               = {[styles.checkBox, styles.bg_red, styles.border_red]}
                                                        color               = {styles.text_red}
                                                        selectedColor       = {styles.text_red}
                                                        checked             = {this.state.filterId === 2}
                                                    />
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        برجر
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('nameproducer')}
                                            style={[styles.input, styles.height_50, (this.state.nameStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(name) => this.setState({name})}
                                            onBlur={() => this.unActiveInput('name')}
                                            onFocus= {() => this.activeInput('name')}
                                            value= {this.state.name}
                                        />
                                    </Item>
                                </View>

                                <TouchableOpacity
                                    style       = {[ styles.marginVertical_25 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter, styles.bg_red,]}
                                    onPress     = {() => this.onEditPressed()}
                                >
                                    <Text style={[styles.textRegular, styles.textSize_13, styles.text_White]}>
                                        { i18n.t('confirm') }
                                    </Text>
                                </TouchableOpacity>

                            </Form>

                        </View>
                    </View>

                </Content>

            </Container>

        );
    }
}

export default NewProduct;

// const mapStateToProps = ({ auth, profile, lang }) => {
//     return {
//         auth: auth.user,
//         user: profile.user,
//         lang: lang.lang
//     };
// };
// export default connect(mapStateToProps, {})(Home);
