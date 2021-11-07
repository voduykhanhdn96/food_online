import { Route } from "react-router"
import { Container, Grid } from "semantic-ui-react"
import Header from "../components/CustomerLayout/CustomerHeader"

const CustomerLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              <Header></Header>
              <Container className="app__content" fluid>
                <Container fluid className="app__content-wrapper">
                  <Component {...props} />
                </Container>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid>
        </>
      )}
    />
  )
}

export default CustomerLayout
