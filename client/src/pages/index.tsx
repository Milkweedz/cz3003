import { withUrqlClient } from 'next-urql'
import { Container } from '../components/Container'
import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => (
  <Container height="100vh">
    <NavBar />
    <Home />
  </Container>

)

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index);
