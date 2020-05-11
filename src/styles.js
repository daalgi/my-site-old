import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    flex: {
        flex: 1,
        alignItems: "top",
        flexBasis: "100%"
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
    flexRowWrap: {
        [theme.breakpoints.up("sm")]: {
            display: "flex",
            alignItems: "center"
        }
        /*margin: "auto",
        maxWidth: "1800px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",*/
        //display: "block"
    },
    grid: {
        maxWidth: "1600px",
        margin: "auto",
        [theme.breakpoints.up("md")]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gridGap: "20px",
            //gridTemplateRows: "auto 1fr auto",
            alignItems: "start"
        },
        [theme.breakpoints.down("md")]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
            alignItems: "start"
        },
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }
    },
    gridSection: {
        minWidth: "220px",
        margin: "8px auto",
        justifySelf: "center",
        alignSelf: "start",
        flexBasis: "100%"
    },
    gridSectionPlot:{
        minWidth: 300,
        width: "100%"
    },
    columnLayout: {
        maxWidth: "1800px",
        margin: "auto",
        [theme.breakpoints.up("md")]: {
            columnCount: 3,
            columnGap: "16px",
        },
        [theme.breakpoints.down("md")]: {
            columnCount: 2,
            columnGap: "16px"
        },
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }
    },
    columnLayoutSection: {
        breakInside: "avoid",
        minWidth: "320px",
        margin: "auto",
        //flexBasis: "100%"
    },

    contentColumn: {
        //margin: "8px",
        //alignItems: "center",
        //width: "46%",
        //minWidth: "250px",
        //height: "100%",
        [theme.breakpoints.down('xs')]: {
            marginBottom: "8px",
            padding: 0,
            //margin: "auto",
            width: "100%",
            //width: "100%",
            flex: 1
        },
        [theme.breakpoints.up('xs')]: {
            //margin: "auto",
            //marginBottom: "8px",
            //padding: 0,
            marginBottom: "8px",
            //width: "46%",
            minWidth: "320px",
            //width: "calc(50% - 250px)"

        }
        //padding: "16px",
        //maxWidth: "300px"
    },
    pageSubtitle: {
        display: "block",
        margin: "32px 0px 8px 0px",
        width: "100%",
    },
    paragraph: {
        marginBottom: "10px"
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