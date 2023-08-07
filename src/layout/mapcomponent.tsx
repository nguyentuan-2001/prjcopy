import Search from "./search"
import FindWay from "./findway"
import Header from "./header"
import Detail from "./detail"
import Sidebar from "./sidebar"
import Alladdress from "./alladdress"

function MapComponent(){
    return(
        <div className="all__map">
            <Header/>
            <div className="main__map">
                <div id="map"/>
            </div>
            <Alladdress/>
            <Sidebar/>
            <Detail/>
            <Search/>
            <FindWay/>
        </div>
    )
}
export default MapComponent