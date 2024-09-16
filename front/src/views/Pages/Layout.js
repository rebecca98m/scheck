import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import {Divider, ThemeProvider} from "@mui/material";


import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#44626b',
            contrastText: '#fff',
        },
        secondary: {
            main: '#6F3A32',
            contrastText: '#fff',
        },
        info: {
            main: '#3C3F43',
            contrastText: '#fff',
        },
        warning: {
            main: '#CEA249',
            contrastText: '#fff',
        },
        error: {
            main: '#6F3A32',
            contrastText: '#fff',
        },
        success: {
            main: '#547348',
            contrastText: '#fff',
        }
    },
});

const Layout = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="page">
                    <Header/>
                    <Divider orientation="vertical" flexItem />
                    <div className="content">
                        <Spinner show={false}/>
                        <Outlet />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
};

export default Layout;