import { FaVideo } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import image from "../../assets/image.svg"

const TopBar = () => {
    return (
        <div className="col-start-1 row-span-1">
            <div className="flex justify-between items-center p-2 border-b-2 border-blue-700 rounded-lg">
                <div className="flex justify-between items-center">
                    <a href="#" className="ml-5">
                        <img src={image} alt="Profile Image" width={"40px"} height={"40px"} />
                    </a>
                    <h2 className="ml-3">Ali</h2>
                </div>
                <div>
                    <ul className="flex justify-between items-center">
                        <li className="mr-5">
                            <a href="#"><FaPhoneAlt color="blue" /></a>
                        </li>
                        <li className="mr-5">
                            <a href="#"><FaVideo color="blue" /></a>
                        </li>
                        <li className="mr-5">
                            <a href="#"><BsThreeDotsVertical color="blue" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopBar