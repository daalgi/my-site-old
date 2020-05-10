import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    flex: {
        flex: 1
    },
    flexGrow: {
        flexGrow: 1
    },
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "16px"
    },
    pageTitle: {
        display: "block",
        margin: "8px 0px 32px 0px",
        width: "100%",
        justifyContent: "center",
        textAlign: "center"
    },
    contentContainer: {
        margin: "auto",
        maxWidth: "900px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    contentColumn: {
        margin: "8px",
        alignItems: "center",
        width: "46%",
        minWidth: "250px",
        height: "100%",
        [theme.breakpoints.down('xs')]: {
            margin: "auto",
            marginBottom: "8px",
            padding: 0,
            width: "100%"
        }
        //padding: "16px",
        //maxWidth: "300px"
    },
    pageSubtitle: {
        display: "block",
        //margin: "8px 0px 32px 0px",
        width: "100%",
    },
    contentMaxWidth: {
        //margin: "auto",
        maxWidth: "900px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    formItem: {
        //textAlign: "center",
        //justifyContent: "center",
        margin: "10px 0px 16px 0px",
        //padding: "18px",
        //width: "100%",
        width: "300px",
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        }
    },
}))

export default useStyles