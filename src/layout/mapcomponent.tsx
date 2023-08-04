import Search from "./search"
import FindWay from "./findway"
import Header from "./header"
import TabName from "./tabname"
import Detail from "./detail"
import MapNew from "./mapnew"

function MapComponent(){
    return(
        <div className="all__map">
            <Header/>
            <div className="main__map">
                <div id="map"/>
            </div>
            <MapNew/>
            <TabName/>
            <Detail/>
            <Search/>
            <FindWay/>
        </div>
    )
}
export default MapComponent