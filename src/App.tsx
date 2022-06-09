import { FC } from "react"
import { ErrorBoundary } from "./components"
import { RowsPageProvider } from "./context/RowsPageContext"
import Github from "./pages/Github"

const App:FC = () => {
  return (
    <ErrorBoundary>
      <RowsPageProvider>
        <Github/>
      </RowsPageProvider>
    </ErrorBoundary>
  )
}

export default App