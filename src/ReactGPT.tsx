import { RouterProvider } from "react-router-dom"
import { routes } from "./presentation/routes/router"

const ReactGPT = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default ReactGPT