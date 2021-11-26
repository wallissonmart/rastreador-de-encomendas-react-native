import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  containerTop: {
    justifyContent: "flex-start"
  },
  button__home: {
    marginRight: 40
  },
  textPage: {
    backgroundColor: "orange",
    padding: 20
  },
  darkbg: {
    backgroundColor: "#333"
  },
  login__logomarca: {
    marginBottom: 10
  },
  login__msg: (text = "none") => ({
    fontWeight: "bold",
    fontSize: 22,
    color: "red",
    marginBottom: 15,
    display: text
  }),
  login__form: {
    width: "80%"
  },
  login__input: {
    backgroundColor: "#fff",
    fontSize: 19,
    padding: 7,
    marginBottom: 15,
    borderRadius: 5,
  },
  login__button: {
    padding: 12,
    backgroundColor: "gray",
    alignSelf: "center",
    borderRadius: 5,
  },
  login__buttonText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#333"
  },
  area__tab: {
    backgroundColor: "#333",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  area__menu: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 10,
    width: "100%",
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center"
  },
  button__home2: {
    textAlign: "left"
  },
  area__title: {
    width: "80%",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  },
  button__logout: {
    textAlign: "right"
  },
  inputText: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  inputTextSimple: {
    paddingTop: 10
  },
  buttonSimple: {
    paddingTop: 20,
    width: 150,
    alignSelf: "center",
  },
  profile__input: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 19,
    padding: 2,
    marginBottom: 10,
    paddingTop: 30
  },
  profile__input2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
    padding: 2,
    marginBottom: 10,
    paddingTop: 21
  },
  qr__code: (display = 'flex') => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    display: display
  }),
  qr__form: (display = 'none') => ({
    width: '100%',
    display: display
  }),
  rastreio__inputMargin: {
    marginTop: 20,
    marginBottom: 30,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20
  }
});
export { css };
