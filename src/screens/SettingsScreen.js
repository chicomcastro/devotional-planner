import React from 'react';
import { TextInput } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, SectionList, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';
import colors from '../utils/colors';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.dataTitleMap = {};
        [
            { title: "Login", label: "username" },
            { title: "Nome", label: "firstName" },
            { title: "Sobrenome", label: "lastName" },
            { title: "Gênero", label: "gender" },
            { title: "Email", label: "mail" },
        ].forEach(item => this.dataTitleMap[item.title] = item);
        this.textInputRefs = {};
        this.state = {
            textInput: "",
        };
    };

    sendUserUpdate = (textInput, dataLabel) => {
        let updateValue = {};
        updateValue[dataLabel] = textInput;
        this.props.updateUser(updateValue);
    };

    Item = ({ title, index, section }) => {
        if (section.title == "Minha conta") {
            let item = this.dataTitleMap[title];
            let dataLabel = item.label;
            let info = this.props.user[dataLabel];
            let textInput = info;
            return (
                <TouchableOpacity style={styles.item} onPress={() => this.textInputRefs[title].focus()}>
                    <Text style={styles.itemLabel}>{title}</Text>
                    <View style={styles.textBox}>
                        <View style={styles.textBoxWrapper}>
                            <TextInput
                                placeholder=""
                                onChangeText={(textInput) => this.sendUserUpdate(textInput, dataLabel)}
                                value={textInput}
                                style={styles.textBoxInput}
                                blurOnSubmit={true}
                                onBlur={() => {
                                    this.sendUserUpdate(textInput, dataLabel);
                                }}
                                ref={(input) => { this.textInputRefs[title] = input; }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        console.log('hey')
                        this.textInputRefs.newDefaultSection.focus();
                    }}
                >
                    { title === 'Adicionar nova seção' ?
                        <View style={styles.textBox}>
                            <View style={styles.textBoxWrapper}>
                                <TextInput
                                    placeholder={title}
                                    onChangeText={(textInput) => this.setState({textInput})}
                                    value={this.state.textInput}
                                    style={styles.textBoxInput}
                                    blurOnSubmit={true}
                                    onBlur={() => {
                                        this.props.addDefaultSection(this.state.textInput);
                                        this.setState({textInput: ''});
                                    }}
                                    ref={(input) => { this.textInputRefs.newDefaultSection = input; }}
                                />
                            </View>
                        </View> : 
                        <View style={{flex: 1, flexDirection: 'row', marginRight: 5, justifyContent: 'space-between',}}>
                            <View style={styles.textWrapper}>
                                <Text>{title}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconWrapper}
                                onPress={() => {
                                    this.props.deleteDefaultSection(title);
                                }}
                            >
                                <Icon
                                    name="delete"
                                    iconStyle={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
            );
        }
    };

    getSections = () => {
        return [
            {
                title: "Minha conta",
                data: Object.keys(this.dataTitleMap),
            },
            {
                title: "Seções padrões",
                data: (this.props.settings.defaultItems || []).concat(['Adicionar nova seção']),
            },
        ];
    };

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <StatusBar backgroundColor={colors.white} barStyle='dark-content'></StatusBar>
                <SectionList
                    sections={this.getSections()}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index, section }) => <this.Item title={item} section={section} />}
                    renderSectionHeader={({ section: { title, icon } }) => (
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{title.toUpperCase()}</Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 2, marginLeft: 20 }}></View>}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user, settings: state.settings };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: bindActionCreators(actions.updateUser, dispatch),
        addDefaultSection: bindActionCreators(actions.addDefaultSection, dispatch),
        deleteDefaultSection: bindActionCreators(actions.deleteDefaultSection, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SettingsScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    item: {
        backgroundColor: colors.background,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemLabel: {
        color: 'gray',
        fontSize: 14,
    },
    itemInfo: {
        fontSize: 14,
        width: 10,
        height: 10,
    },
    header: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    headerIcon: {
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 14,
        color: colors.essence2,
    },
    textBox: {
        // width: '70%',
    },
    textBoxWrapper: {
        // backgroundColor: 'black',
    },
});