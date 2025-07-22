import { FaVideo } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import image from "../../assets/image.svg"

const TopBar = () => {
    return (
        <div className="col-start-1 row-span-1">
            <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-200 border-b-2 border-blue-700 rounded-t-2xl shadow">
                <div className="flex items-center">
                    <a href="#" className="mr-4">
                        <img src={image} alt="Profile" width={48} height={48} className="rounded-full border-2 border-blue-400 shadow" />
                    </a>
                    <div>
                        <h2 className="text-lg font-bold text-blue-800">Ali</h2>
                        <span className="text-xs text-green-500 font-medium">Online</span>
                    </div>
                </div>
                <div>
                    <ul className="flex items-center gap-5">
                        <li>
                            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition shadow">
                                <FaPhoneAlt color="#2266ff" size={18} />
                            </button>
                        </li>
                        <li>
                            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition shadow">
                                <FaVideo color="#2266ff" size={18} />
                            </button>
                        </li>
                        <li>
                            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition shadow">
                                <BsThreeDotsVertical color="#2266ff" size={18} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopBar