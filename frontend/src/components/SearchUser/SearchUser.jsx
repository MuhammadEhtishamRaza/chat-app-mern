import { FaSearch } from "react-icons/fa";

const SearchUser = () => {
    return (
        <div className="px-4 pt-4">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-[#2266ff] p-3 rounded-xl shadow focus-within:ring-2 focus-within:ring-blue-400 transition">
                <div className="mr-3 text-blue-600">
                    <FaSearch size={18} />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search User"
                    className="focus:outline-none w-full bg-transparent text-blue-900 placeholder:text-blue-400 font-medium"
                />
            </div>
        </div>
    )
}

export default SearchUser