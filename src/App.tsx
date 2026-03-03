import { Header } from "./components/header/Header"
import { AppLayout } from "./components/layout/AppLayout"
import { Board } from "./components/board/Board"
import { Column } from "./components/board/Column"
import { Card } from "./components/board/Card"

function App() {

  return (
    <AppLayout>
      <Header />
      <Board>
        <Column columnTitle="To Do" numberOfCards={1}>
          <Card />
        </Column>
      </Board>
    </AppLayout>
  )
}

export default App
