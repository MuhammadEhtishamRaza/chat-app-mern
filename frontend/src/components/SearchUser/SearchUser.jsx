import { FaSearch } from "react-icons/fa";

const SearchUser = () => {
    return (
        <div>
            <div className="flex items-center border-b-2 border-[#2266ff] p-2">
                <div className="mr-2">
                    <FaSearch />
                </div>
                <input type="text" name="search" id="search" placeholder="Search User" className="focus-within:outline-none w-full" />
            </div>
        </div>
    )
}

export default SearchUser