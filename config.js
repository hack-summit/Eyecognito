import {
    Platform,
  } from 'react-native';
  
  const colors = {
    background: '#dddddd',
    primary: '#ffffff',
    secondary: '#45454d',
    tertiary: '#eeeeee',
    success: '#ff4949',
    error: 'orange',
    warning: '#B89038',
    light: '#b1b1b1',
    dark: '#9A9B9D',
    danger: '#E62122',
  };
  
  let extra_header_options =
    Platform.OS === 'ios' ? {} : {marginTop: -30, height: 75};
  
  const serverIP = '192.168.43.251:8000';
  const theme = {
    Header: {
      containerStyle: {
        ...extra_header_options,
        backgroundColor: colors.success,
        borderBottomWidth: 0,
      },
    },
    Card: {
      containerStyle: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        borderWidth: 0,
        elevation: 3,
      },
      titleStyle: {
        color: colors.success,
        padding: 8,
        backgroundColor: colors.tertiary,
        fontWeight: 'bold',
        fontSize: 15,
      },
      dividerStyle: {backgroundColor: colors.success},
      // wrapperStyle: {marginTop:0, marginLeft: 0, marginRight: 0}
    },
    Button: {
      titleStyle: {fontSize: 10, color: colors.tertiary},
      buttonStyle: {backgroundColor: colors.success},
      containerStyle: {width: '100%', alignSelf: 'center'},
    },
    ButtonGroup: {
      textStyle: {fontSize: 14, color: colors.success},
      buttonStyle: {backgroundColor: colors.tertiary},
      containerStyle: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.primary,
      },
    },
    ListItem: {
      containerStyle: {backgroundColor: colors.primary, borderBottomWidth: 0.5},
      titleStyle: {color: colors.secondary},
      subtitleStyle: {color: colors.light},
      rightTitleStyle: {color: colors.success, textAlign: 'right'},
      rightSubtitleStyle: {color: colors.light, textAlign: 'right'},
    },
  
    Input: {
      inputContainerStyle: {borderBottomWidth: 0},
      inputStyle: {
        borderBottomWidth: 0.5,
        color: colors.secondary,
        borderBottomColor: colors.success,
      },
      placeholderTextColor: colors.secondary,
    },
    Text: {
      h4Style: {
        color: colors.secondary,
        flex: 1,
        textAlignVertical: 'center',
        marginTop: -20,
        fontSize: 15,
        fontWeight: 'normal',
      },
      style: {
        color: colors.light,
      },
    },
  };
  
  export {theme, serverIP, colors};
  