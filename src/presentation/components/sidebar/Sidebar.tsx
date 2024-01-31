import { NavLink } from "react-router-dom"
import { menuRoutes } from "../../routes/router"


const Sidebar = () => {
    return (
        <>
            {
                menuRoutes.map((route, index) => (
                    <NavLink
                        key={index}
                        to={route.to}
                        className={
                            ({ isActive }) => (
                                isActive
                                    ? "flex flex-row justify-between items-center text-white bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 p-2 rounded-md"
                                    : "flex flex-row justify-between items-center text-white bg-transparent p-2 rounded-md hover:bg-white hover:bg-opacity-10"
                            )
                        }
                    >
                        <div className="flex flex-row items-center">
                            <i className={`fas ${route.icon} text-2xl mr-2`} />
                            <span className="text-sm lg:text-lg">{route.title}</span>
                        </div>
                        <i className="fas fa-chevron-right text-sm lg:text-lg" />
                    </NavLink>
                ))
            }
        </>
    )
}

export default Sidebar