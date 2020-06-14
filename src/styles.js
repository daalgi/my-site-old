import { makeStyles } from '@material-ui/core/styles'

const contentMaxWidth = "1200px"

const useStyles = makeStyles(theme => ({
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0",
        padding: 0,
        maxWidth: contentMaxWidth,
        minWidth: "320px",
        margin: "0 auto"
    },
    pageTitle: {
        display: "block",
        margin: "16px 0px 32px 0px",
        width: "100%",
        textAlign: "center"
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
        maxWidth: contentMaxWidth,
        margin: 16
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

    dataGridCell: {
        background: "hsl(0, 0%, 20%)",
        color: "hsl(0, 0%, 90%)",
        textAlign: "center",
        border: "1px solid hsl(0, 0%, 30%)",
        width: "100%"
    },
    dataGridCellEditable: {
        background: "hsl(0, 0%, 26%)",
        color: "hsl(0, 0%, 90%)",
        textAlign: "center",
        border: "1px solid hsl(0, 0%, 32%)"
    },
    dataGridHeader: {
        background: "hsl(0, 0%, 15%)",
        color: "hsl(0, 0%, 90%)",
        textAlign: "center",
        border: "1px solid hsl(0, 0%, 30%)"
    }

}))

export default useStyles