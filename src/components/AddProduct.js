import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from "react-native";
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
import {getDeliveryTypes , getCategories} from "../actions";
import Modal from "react-native-modal";
import { NavigationEvents } from "react-navigation";
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
import * as Permissions from 'expo-permissions';
import * as Animatable from "react-native-animatable";
import CategoryPicker from "./CategoryPicker"

let base64   = [];

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectFilter                : false,
            filter                      : i18n.t('filtermon'),
            filterId                    : null,
            selectKind                  : false,
            selectSubKind               : false,
            subKind                     : i18n.t('filtersub'),
            subKindId                   : null,
            selectTimeOut               : false,
            timeOut                     : '',
            price                       : '',
            priceStatus                 : 0,
            discount                    : '',
            discountStatus              : 0,
            timeOutStatus              : 0,
            active                      : 1,
            imageBrowserOpen            : false,
            cameraBrowserOpen           : false,
            photos                      : [],
            arrayInputs                 : [],
            mainCat                 : null,

        }
    }

    activeInput(type) {

        if (type === 'price' || this.state.price !== '') {
            this.setState({priceStatus: 1})
        }

        if (type === 'discount' || this.state.discount !== '') {
            this.setState({discountStatus: 1})
        }

        if (type === 'timeOut' || this.state.timeOut !== '') {
            this.setState({timeOutStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'price' && this.state.price === '') {
            this.setState({priceStatus: 0})
        }

        if (type === 'discount' && this.state.discount === '') {
            this.setState({discountStatus: 0})
        }

        if (type === 'timeOut' || this.state.timeOut !== '') {
            this.setState({timeOutStatus: 0})
        }

    }

    joinData = () => {

        this.state.arrayInputs.push(<View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}><Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}><Input placeholder={i18n.translate('addpro')} style={[styles.input, styles.height_50]}/></Item></View>);
        this.setState({ arrayInputs: this.state.arrayInputs });

    }

    onEditPressed() {

        this.setState({spinner: true});

        this.props.navigation.navigate('Home');

    }

    onSubCategories ( id ){
        this.setState({spinner: true, active : id });
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            this.setState({ userImage: result.uri ,base64:result.base64});
        }
    };

    toggleModalFilter = () => {
        this.setState({ selectFilter: !this.state.selectFilter});
    };

    selectFilter(id, name , cat) {
        this.setState({
            filterId        : id,
            filter          : name,
            mainCat          : cat,
        });
        this.setState({ selectFilter: !this.state.selectFilter});
    }

    toggleModalSubKind = () => {
        this.setState({ selectSubKind: !this.state.selectSubKind});
    };

    selectSubKind(id, name , child) {
        this.setState({
            subKindId      : id,
            subKind        : name,
            child          : child,
        });
        this.setState({ selectSubKind: !this.state.selectSubKind});
    }



    componentWillMount() {
        this.setState({spinner: true});
        this.props.getDeliveryTypes(this.props.lang);
        this.props.getCategories(this.props.lang ,null);

    }

    async componentDidMount() {
        base64 = [];
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    }

    imgItems = (item, imageId) => {
        return(
            <View style={[ styles.width_70, styles.height_70, styles.marginHorizontal_5, styles.marginVertical_5]}>
                <View style={[ styles.position_A, styles.Border, styles.border_gray, styles.Width_100, styles.height_full, styles.overlay_white, { left : -5, top : -5 } ]} />
                <View style={[ styles.bg_White, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Border, styles.border_gray,styles.width_70, styles.height_70, styles.overHidden, styles.position_R]}>
                    <Image style={[styles.Width_100, styles.height_full]} source={{uri: item.file}} resizeMode={'cover'}/>
                    <TouchableOpacity
                        onPress     = {() => this.deleteImage(item)}
                        style       = {[styles.position_A , styles.overlay_black, styles.Width_100, styles.height_full, styles.flexCenter, styles.top_5]}>
                        <Icon type  = {'EvilIcons'} name={'close'} style={[styles.text_red, styles.textSize_20]} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    deleteImage(item){
        let index = this.state.photos.indexOf(item);
        let photos = this.state.photos;
        photos.splice(index, 1);
        this.setState({ photos, refreshed: !this.state.refreshed, imageId: null })
    }

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            let images = this.state.photos;
            this.setState({
                imageBrowserOpen: false,
                photos: images.concat(photos)
            });

            const imgs = this.state.photos;
            console.log(imgs);
            for (var i =0; i < imgs.length; i++){
                const imageURL = imgs[i].file;
                Image.getSize(imageURL, (width, height) => {
                    var imageSize = {
                        size: {
                            width,
                            height
                        },
                        offset: {
                            x: 0,
                            y: 0,
                        },
                    };

                    ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
                        console.log(imageURI);
                        ImageStore.getBase64ForTag(imageURI, (base64Data) => {
                            base64.push(base64Data);
                            ImageStore.removeImageForTag(imageURI);
                        }, (reason) => console.log(reason) )
                    }, (reason) => console.log(reason) )
                }, (reason) => console.log(reason))
            }
        }).catch((e) => console.log(e))
    };

    onFocus(){
        this.componentWillMount();
    }

    render() {

        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }

        let image = this.state.userImage;

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
                    <Right style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress= {() => this.props.navigation.navigate('TermsAddProduct')}>
                            <Text style={[ styles.textRegular , styles.text_black, styles.textSize_14, styles.textDecoration ]}>
                                { i18n.t('termlern') }
                            </Text>
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[ styles.position_A, styles.bg_gray, styles.Width_100, styles.height_70, styles.right_0, styles.top_0, styles.zIndexDown ]}/>

                    <View style={[ styles.position_R, styles.zIndex, styles.Width_100 , styles.paddingVertical_10]}>

                        <View style={[ styles.position_R, styles.Width_100, styles.scroll]}>

                            <View style={[ styles.position_R, styles.Width_45, styles.height_150]}>
                                <View style={[ styles.position_A, styles.top_10, styles.left_0, styles.overlay_white, styles.height_full, styles.zIndexDown, styles.Border, styles.border_gray, { width : '106%' } ]} />
                                <View style={[ styles.position_R, styles.overHidden,styles.Width_100, styles.height_150, styles.flexCenter, styles.bg_White, styles.Border, styles.border_gray ]}>
                                    <TouchableOpacity
                                        style       = {[styles.width_40, styles.height_40, styles.bg_light_red, styles.flexCenter, styles.position_A, styles.right_10, styles.top_10, styles.zIndex]}
                                        onPress     = {() => this.setState({imageBrowserOpen: true})}>
                                        <Icon style = {[styles.text_red, styles.textSize_20]} type="AntDesign" name='plus' />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[ styles.position_R, styles.Width_50, styles.rowCenter, styles.marginHorizontal_20 ]}>
                                <FlatList
                                    data            = {this.state.photos}
                                    renderItem      = {({item}) => this.imgItems(item, this.state.imageId)}
                                    numColumns      = {2}
                                    keyExtractor    = {this._keyExtractor}
                                    extraData       = {this.state.refreshed}
                                />
                            </View>
                        </View>

                        <View style={[ styles.marginVertical_10, styles.Width_85, styles.flexCenter ]}>

                            <Form style={[styles.flexCenter, styles.marginVertical_10, styles.Width_100]}>

                                <CategoryPicker categories={this.props.categories} />


                                {/*<View style={[styles.overHidden, styles.rowGroup]}>*/}
                                    {/*<TouchableOpacity onPress={() => this.toggleModalFilter()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, (this.state.filterId !== null ? styles.border_red :  styles.border_gray )]}>*/}
                                        {/*<Text style={[styles.textRegular, styles.textSize_14, (this.state.filterId !== null ? styles.text_red :  styles.text_black )]}>*/}
                                            {/*{ this.state.filter }*/}
                                        {/*</Text>*/}
                                        {/*<Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />*/}
                                    {/*</TouchableOpacity>*/}
                                {/*</View>*/}

                                {/*<Modal isVisible={this.state.selectFilter} onBackdropPress={() => this.toggleModalFilter()}>*/}
                                    {/*<View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>*/}

                                        {/*<View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>*/}
                                            {/*<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>*/}
                                                {/*{i18n.t('filtermon')}*/}
                                            {/*</Text>*/}
                                        {/*</View>*/}

                                        {/*<View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>*/}

                                            {/*{*/}
                                                {/*this.props.categories.map((cat, i) => (*/}
                                                    {/*<TouchableOpacity*/}
                                                        {/*key={i}*/}
                                                        {/*style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                                                        {/*onPress             = {() => this.selectFilter(cat.id, cat.name , cat)}*/}
                                                    {/*>*/}
                                                        {/*<View style={[styles.overHidden, styles.rowRight]}>*/}
                                                            {/*<CheckBox*/}
                                                                {/*style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                                                                {/*color               = {styles.text_red}*/}
                                                                {/*selectedColor       = {styles.text_red}*/}
                                                                {/*checked             = {this.state.filterId === 1}*/}
                                                            {/*/>*/}
                                                            {/*<Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                                                                {/*{cat.name}*/}
                                                            {/*</Text>*/}
                                                        {/*</View>*/}
                                                    {/*</TouchableOpacity>*/}
                                                {/*))*/}
                                            {/*}*/}
                                        {/*</View>*/}

                                    {/*</View>*/}
                                {/*</Modal>*/}

                                {/*{*/}
                                    {/*this.state.mainCat !== null &&  this.state.mainCat.childes.length > 0 ?*/}
                                         {/*<View>*/}
                                             {/*<View style={[styles.overHidden, styles.rowGroup]}>*/}
                                                 {/*<TouchableOpacity onPress={() => this.toggleModalSubKind()} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, (this.state.subKindId !== null ? styles.border_red :  styles.border_gray )]}>*/}
                                                     {/*<Text style={[styles.textRegular, styles.textSize_14, (this.state.subKindId !== null ? styles.text_red :  styles.text_black )]}>*/}
                                                         {/*{ this.state.subKind }*/}
                                                     {/*</Text>*/}
                                                     {/*<Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='down' />*/}
                                                 {/*</TouchableOpacity>*/}
                                             {/*</View>*/}

                                             {/*<Modal isVisible={this.state.selectSubKind} onBackdropPress={() => this.toggleModalSubKind()}>*/}
                                                 {/*<View style={[styles.overHidden, styles.bg_White, styles.Radius_5]}>*/}

                                                     {/*<View style={[styles.Border, styles.border_gray, styles.paddingVertical_15]}>*/}
                                                         {/*<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>*/}
                                                             {/*{i18n.t('filtersub')}*/}
                                                         {/*</Text>*/}
                                                     {/*</View>*/}

                                                     {/*<View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>*/}
                                                         {/*{*/}
                                                             {/*this.state.mainCat.childes.map((child, i) => (*/}
                                                                 {/*<TouchableOpacity*/}
                                                                     {/*key={i}*/}
                                                                     {/*style               = {[styles.rowGroup, styles.marginVertical_10]}*/}
                                                                     {/*onPress             = {() => this.selectSubKind(child.id, child.name , child)}*/}
                                                                 {/*>*/}
                                                                     {/*<View style={[styles.overHidden, styles.rowRight]}>*/}
                                                                         {/*<CheckBox*/}
                                                                             {/*style               = {[styles.checkBox, styles.bg_red, styles.border_red]}*/}
                                                                             {/*color               = {styles.text_red}*/}
                                                                             {/*selectedColor       = {styles.text_red}*/}
                                                                             {/*checked             = {this.state.subKindId === 1}*/}
                                                                         {/*/>*/}
                                                                         {/*<Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_20]}>*/}
                                                                             {/*{child.name}*/}
                                                                         {/*</Text>*/}
                                                                     {/*</View>*/}
                                                                 {/*</TouchableOpacity>*/}
                                                             {/*))*/}
                                                         {/*}*/}
                                                     {/*</View>*/}

                                                 {/*</View>*/}
                                             {/*</Modal>*/}
                                         {/*</View>*/}
                                        {/*:*/}
                                         {/*null*/}
                                 {/*}*/}


                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('monyproducer')}
                                            style={[styles.input, styles.height_50, (this.state.priceStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(price) => this.setState({price})}
                                            onBlur={() => this.unActiveInput('price')}
                                            onFocus= {() => this.activeInput('price')}
                                            value= {this.state.price}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('sallproducer')}
                                            style={[styles.input, styles.height_50, (this.state.discountStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(discount) => this.setState({discount})}
                                            onBlur={() => this.unActiveInput('discount')}
                                            onFocus= {() => this.activeInput('discount')}
                                            value= {this.state.discount}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('timeeat')}
                                            style={[styles.input, styles.height_50, (this.state.timeOutStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(timeOut) => this.setState({timeOut})}
                                            onBlur={() => this.unActiveInput('timeOut')}
                                            onFocus= {() => this.activeInput('timeOut')}
                                            value= {this.state.timeOut}
                                        />
                                    </Item>
                                </View>



                                <View>
                                    {this.state.arrayInputs}
                                </View>

                                <View style={[styles.overHidden, styles.rowGroup]}>
                                    <TouchableOpacity
                                        style       = {[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, styles.border_gray]}
                                        onPress     = {() => this.joinData()}
                                    >
                                        <Text style={[styles.textRegular, styles.textSize_14]}>
                                            { i18n.t('adding') }
                                        </Text>
                                        <Icon style={[styles.textSize_20, styles.text_light_gray]} type="AntDesign" name='plus' />
                                    </TouchableOpacity>
                                </View>

                                <View style={[ styles.marginVertical_10, styles.Width_100 ]}>
                                    <Text style={[ styles.textRegular , styles.text_black, styles.textSize_14, styles.rowRight ]}>
                                        { i18n.t('delver') }
                                    </Text>
                                </View>

                                <View style={[ styles.height_40 ]}>
                                    <ScrollView style={[ styles.scroll ]} horizontal={true} showsHorizontalScrollIndicator={false}>

                                        {
                                            this.props.deliveryTypes.map((type, i ) => {
                                                return(
                                                    <TouchableOpacity
                                                        onPress         = {() => this.onSubCategories(this.state.deliveryTypesArr ,type.id , type.name)}
                                                        style           = {[ styles.paddingHorizontal_25, styles.paddingVertical_5, styles.flexCenter, styles.marginVertical_5, styles.marginHorizontal_5, ( this.state.active === type.id  ? styles.bg_black : styles.bg_gray ) ]}>
                                                        <Text style     = {[ styles.textRegular, styles.textSize_12 , ( this.state.active === type.id ? styles.text_White : styles.text_black_gray )]} >
                                                            {type.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }


                                    </ScrollView>
                                </View>

                                <TouchableOpacity
                                    style       = {[ styles.marginVertical_25 , styles.width_150, styles.paddingHorizontal_10, styles.paddingVertical_10 , styles.flexCenter, styles.bg_red,]}
                                    onPress     = {() => this.onEditPressed()}
                                >
                                    <Text style={[styles.textRegular, styles.textSize_13, styles.text_White]}>
                                        { i18n.t('confirm') }
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ styles.marginVertical_10, styles.Width_100, styles.rowCenter ]} onPress={() => this.props.navigation.navigate('NewProduct')}>
                                    <Text style={[ styles.textRegular , styles.text_red, styles.textSize_14, styles.textDecoration ]}>
                                        { i18n.t('neworder') }
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


const mapStateToProps = ({ auth, profile, lang , deliveryTypes , categories}) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang,
        deliveryTypes   : deliveryTypes.deliveryTypes,
        categories: categories.categories,
    };
};
export default connect(mapStateToProps, {getDeliveryTypes , getCategories})(AddProduct);
