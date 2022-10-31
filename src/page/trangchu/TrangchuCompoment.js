import IndividualIntervalsExample from "../../Compoment/HomeComponent/SLIDERCOmpoment";
import Tour from "../../Compoment/toursComponent/TourCompoment";

function Home() {
    

    return(
        <>
            <IndividualIntervalsExample />

            <div id="Body-content ">
                <h1 id="Body-content_tour">Tour Trong Nước</h1>
                <Tour />
            </div>
        </>
    )
}
export default Home