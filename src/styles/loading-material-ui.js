import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 3,
        color: "#fff",
    }
}));