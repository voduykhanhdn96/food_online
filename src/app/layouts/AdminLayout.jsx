import { Route } from "react-router-dom"
import { Container, Grid } from "semantic-ui-react"
import LeftSideBar from "../components/AdminLayout/LeftSideBar"
import RightSideBar from "../components/AdminLayout/RightSideBar"
import Header from "../components/AdminLayout/AdminHeader"

const AdminLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className="admin-layout">
          <Header></Header>
          <Grid>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={3}>
              <LeftSideBar></LeftSideBar>
            </Grid.Column>
            <Grid.Column width={8}>
              <Container className="app__content" fluid>
                <Container fluid className="app__content-wrapper">
                  <Component {...props} />
                </Container>
              </Container>
            </Grid.Column>
            <Grid.Column width={3}>
              <RightSideBar></RightSideBar>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </div>
      )}
    />
  )
}

export default AdminLayout
