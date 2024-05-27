import VideoPortad from "../../img/img_vlog/video_vlog.mp4";

export const Slider = () => {
    return (
        <div id="slider" className="mb-32 carousel slide w-full h-screen flex" data-ride="carousel">
            <div className="carousel-inner w-full h-full">
                <div className="carousel-item active w-full h-full">
                    <video autoPlay muted loop className="d-block w-full h-full object-cover">
                        <source src={VideoPortad} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

