import { Route } from "react-router"
import { Container, Grid } from "semantic-ui-react"

const BlankLayout = ({ component: Component, ...args }) => {
  return (
    <Route
      {...args}
      render={props => (
        <BlankLayout>
          <>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Container className="app__content" fluid>
                  <Container fluid className="app__content-wrapper">
                    <Component {...props} />
                  </Container>
                </Container>
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid>
          </>
        </BlankLayout>
      )}
    />
  )
}

export default BlankLayout
