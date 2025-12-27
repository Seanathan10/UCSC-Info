import {TopBar as MobileTopBar} from "../components/navbar/mobile/TopBar";
import {TopBar as DesktopTopBar} from "../components/navbar/desktop/TopBar";
import {useContext} from "react";
import { Context } from "../Context";

export default function Dashboard() {
    const contextValues = useContext(Context);
    return (
        <>
            {contextValues?.mobile ? (<MobileTopBar />) : (<DesktopTopBar />)}

            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard!</p>
                <p>Here you can find all the information you need.</p>
                <p>Use the navigation bar to access different sections.</p>
                <p>Have a great day!</p>
                <p>Enjoy your time at UCSC!</p>
                <p>Go Slugs!</p>
                <p>Go Banana Slugs!</p>
                <p>Go Slugs!</p>
                <p>Go Banana Slugs!</p>
                <p>Go Slugs!</p>
                <p>Go Banana Slugs!</p>
                <p>Go Slugs!</p>

            </div>
        </>
    )
}
