import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      name: {
        color: '#000', 
        fontSize: 18, 
        fontWeight: "bold"
      },
      friends: {
        color: '#000', 
        fontSize: 18, 
        fontWeight: "bold", 
        alignSelf: 'flex-start',
        paddingHorizontal: 10
      },
      mail: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 16
      },
      logo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 10,
      },
      icon: {
        width: 20,
        height: 15,
      },
  })
